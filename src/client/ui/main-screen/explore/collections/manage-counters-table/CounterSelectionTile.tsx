import React from "react";

import { Counter } from "@jyosuushi/interfaces";

import useLocale from "@jyosuushi/i18n/useLocale";

import Furigana, { FuriganaClassNames } from "@jyosuushi/ui/Furigana";
import useCounterDisplay from "@jyosuushi/hooks/useCounterDisplay";

import styles from "./CounterSelectionTile.scss";

interface ComponentProps {
  counter: Counter;
  isSelected: boolean;
  onDeselect: (counterId: string) => Promise<void>;
  onSelect: (counterId: string) => Promise<void>;
}

const FURIGANA_CLASS_NAMES: FuriganaClassNames = {
  furigana: styles.furigana,
  root: styles.counter,
  text: styles.counterText,
};

function CounterSelectionTile({ counter }: ComponentProps): React.ReactElement {
  // Connect with the rest of the app
  const locale = useLocale();

  // Determine how to present the counter
  const counterDisplay = useCounterDisplay(counter);

  // Render the component
  return (
    <button className={styles.tile}>
      <Furigana
        className={FURIGANA_CLASS_NAMES}
        furigana={counterDisplay.furigana}
        text={counterDisplay.writing}
      />
      <div className={styles.name}>
        {locale.dataLocalizers.getCounterName(counter)}
      </div>
    </button>
  );
}

export default CounterSelectionTile;
