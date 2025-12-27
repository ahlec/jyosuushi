import React, { useMemo } from "react";

import { COUNTERS_LOOKUP } from "@data/counters";

import { Counter } from "@jyosuushi/interfaces";
import useLocale from "@jyosuushi/i18n/useLocale";

import { orderCounters } from "@jyosuushi/ui/modules/explore/utils";

import CounterTableTile from "./CounterTableTile";
import { TileActionCreatorFn } from "./types";

import * as styles from "./CountersTable.scss";

interface ComponentProps {
  isCounterVisible: (counterId: string) => boolean;
  tileActionCreator: TileActionCreatorFn;
  tileChildrenGenerator: ((counterId: string) => React.ReactNode) | null;
  tileClassNameGenerator: ((counterId: string) => string | null) | null;
}

function CountersTable({
  isCounterVisible,
  tileActionCreator,
  tileChildrenGenerator,
  tileClassNameGenerator,
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
            className={
              (tileClassNameGenerator &&
                tileClassNameGenerator(counter.counterId)) ||
              ""
            }
            counter={counter}
          >
            {tileChildrenGenerator && tileChildrenGenerator(counter.counterId)}
          </CounterTableTile>
        ) : null
      )}
    </div>
  );
}

export default CountersTable;
