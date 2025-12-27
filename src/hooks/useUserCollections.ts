import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { v4 } from "uuid";

import {
  CreateUserCounterCollectionFn,
  UserCounterCollection,
} from "@jyosuushi/interfaces";
import StorageWrapper from "@jyosuushi/utils/StorageWrapper";

/**
 * This should always remain its own distinct type! This will allow us to handle
 * UserCounterCollection data type changing at runtime from accidentally being
 * misaligned with users older versions of what's on disk.
 * Doubles-up the `currentSchema` field in StorageWrapper constructor, but
 * UserCounterCollection would otherwise very likely change without developers
 * visiting this file.
 */
type SerializedUserCollection = {
  id: string;
  name: string;
  counterIds: readonly string[];
  dateLastUpdated: number;
  dateCreated: number;
};

const USER_COLLECTIONS_STORAGE = new StorageWrapper<
  readonly SerializedUserCollection[]
>("user-collections", "local", 1);

type InternalCallbackFn = () => void;

interface InternalState {
  callbacks: ReadonlyArray<InternalCallbackFn>;
  collections: readonly SerializedUserCollection[];
}

interface HookResults {
  createUserCollection: CreateUserCounterCollectionFn;
  userCollections: readonly UserCounterCollection[];
}

function useUserCollections(): HookResults {
  // Use hook state as a source of truth
  const [state, setState] = useState(
    (): InternalState => ({
      callbacks: [],
      collections: USER_COLLECTIONS_STORAGE.getValue() || [],
    }),
  );

  // Whenever the state changes, invoke any callbacks that haven't been called
  useEffect((): void => {
    // Invoke the callbacks
    // NOTE: Calling resolve/reject multiple times is a noop. It does not raise
    // errors, change the resolved/rejected parameters, or trigger .then/.catch
    // additional times. Therefore, we don't need to worry about the case where
    // state changes a second time while we're invoking the callbacks and we might
    // risk entering the useEffect with some of the same callbacks a second time.
    const invokedCallbacks = new Set<InternalCallbackFn>();
    state.callbacks.forEach((callback): void => {
      callback();
      invokedCallbacks.add(callback);
    });

    // Remove from state all of the callbacks that we've invoked.
    // NOTE: We can't simply erase the array since we might have been batched
    // with other setState operations that added new callbacks we haven't run yet.
    if (!invokedCallbacks.size) {
      return;
    }

    setState((current): InternalState => {
      const nextCallbacks = state.callbacks.filter(
        (callback) => !invokedCallbacks.has(callback),
      );
      if (nextCallbacks.length === state.callbacks.length) {
        return current;
      }

      return {
        callbacks: nextCallbacks,
        collections: current.collections,
      };
    });
  }, [state]);

  // When our list of collections change, persist them to storage
  const hasMountedRef = useRef<boolean>(false);
  useEffect((): void => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }

    USER_COLLECTIONS_STORAGE.setValue(state.collections);
  }, [state.collections]);

  // Build a utility function that generates a field mutator for UserCounterCollections
  // (the general case for functions).
  const mutateCollectionField = useCallback(
    (
      collectionId: string,
      generate: (current: SerializedUserCollection) => SerializedUserCollection,
    ): Promise<void> => {
      return new Promise((resolve, reject) => {
        setState((current): InternalState => {
          const index = current.collections.findIndex(
            ({ id }) => id === collectionId,
          );
          if (index < 0) {
            return {
              callbacks: [
                ...current.callbacks,
                () => reject(new Error("This collection no longer exists")),
              ],
              collections: current.collections,
            };
          }

          // Create a new container array and a new instance of the
          // collection object
          const nextCollections = [...current.collections];
          nextCollections[index] = generate(nextCollections[index]);

          return {
            callbacks: [...current.callbacks, resolve],
            collections: nextCollections,
          };
        });
      });
    },
    [],
  );

  // Convert our serialized data structures into our client types
  const userCollections = useMemo(
    (): readonly UserCounterCollection[] =>
      state.collections.map(
        (collection): UserCounterCollection => ({
          ...collection,
          addCounter: (counterId) =>
            mutateCollectionField(collection.id, (current) => {
              if (current.counterIds.includes(counterId)) {
                return current;
              }

              return {
                ...current,
                counterIds: [...current.counterIds, counterId],
              };
            }),
          delete: () =>
            new Promise((resolve, reject) => {
              setState((current): InternalState => {
                const nextCollections = current.collections.filter(
                  (c) => c.id !== collection.id,
                );

                if (nextCollections.length === current.collections.length) {
                  // We didn't remove anything -- so the collection must have already been deleted
                  return {
                    callbacks: [
                      ...current.callbacks,
                      () =>
                        reject(new Error("This collection no longer exists")),
                    ],
                    collections: current.collections,
                  };
                }

                return {
                  callbacks: [...current.callbacks, resolve],
                  collections: nextCollections,
                };
              });
            }),
          removeCounter: (counterId) =>
            mutateCollectionField(collection.id, (current) => {
              const index = current.counterIds.indexOf(counterId);
              if (index < 0) {
                return current;
              }

              const nextCounters = [...current.counterIds];
              nextCounters.splice(index, 1);

              return {
                ...current,
                counterIds: nextCounters,
              };
            }),
          rename: (name) =>
            mutateCollectionField(collection.id, (current) => ({
              ...current,
              name,
            })),
        }),
      ),
    [state.collections, mutateCollectionField],
  );

  // Create a memoized function to create new user collections
  const createUserCollection = useCallback<CreateUserCounterCollectionFn>(
    (name) =>
      new Promise((resolve) => {
        setState((current): InternalState => {
          const id = v4();
          return {
            callbacks: [...current.callbacks, () => resolve(id)],
            collections: [
              ...current.collections,
              {
                counterIds: [],
                dateCreated: Date.now(),
                dateLastUpdated: Date.now(),
                id,
                name,
              },
            ],
          };
        });
      }),
    [],
  );

  // Return the public API
  return {
    createUserCollection,
    userCollections,
  };
}

export default useUserCollections;
