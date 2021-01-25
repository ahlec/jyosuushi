import { LocationDescriptorObject } from "history";
import React, { useMemo } from "react";
import { Link } from "react-router-dom";

import { Counter } from "@jyosuushi/interfaces";

import useLocale from "@jyosuushi/i18n/useLocale";

import Furigana, { FuriganaClassNames } from "@jyosuushi/ui/Furigana";
import useCounterDisplay from "@jyosuushi/hooks/useCounterDisplay";

import { getCounterLink } from "@jyosuushi/ui/main-screen/explore/pathing";
import { ExploreLocationState } from "@jyosuushi/ui/main-screen/explore/types";

import styles from "./CounterLinkTile.scss";

interface ComponentProps {
  collectionId: string;
  collectionName: string;
  counter: Counter;
}

const FURIGANA_CLASS_NAMES: FuriganaClassNames = {
  furigana: styles.furigana,
  root: styles.counter,
  text: styles.counterText,
};

function CounterLinkTile({
  collectionId,
  collectionName,
  counter,
}: ComponentProps): React.ReactElement {
  // Connect with the rest of the app
  const locale = useLocale();

  // Retrieve the destination, with state encoded, for where this tile should
  // link to
  const linkDest = useMemo(
    (): LocationDescriptorObject<ExploreLocationState> => ({
      pathname: getCounterLink(counter.counterId),
      state: {
        fromCollection: {
          id: collectionId,
          name: collectionName,
        },
        schema: "v2",
        type: "explore-location-state",
      },
    }),
    [counter.counterId, collectionId, collectionName]
  );

  // Determine how to present the counter
  const counterDisplay = useCounterDisplay(counter);

  // Render the component
  return (
    <Link className={styles.tile} to={linkDest}>
      <Furigana
        className={FURIGANA_CLASS_NAMES}
        furigana={counterDisplay.furigana}
        text={counterDisplay.writing}
      />
      <div className={styles.name}>
        {locale.dataLocalizers.getCounterName(counter)}
      </div>
    </Link>
  );
}

export default CounterLinkTile;
