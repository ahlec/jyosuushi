import React, { useMemo } from "react";

import { COUNTERS_LOOKUP } from "@data/counters";

import { CounterCollection } from "@jyosuushi/graphql/types.generated";

import { Counter } from "@jyosuushi/interfaces";
import useLocale from "@jyosuushi/i18n/useLocale";

import { orderCounters } from "@jyosuushi/ui/main-screen/explore/utils";

import CounterLinkTile from "./CounterLinkTile";

import styles from "./CountersTable.scss";

interface ComponentProps {
  collection: CounterCollection;
}

function CountersTable({
  collection,
}: ComponentProps): React.ReactElement | null {
  // Connect with the rest of the app
  const locale = useLocale();

  // Retrieve the array of counters for this collection
  const counters = useMemo(
    (): readonly Counter[] =>
      orderCounters(
        collection.counterIds.map(
          (counterId): Counter => COUNTERS_LOOKUP[counterId]
        ),
        locale
      ),
    [collection.counterIds, locale]
  );

  // If we don't have any counters, don't render anything
  if (!counters.length) {
    return null;
  }

  // Render the component
  return (
    <div className={styles.table}>
      {counters.map(
        (counter): React.ReactElement => (
          <CounterLinkTile
            key={counter.counterId}
            collectionId={collection.id}
            collectionName={collection.name}
            counter={counter}
          />
        )
      )}
    </div>
  );
}

export default CountersTable;
