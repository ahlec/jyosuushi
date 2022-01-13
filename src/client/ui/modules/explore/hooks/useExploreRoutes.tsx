import React, { useMemo } from "react";

import { COUNTERS_LOOKUP } from "@data/counters";
import { STANDARD_COLLECTIONS } from "@data/standard-collections";

import {
  UserCounterCollection,
  UserCounterCollectionManager,
} from "@jyosuushi/interfaces";

import {
  getCounterCollectionPath,
  getCounterLink,
} from "@jyosuushi/ui/modules/explore/pathing";
import ExploreCounterPage from "@jyosuushi/ui/modules/explore/pages/counter/ExploreCounterPage";
import StandardCollectionView from "@jyosuushi/ui/modules/explore/pages/collection/StandardCollectionView";
import UserCollectionView from "@jyosuushi/ui/modules/explore/pages/collection/UserCollectionView";

export interface RouteDeclaration {
  key: string;
  path: string;
  component: () => React.ReactElement;
}

interface HookOptions {
  userCollections: readonly UserCounterCollection[];
  userCollectionsManager: UserCounterCollectionManager;
}

function useExploreRoutes({
  userCollections,
  userCollectionsManager,
}: HookOptions): readonly RouteDeclaration[] {
  return useMemo((): readonly RouteDeclaration[] => {
    const result: RouteDeclaration[] = [];

    STANDARD_COLLECTIONS.forEach((collection): void => {
      result.push({
        component: function RouteWrapper(): React.ReactElement {
          return <StandardCollectionView collection={collection} />;
        },
        key: `standard-collection-${collection.id}`,
        path: getCounterCollectionPath(collection.id),
      });
    });

    userCollections.forEach((collection): void => {
      result.push({
        component: function RouteWrapper(): React.ReactElement {
          return (
            <UserCollectionView
              collection={collection}
              manager={userCollectionsManager}
            />
          );
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
              userCollections={userCollections}
            />
          );
        },
        key: `counter-${counter.counterId}`,
        path: getCounterLink(counter.counterId),
      });
    });

    return result;
  }, [userCollections, userCollectionsManager]);
}

export default useExploreRoutes;
