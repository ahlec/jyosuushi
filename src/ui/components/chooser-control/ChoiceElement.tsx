import classnames from "classnames";
import { noop } from "lodash";
import React from "react";
import { FormattedMessage } from "react-intl";

import { KeyCode } from "@jyosuushi/constants";

import { Choice } from "./types";

import * as styles from "./ChooserControl.scss";

interface ComponentProps<TValue> {
  choice: Choice<TValue>;
  isSelected: boolean;
  onSelected: () => void;
}

function ChoiceElement<TValue>({
  choice,
  isSelected,
  onSelected,
}: ComponentProps<TValue>): React.ReactElement {
  // Handle events
  const handleClick = isSelected ? noop : (): void => onSelected();

  const handleKeyPress = isSelected
    ? noop
    : (e: React.KeyboardEvent<HTMLDivElement>): void => {
        switch (e.which) {
          case KeyCode.Space:
          case KeyCode.Enter: {
            onSelected();
            break;
          }
        }
      };

  // Render component
  return (
    <div
      className={classnames(styles.choice, isSelected && styles.selected)}
      onClick={handleClick}
      onKeyPress={handleKeyPress}
      role="option"
      aria-selected={isSelected}
      tabIndex={0}
    >
      <FormattedMessage
        {...choice.title.descriptor}
        values={choice.title.values}
      />
      {choice.subtext && (
        <FormattedMessage
          {...choice.subtext.descriptor}
          values={choice.subtext.values}
        >
          {(subtext) => <div className={styles.subtext}>{subtext}</div>}
        </FormattedMessage>
      )}
    </div>
  );
}

export default ChoiceElement;
