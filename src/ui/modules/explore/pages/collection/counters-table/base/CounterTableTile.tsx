import classnames from "classnames";
import React, { useMemo } from "react";

import { Counter } from "@jyosuushi/interfaces";

import useLocale from "@jyosuushi/i18n/useLocale";

import Action, { ActionClassNames } from "@jyosuushi/ui/components/Action";
import Furigana, {
  FuriganaClassNames,
} from "@jyosuushi/ui/components/Furigana";
import LoadingSpinner from "@jyosuushi/ui/components/LoadingSpinner";
import useCounterDisplay from "@jyosuushi/hooks/useCounterDisplay";

import { TileActionCreatorFn } from "./types";

import * as styles from "./CounterTableTile.scss";

interface ComponentProps {
  actionCreator: TileActionCreatorFn;
  children: React.ReactNode;
  className: string;
  counter: Counter;
}

const FURIGANA_CLASS_NAMES: FuriganaClassNames = {
  furigana: styles.furigana,
  root: classnames(styles.counter, styles.primaryContent),
  text: styles.counterText,
};

function CounterTableTile({
  actionCreator,
  children,
  className,
  counter,
}: ComponentProps): React.ReactElement {
  // Connect with the rest of the app
  const locale = useLocale();

  // Determine how to present the counter
  const counterDisplay = useCounterDisplay(counter);

  // Use the provided function to determine what action this tile should
  // perform.
  const action = useMemo(
    () => actionCreator(counter.counterId),
    [actionCreator, counter.counterId],
  );

  // Create an object that will dictate the CSS classes to use on <Action />
  const actionClasses = useMemo(
    (): ActionClassNames => ({
      always: classnames(styles.tile, className),
      whileProcessing: styles.processing,
    }),
    [className],
  );

  // Render the component
  return (
    <Action className={actionClasses} definition={action}>
      <Furigana
        className={FURIGANA_CLASS_NAMES}
        furigana={counterDisplay.furigana}
        text={counterDisplay.writing}
      />
      <div className={classnames(styles.name, styles.primaryContent)}>
        {locale.dataLocalizers.getCounterName(counter)}
      </div>
      {children && <div className={styles.primaryContent}>{children}</div>}
      <LoadingSpinner
        className={styles.processingContent}
        color="blue"
        size={48}
      />
    </Action>
  );
}

export default CounterTableTile;
