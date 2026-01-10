import {
  CounterFrequency,
  CounterIrregularType,
  CountingSystem,
} from "@jyosuushi/interfaces";
import classnames from "classnames";
import React from "react";
import {
  defineMessages,
  FormattedMessage,
  type MessageDescriptor,
} from "react-intl";
import * as styles from "./CounterReading.scss";

const INTL_MESSAGES = defineMessages({
  prefixArchaic: {
    defaultMessage: "arch.",
    id: "components.counterReading.frequencyLabels.archaic",
  },
  prefixUncommon: {
    defaultMessage: "uncom.",
    id: "components.counterReading.frequencyLabels.uncommon",
  },
});

const READING_FREQUENCY_DISPLAYS: Record<
  CounterFrequency,
  { className: string; prefix: MessageDescriptor | null }
> = {
  [CounterFrequency.Common]: {
    className: "",
    prefix: null,
  },
  [CounterFrequency.Uncommon]: {
    className: styles.uncommon,
    prefix: INTL_MESSAGES.prefixUncommon,
  },
  [CounterFrequency.Archaic]: {
    className: styles.archaic,
    prefix: INTL_MESSAGES.prefixArchaic,
  },
};

type Props = {
  countingSystem: CountingSystem | null;
  frequency: CounterFrequency;
  irregularType: CounterIrregularType | null;
  kana: string;
  showColor: boolean;
};

export function CounterReading({
  countingSystem,
  frequency,
  irregularType,
  kana,
  showColor,
}: Props): React.ReactElement {
  const frequencyLabel = READING_FREQUENCY_DISPLAYS[frequency].prefix;
  return (
    <span
      className={classnames(
        showColor
          ? irregularType
            ? styles.irregular
            : countingSystem !== CountingSystem.Kango
              ? styles.nonKango
              : ""
          : "",
        READING_FREQUENCY_DISPLAYS[frequency].className,
      )}
    >
      {frequencyLabel ? (
        <FormattedMessage {...frequencyLabel}>
          {(text) => <span className={styles.prefix}>{text}</span>}
        </FormattedMessage>
      ) : null}{" "}
      {kana}
    </span>
  );
}
