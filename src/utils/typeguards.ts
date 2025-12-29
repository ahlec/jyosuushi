import type {
  CounterCollection,
  UserCounterCollection,
} from "@jyosuushi/interfaces";

export function isIndexableObject(
  obj: unknown,
): obj is { [index: string]: unknown } {
  return typeof obj === "object" && obj !== null;
}

export function isNotNull<T>(obj: T | null): obj is T {
  return obj !== null;
}

export function isUserCollection(
  collection: CounterCollection,
): collection is UserCounterCollection {
  return "dateCreated" in collection;
}
