import * as React from "react";
import { Link } from "react-router-dom";

import useLocale from "@jyosuushi/i18n/useLocale";
import { Counter } from "@jyosuushi/interfaces";
import { getCounterLink } from "@jyosuushi/ui/modules/explore/pathing";
import { getPrimaryJapaneseRepresentation } from "@jyosuushi/utils";

import styles from "./CounterTile.scss";

interface ComponentProps {
  counter: Counter;
}

function CounterTile({ counter }: ComponentProps): React.ReactElement {
  // Connect to the rest of the app
  const locale = useLocale();

  // Render the component
  return (
    <Link className={styles.counterTile} to={getCounterLink(counter.counterId)}>
      <div className={styles.kanji}>
        {getPrimaryJapaneseRepresentation(counter)}
      </div>
      <div className={styles.name}>
        {locale.dataLocalizers.getCounterName(counter)}
      </div>
    </Link>
  );
}

export default CounterTile;
