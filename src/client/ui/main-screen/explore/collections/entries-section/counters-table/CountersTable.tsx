import React from "react";

import { Counter } from "@jyosuushi/interfaces";

import CounterLinkTile from "./CounterLinkTile";

import styles from "./CountersTable.scss";

interface ComponentProps {
  collectionId: string;

  collectionName: string;

  /**
   * An ordered array of the counters that should be displayed in this table.
   */
  counters: readonly Counter[];
}

function CountersTable({
  collectionId,
  collectionName,
  counters,
}: ComponentProps): React.ReactElement {
  // Render the component
  return (
    <div className={styles.table}>
      {counters.map(
        (counter): React.ReactElement => (
          <CounterLinkTile
            key={counter.counterId}
            collectionId={collectionId}
            collectionName={collectionName}
            counter={counter}
          />
        )
      )}
    </div>
  );
}

export default CountersTable;
