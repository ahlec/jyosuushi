import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";

import { COUNTERS_LOOKUP } from "@data/counters";

import useLocale from "@jyosuushi/i18n/useLocale";

import CounterDisplay from "@jyosuushi/ui/components/CounterDisplay";
import RightIcon from "@jyosuushi/ui/right.svg";

import { getCounterLink } from "@jyosuushi/ui/main-screen/explore/pathing";

import styles from "./CounterRow.scss";

interface ComponentProps {
  collectionId: string;
  counterId: string;
}

function CounterRow({
  collectionId,
  counterId,
}: ComponentProps): React.ReactElement {
  // Fetch the correct counter
  const counter = COUNTERS_LOOKUP[counterId];

  // Connect to the rest of the app
  const history = useHistory();
  const locale = useLocale();

  // Handle events
  const handleClick = useCallback((): void => {
    history.push({
      pathname: getCounterLink(counterId),
      state: {
        fromStudyPack: collectionId,
      },
    });
  }, [collectionId, counterId, history]);

  // Render the component
  return (
    <tr className={styles.counterRow} onClick={handleClick}>
      <td className={styles.jp}>
        <CounterDisplay className={styles.counterDisplay} counter={counter} />
      </td>
      <td className={styles.name}>
        {locale.dataLocalizers.getCounterName(counter)}
      </td>
      <td className={styles.button}>
        <RightIcon />
      </td>
    </tr>
  );
}

export default CounterRow;
