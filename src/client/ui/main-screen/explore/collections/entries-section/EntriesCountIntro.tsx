import React from "react";
import { defineMessages, FormattedMessage } from "react-intl";

import styles from "./EntriesCountIntro.scss";

const INTL_MESSAGES = defineMessages({
  emptyText: {
    defaultMessage:
      "This collection currently has <bold>no counters</bold> in it.",
    id: "explorePage.collections.entries-section.EntriesCountIntro.emptyText",
  },
  text: {
    defaultMessage:
      "This collection contains <bold>{numCounters, plural, one {# counter} other {# counters}}</bold>:",
    id: "explorePage.collections.entries-section.EntriesCountIntro.text",
  },
});

function FormattedMessageBold(
  chunks: readonly React.ReactNode[]
): React.ReactElement {
  return <strong className={styles.bold}>{chunks}</strong>;
}

interface ComponentProps {
  numCounters: number;
}

function EntriesCountIntro({
  numCounters,
}: ComponentProps): React.ReactElement {
  const message = numCounters ? INTL_MESSAGES.text : INTL_MESSAGES.emptyText;
  return (
    <p className={styles.container}>
      <FormattedMessage
        {...message}
        values={{
          bold: FormattedMessageBold,
          numCounters,
        }}
      />
    </p>
  );
}

export default EntriesCountIntro;
