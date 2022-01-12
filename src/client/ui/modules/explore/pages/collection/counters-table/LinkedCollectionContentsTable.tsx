import { LocationDescriptorObject } from "history";
import React, { useCallback, useMemo } from "react";

import { CounterCollection } from "@jyosuushi/interfaces";

import { getCounterLink } from "@jyosuushi/ui/modules/explore/pathing";
import { ExploreLocationState } from "@jyosuushi/ui/modules/explore/types";

import CountersTable from "./base/CountersTable";
import { TileActionCreatorFn } from "./base/types";

interface ComponentProps {
  collection: CounterCollection;
}

function LinkedCollectionContentsTable({
  collection,
}: ComponentProps): React.ReactElement | null {
  // Create the tile action creator that will be used to tell tiles that they
  // should operate as links to the specific counter's profile page.
  const tileActionCreator = useCallback<TileActionCreatorFn>(
    (counterId) => {
      const to: LocationDescriptorObject<ExploreLocationState> = {
        pathname: getCounterLink(counterId),
        state: {
          fromCollection: {
            id: collection.id,
            name: collection.name,
          },
          schema: "v2",
          type: "explore-location-state",
        },
      };

      return {
        to,
        variant: "link",
      };
    },
    [collection.id, collection.name]
  );

  // Create a memoized predicate to whittle down all of the counters to just
  // the ones currently in the collection.
  const isCounterVisible = useMemo((): ((counterId: string) => boolean) => {
    // Create a memoized Set of the counters so that our function can be O(1).
    const counters = new Set(collection.counterIds);

    return (counterId): boolean => counters.has(counterId);
  }, [collection.counterIds]);

  // If we have NO counters to display, render nothing
  if (!collection.counterIds.length) {
    return null;
  }

  // Render the component
  return (
    <CountersTable
      isCounterVisible={isCounterVisible}
      tileActionCreator={tileActionCreator}
      tileChildrenGenerator={null}
      tileClassNameGenerator={null}
    />
  );
}

export default LinkedCollectionContentsTable;
