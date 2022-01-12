import { UserCounterCollection } from "@jyosuushi/interfaces";
import StorageWrapper from "@jyosuushi/utils/StorageWrapper";

import useStorageWrapper from "./useStorageWrapper";

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

const EMPTY_ARRAY: readonly UserCounterCollection[] = [];

const USER_COLLECTIONS_STORAGE = new StorageWrapper<
  readonly SerializedUserCollection[]
>("user-collections", "local", 1);

interface HookResults {
  userCollections: readonly UserCounterCollection[];
}

function useUserCollections(): HookResults {
  // Connect with storage
  const [userCollections] = useStorageWrapper(USER_COLLECTIONS_STORAGE);

  // Return the public API
  return {
    userCollections: userCollections || EMPTY_ARRAY,
  };
}

export default useUserCollections;
