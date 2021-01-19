import React, { useMemo } from "react";

import { COUNTERS_LOOKUP } from "@data/counters";

import {
  StandardCounterCollection,
  UserCounterCollection,
} from "@jyosuushi/graphql/types.generated";

import {
  getCounterCollectionPath,
  getCounterLink,
} from "@jyosuushi/ui/main-screen/explore/pathing";
import ExploreCounterPage from "@jyosuushi/ui/main-screen/explore/counter/ExploreCounterPage";
import CounterCollectionView from "@jyosuushi/ui/main-screen/explore/collections/CounterCollectionView";

export interface RouteDeclaration {
  key: string;
  path: string;
  component: () => React.ReactElement;
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

    Object.values(COUNTERS_LOOKUP).forEach((counter): void => {
      result.push({
        component: function RouteWrapper(): React.ReactElement {
          return (
            <ExploreCounterPage
              counter={counter}
              standardCollections={standardCollections}
              userCollections={userCollections}
            />
          );
        },
        key: `counter-${counter.counterId}`,
        path: getCounterLink(counter.counterId),
      });
    });

    return result;
  }, [standardCollections, userCollections]);
}

export default useExploreRoutes;
