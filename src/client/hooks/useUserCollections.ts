import { useEffect, useMemo, useRef, useState } from "react";
import { v4 } from "uuid";

import {
  UserCounterCollection,
  UserCounterCollectionManager,
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
  collections: readonly UserCounterCollection[];
}

interface HookResults {
  userCollections: readonly UserCounterCollection[];
  userCollectionsManager: UserCounterCollectionManager;
}

function useUserCollections(): HookResults {
  // Use hook state as a source of truth
  const [state, setState] = useState(
    (): InternalState => ({
      callbacks: [],
      collections: USER_COLLECTIONS_STORAGE.getValue() || [],
    })
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

    setState(
      (current): InternalState => {
        const nextCallbacks = state.callbacks.filter(
          (callback) => !invokedCallbacks.has(callback)
        );
        if (nextCallbacks.length === state.callbacks.length) {
          return current;
        }

        return {
          callbacks: nextCallbacks,
          collections: current.collections,
        };
      }
    );
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

  // Create a memoized manager
  const userCollectionsManager = useMemo(
    (): UserCounterCollectionManager => ({
      create: (name) =>
        new Promise((resolve) => {
          setState(
            (current): InternalState => {
              const collection: SerializedUserCollection = {
                counterIds: [],
                dateCreated: Date.now(),
                dateLastUpdated: Date.now(),
                id: v4(),
                name,
              };

              return {
                callbacks: [...current.callbacks, () => resolve(collection)],
                collections: [...current.collections, collection],
              };
            }
          );
        }),
      delete: (id) =>
        new Promise((resolve, reject) => {
          setState(
            (current): InternalState => {
              const collections = current.collections.filter(
                (c) => c.id !== id
              );

              if (collections.length === current.collections.length) {
                // We didn't remove anything -- so the ID must not exist
                return {
                  callbacks: [
                    ...current.callbacks,
                    () =>
                      reject(new Error(`No collection with ID '${id}' exists`)),
                  ],
                  collections: current.collections,
                };
              }

              return {
                callbacks: [...current.callbacks, resolve],
                collections: collections,
              };
            }
          );
        }),
      rename: (id, name) =>
        new Promise((resolve, reject) => {
          setState(
            (current): InternalState => {
              const index = current.collections.findIndex((c) => c.id === id);
              if (index < 0) {
                return {
                  callbacks: [
                    ...current.callbacks,
                    () =>
                      reject(
                        new Error(`Coul not find collection with id '${id}'`)
                      ),
                  ],
                  collections: current.collections,
                };
              }

              // Create a new container array and a new instance of the
              // collection object
              const nextCollections = [...current.collections];
              nextCollections[index] = {
                ...nextCollections[index],
                name,
              };

              return {
                callbacks: [...current.callbacks, resolve],
                collections: nextCollections,
              };
            }
          );
        }),
    }),
    []
  );

  // Return the public API
  return {
    userCollections: state.collections,
    userCollectionsManager,
  };
}

export default useUserCollections;
