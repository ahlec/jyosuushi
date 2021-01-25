import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";

import { COUNTERS_LOOKUP } from "@data/counters";

import useLocale from "@jyosuushi/i18n/useLocale";

import Furigana from "@jyosuushi/ui/Furigana";
import useCounterDisplay from "@jyosuushi/hooks/useCounterDisplay";
import RightIcon from "@jyosuushi/ui/right.svg";

import { getCounterLink } from "@jyosuushi/ui/main-screen/explore/pathing";
import { ExploreLocationState } from "@jyosuushi/ui/main-screen/explore/types";

import styles from "./CounterRow.scss";

interface ComponentProps {
  collectionId: string;
  collectionName: string;
  counterId: string;
}

function CounterRow({
  collectionId,
  collectionName,
  counterId,
}: ComponentProps): React.ReactElement {
  // Fetch the correct counter
  const counter = COUNTERS_LOOKUP[counterId];

  // Connect to the rest of the app
  const history = useHistory();
  const locale = useLocale();

  // Handle events
  const handleClick = useCallback((): void => {
    const locationState: ExploreLocationState = {
      fromCollection: {
        id: collectionId,
        name: collectionName,
      },
      schema: "v2",
      type: "explore-location-state",
    };

    history.push({
      pathname: getCounterLink(counterId),
      state: locationState,
    });
  }, [collectionId, collectionName, counterId, history]);

  // Get the proper display for this counter
  const counterDisplay = useCounterDisplay(counter);

  // Render the component
  return (
    <tr className={styles.counterRow} onClick={handleClick}>
      <td className={styles.jp}>
        <Furigana
          className={styles.counterDisplay}
          furigana={counterDisplay.furigana}
          text={counterDisplay.writing}
        />
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
