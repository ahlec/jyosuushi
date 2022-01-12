import { orderBy } from "lodash";
import { useMemo } from "react";

import {
  StandardCounterCollection,
  UserCounterCollection,
} from "@jyosuushi/interfaces";

import { CollectionMembershipEntry } from "./types";

type CollectionType = "standard" | "user";

interface GraphQlCollectionTypes {
  standard: StandardCounterCollection;
  user: UserCounterCollection;
}

function useCollectionMembership<T extends CollectionType>(
  type: T,
  counterId: string,
  collections: readonly GraphQlCollectionTypes[T][]
): readonly CollectionMembershipEntry[] {
  return useMemo((): readonly CollectionMembershipEntry[] => {
    const entries: CollectionMembershipEntry[] = [];

    orderBy(collections, (collection): string => collection.name).forEach(
      (collection): void => {
        if (collection.counterIds.indexOf(counterId) < 0) {
          return;
        }

        entries.push({
          collectionId: collection.id,
          collectionName: collection.name,
          collectionType: type,
        });
      }
    );

    return entries;
  }, [collections, counterId, type]);
}

export default useCollectionMembership;
