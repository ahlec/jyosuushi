import { memoize, stubTrue } from "lodash";
import React, { useCallback, useMemo } from "react";

import CountersTable from "./base/CountersTable";
import { TileActionCreatorFn } from "./base/types";

interface ComponentProps {
  /**
   * An array of all of the counters (represented by their ID) that are
   * currently in the collection.
   */
  collectionCounters: readonly string[];

  /**
   * A callback that will be invoked when the user has requested to add a
   * counter to the collection.
   */
  onAddCounter: (counterId: string) => Promise<void>;

  /**
   * A callback that will be invoked when the user has requested to remove a
   * counter from the collection.
   */
  onRemoveCounter: (counterId: string) => Promise<void>;
}

function ManageCountersTable({
  collectionCounters,
  onAddCounter,
  onRemoveCounter,
}: ComponentProps): React.ReactElement {
  // Create a memoized functor that will bind `counterId` to `onAddCounter`,
  // since the `tileActionCreator` will be recomputed any time there's a
  // change.
  const memoizedAddCounter = useMemo(
    () => memoize((counterId: string) => () => onAddCounter(counterId)),
    [onAddCounter]
  );

  // Do the same thing for `onRemoveCounter`
  const memoizedRemoveCounter = useMemo(
    () => memoize((counterId: string) => () => onRemoveCounter(counterId)),
    [onRemoveCounter]
  );

  // Create a Set of the counters currently in the collection, to allow for
  // O(1) lookup.
  const counters = useMemo(
    (): ReadonlySet<string> => new Set(collectionCounters),
    [collectionCounters]
  );

  // Create the tile action creator that will be used to tell tiles that they
  // should operate as links to the specific counter's profile page.
  const tileActionCreator = useCallback<TileActionCreatorFn>(
    (counterId) => ({
      onClick: counters.has(counterId)
        ? memoizedRemoveCounter(counterId)
        : memoizedAddCounter(counterId),
      variant: "button",
    }),
    [counters, memoizedAddCounter, memoizedRemoveCounter]
  );

  // Render the component
  return (
    <CountersTable
      isCounterVisible={stubTrue}
      tileActionCreator={tileActionCreator}
    />
  );
}

export default ManageCountersTable;
