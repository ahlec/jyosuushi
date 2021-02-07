import React, { useMemo } from "react";

import { Counter } from "@jyosuushi/interfaces";

import useLocale from "@jyosuushi/i18n/useLocale";

import Action, { ActionDefinition } from "@jyosuushi/ui/components/Action";
import Furigana, { FuriganaClassNames } from "@jyosuushi/ui/Furigana";
import useCounterDisplay from "@jyosuushi/hooks/useCounterDisplay";

import { TileActionCreatorFn } from "./types";

import styles from "./CounterTableTile.scss";

interface ComponentProps {
  actionCreator: TileActionCreatorFn;
  counter: Counter;
}

const FURIGANA_CLASS_NAMES: FuriganaClassNames = {
  furigana: styles.furigana,
  root: styles.counter,
  text: styles.counterText,
};

function CounterTableTile({
  actionCreator,
  counter,
}: ComponentProps): React.ReactElement {
  // Connect with the rest of the app
  const locale = useLocale();

  // Determine how to present the counter
  const counterDisplay = useCounterDisplay(counter);

  // Use the provided function to determine what action this tile should
  // perform.
  const action = useMemo(
    (): ActionDefinition => actionCreator(counter.counterId),
    [actionCreator, counter.counterId]
  );

  // Render the component
  return (
    <Action className={styles.tile} definition={action}>
      <Furigana
        className={FURIGANA_CLASS_NAMES}
        furigana={counterDisplay.furigana}
        text={counterDisplay.writing}
      />
      <div className={styles.name}>
        {locale.dataLocalizers.getCounterName(counter)}
      </div>
    </Action>
  );
}

export default CounterTableTile;
