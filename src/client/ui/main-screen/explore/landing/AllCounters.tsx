import { values } from "lodash";
import React, { useMemo } from "react";
import { defineMessages, FormattedMessage } from "react-intl";

import { COUNTERS_LOOKUP } from "@data/counters";

import useLocale from "@jyosuushi/i18n/useLocale";
import { Counter } from "@jyosuushi/interfaces";

import CounterTile from "@jyosuushi/ui/main-screen/CounterTile";
import { orderCounters } from "@jyosuushi/ui/main-screen/explore/utils";

import styles from "./AllCounters.scss";

const INTL_MESSAGES = defineMessages({
  pageHeader: {
    defaultMessage: "Counters",
    id: "explorePage.allCounters.pageHeader",
  },
});

interface ComponentProps {
  headerClassName: string;
}

function AllCounters({ headerClassName }: ComponentProps): React.ReactElement {
  // Connect to the rest of the app
  const locale = useLocale();

  // Sort the counters alphabetically
  const allSortedCounters = useMemo(
    (): readonly Counter[] => orderCounters(values(COUNTERS_LOOKUP), locale),
    [locale]
  );

  // Render component
  return (
    <div className={styles.allCounters}>
      <h3 className={headerClassName}>
        <FormattedMessage {...INTL_MESSAGES.pageHeader} />
      </h3>
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
