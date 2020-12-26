import React, { useMemo } from "react";

import {
  StandardCounterCollection,
  UserCounterCollection,
} from "@jyosuushi/graphql/types.generated";

import { getCounterCollectionPath } from "@jyosuushi/ui/main-screen/explore/pathing";
import CounterCollectionView from "@jyosuushi/ui/main-screen/explore/collections/CounterCollectionView";

export interface RouteDeclaration {
  key: string;
  path: string;
  component: React.ComponentType<Record<string, never>>;
}

interface HookOptions {
  standardCollections: readonly StandardCounterCollection[];
  userCollections: readonly UserCounterCollection[];
}

function useExploreRoutes({
  standardCollections,
  userCollections,
}: HookOptions): readonly RouteDeclaration[] {
  return useMemo((): readonly RouteDeclaration[] => {
    const result: RouteDeclaration[] = [];

    standardCollections.forEach((collection): void => {
      result.push({
        component: function RouteWrapper(): React.ReactElement {
          return <CounterCollectionView collection={collection} />;
        },
        key: `standard-collection-${collection.id}`,
        path: getCounterCollectionPath(collection.id),
      });
    });

    userCollections.forEach((collection): void => {
      result.push({
        component: function RouteWrapper(): React.ReactElement {
          return <CounterCollectionView collection={collection} />;
        },
        key: `user-collection-${collection.id}`,
        path: getCounterCollectionPath(collection.id),
      });
    });

    return result;
  }, [standardCollections, userCollections]);
}

export default useExploreRoutes;
