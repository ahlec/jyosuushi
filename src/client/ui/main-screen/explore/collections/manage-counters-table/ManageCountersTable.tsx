import React, { useMemo } from "react";

import { COUNTERS_LOOKUP } from "@data/counters";

import { Counter } from "@jyosuushi/interfaces";

import useLocale from "@jyosuushi/i18n/useLocale";
import { orderCounters } from "@jyosuushi/ui/main-screen/explore/utils";

import CounterSelectionTile from "./CounterSelectionTile";

import styles from "./ManageCountersTable.scss";

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
  // Connect with the rest of the app
  const locale = useLocale();

  // Create an ordered array of ALL of the counters defined in the app, which
  // we'll display
  const allCounters = useMemo(
    (): readonly Counter[] =>
      orderCounters(Object.values(COUNTERS_LOOKUP), locale),
    [locale]
  );

  // Create a Set for all of the counters currently in the collection, to allow
  // O(1) lookup for the tiles below
  const counterIdsInCollection = useMemo(
    (): ReadonlySet<string> => new Set(collectionCounters),
    [collectionCounters]
  );

  // Render the component
  return (
    <div className={styles.table}>
      {allCounters.map(
        (counter): React.ReactElement => (
          <CounterSelectionTile
            key={counter.counterId}
            counter={counter}
            isSelected={counterIdsInCollection.has(counter.counterId)}
            onDeselect={onRemoveCounter}
            onSelect={onAddCounter}
          />
        )
      )}
    </div>
  );
}

export default ManageCountersTable;
