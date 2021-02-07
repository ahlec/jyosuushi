import React, { useMemo } from "react";

import { COUNTERS_LOOKUP } from "@data/counters";

import { Counter } from "@jyosuushi/interfaces";
import useLocale from "@jyosuushi/i18n/useLocale";

import { orderCounters } from "@jyosuushi/ui/main-screen/explore/utils";

import CounterTableTile from "./CounterTableTile";
import { TileActionCreatorFn } from "./types";

import styles from "./CountersTable.scss";

interface ComponentProps {
  isCounterVisible: (counterId: string) => boolean;
  tileActionCreator: TileActionCreatorFn;
}

function CountersTable({
  isCounterVisible,
  tileActionCreator,
}: ComponentProps): React.ReactElement | null {
  // Connect with the rest of the app
  const locale = useLocale();

  // Create an ordered array of ALL the counters, which we'll then run through
  // later and whittle down based on the filter predicate.
  const allCounters = useMemo(
    (): readonly Counter[] =>
      orderCounters(Object.values(COUNTERS_LOOKUP), locale),
    [locale]
  );

  // Render the component
  return (
    <div className={styles.table}>
      {allCounters.map((counter): React.ReactElement | null =>
        isCounterVisible(counter.counterId) ? (
          <CounterTableTile
            key={counter.counterId}
            actionCreator={tileActionCreator}
            counter={counter}
          />
        ) : null
      )}
    </div>
  );
}

export default CountersTable;
