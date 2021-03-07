import React, { useMemo } from "react";

import { COUNTERS_LOOKUP } from "@data/counters";

import {
  StandardCounterCollection,
  UserCounterCollection,
} from "@jyosuushi/graphql/types.generated";

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
  isLoggedIn: boolean;
  standardCollections: readonly StandardCounterCollection[];
  userCollections: readonly UserCounterCollection[];
}

function useExploreRoutes({
  isLoggedIn,
  standardCollections,
  userCollections,
}: HookOptions): readonly RouteDeclaration[] {
  return useMemo((): readonly RouteDeclaration[] => {
    const result: RouteDeclaration[] = [];

    standardCollections.forEach((collection): void => {
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
          return <UserCollectionView collection={collection} />;
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
              isLoggedIn={isLoggedIn}
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
  }, [isLoggedIn, standardCollections, userCollections]);
}

export default useExploreRoutes;
