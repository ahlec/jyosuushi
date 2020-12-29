import { sortBy } from "lodash";
import { useMemo, useState } from "react";

import { CounterCollection } from "@jyosuushi/graphql/types.generated";

interface HookResults {
  selectedCollections: readonly CounterCollection[];
  selectedCollectionIds: ReadonlySet<string>;
  setSelectedCollectionIds: (next: ReadonlySet<string>) => void;
}

function useSelectedCollections(
  collections: readonly CounterCollection[]
): HookResults {
  // Define hook state to manage the selected collections
  const [rawSelectedCollectionIds, setSelectedCollectionIds] = useState<
    ReadonlySet<string>
  >(new Set());

  // Create a lookup object to that allows for constant-time lookup of
  // collections from their IDs
  const collectionsLookup = useMemo((): {
    [id: string]: CounterCollection | undefined;
  } => {
    const lookup: { [id: string]: CounterCollection } = {};

    collections.forEach((collection): void => {
      lookup[collection.id] = collection;
    });

    return lookup;
  }, [collections]);

  // Filter the results currently in component state to only include actual
  // valid collections
  const validatedSelectedCollectionIds = useMemo((): ReadonlySet<string> => {
    const result = new Set<string>();

    rawSelectedCollectionIds.forEach((collectionId): void => {
      if (!collectionsLookup[collectionId]) {
        return;
      }

      result.add(collectionId);
    });

    return result;
  }, [collectionsLookup, rawSelectedCollectionIds]);

  // Convert the Redux data into the actual study pack objects
  const selectedCollections = useMemo((): readonly CounterCollection[] => {
    const orderedCollectionIds = sortBy(
      Array.from(validatedSelectedCollectionIds)
    );
    const results: CounterCollection[] = [];

    orderedCollectionIds.forEach((collectionId): void => {
      const collection = collectionsLookup[collectionId];
      if (!collection) {
        return;
      }

      results.push(collection);
    });

    return results;
  }, [validatedSelectedCollectionIds, collectionsLookup]);

  // Return the public API
  return {
    selectedCollectionIds: validatedSelectedCollectionIds,
    selectedCollections,
    setSelectedCollectionIds,
  };
}

export default useSelectedCollections;
