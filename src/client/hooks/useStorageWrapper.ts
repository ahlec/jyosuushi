import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import StorageWrapper, {
  ValueStorageType,
} from "@jyosuushi/utils/StorageWrapper";

type SetValueFn<T> = Dispatch<SetStateAction<T | null>>;

type HookResults<T> = [T | null, SetValueFn<T>];

interface InternalState<T extends ValueStorageType> {
  storageWrapper: StorageWrapper<T>;
  value: T | null;
}

function useStorageWrapper<T extends ValueStorageType>(
  storageWrapper: StorageWrapper<T>
): HookResults<T> {
  // Keep track of whether we're doing our initial mounting or not.
  const hasMountedRef = useRef<boolean>(false);

  // Use hook state as a source of truth
  const [state, setState] = useState(
    (): InternalState<T> => ({
      storageWrapper,
      value: storageWrapper.getValue(),
    })
  );

  // Whenever the storageWrapper changes instance, update the state value
  useEffect((): void => {
    if (!hasMountedRef.current) {
      // Don't set the value on mount -- we only want to change it when
      // the instance of the `storageWrapper` has changed.
      return;
    }

    setState({
      storageWrapper,
      value: storageWrapper.getValue(),
    });
  }, [storageWrapper]);

  // Whenever the value in hook state has changed, persist it to storage
  useEffect((): void => {
    if (!hasMountedRef.current) {
      // If we're in the process of mounting, don't persist -- we're restoring
      // from storageWrapper right now.
    }

    if (state.storageWrapper !== storageWrapper) {
      // If the storageWrapper our state is bound to isn't our current one
      // (case: storageWrapper has changed reference after mounting), don't
      // persist -- we'd be persisting the old value to the new storageWrapper
      return;
    }

    if (state.value === null) {
      storageWrapper.clear();
    } else {
      storageWrapper.setValue(state.value);
    }
  }, [storageWrapper, state]);

  // Mark ourselves as having finished mounting
  useEffect((): void => {
    hasMountedRef.current = true;
  }, []);

  // Build a memoized function to set the current value
  const setValue = useCallback<SetValueFn<T>>(
    (value): void => {
      setState((current) => {
        // Determine the next value
        let next: T | null;
        if (typeof value === "function") {
          next = value(current.value);
        } else {
          next = value;
        }

        // Determine if we actually need to update the state
        if (
          current.storageWrapper === storageWrapper &&
          current.value === next
        ) {
          return current;
        }

        return {
          storageWrapper,
          value: next,
        };
      });
    },
    [storageWrapper]
  );

  // Return the public API
  return [state.value, setValue];
}

export default useStorageWrapper;
