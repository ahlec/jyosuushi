import { orderBy, values } from "lodash";
import React, { useMemo } from "react";

import { COUNTERS_LOOKUP } from "@data/counters";

import useLocale from "@jyosuushi/i18n/useLocale";
import { Counter } from "@jyosuushi/interfaces";

import CounterTile from "@jyosuushi/ui/main-screen/CounterTile";

import styles from "./AllCounters.scss";

function AllCounters(): React.ReactElement {
  // Connect to the rest of the app
  const locale = useLocale();

  // Sort the counters alphabetically
  const allSortedCounters = useMemo(
    (): readonly Counter[] =>
      orderBy(values(COUNTERS_LOOKUP), (counter) =>
        locale.dataLocalizers.getCounterName(counter)
      ),
    [locale]
  );

  // Render component
  return (
    <div className={styles.allCounters}>
      <h3>Counters</h3>
      <div className={styles.list}>
        {allSortedCounters.map(
          (counter): React.ReactElement => (
            <CounterTile key={counter.counterId} counter={counter} />
          )
        )}
      </div>
    </div>
  );
}

export default AllCounters;
