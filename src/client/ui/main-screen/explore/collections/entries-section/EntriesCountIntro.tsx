import React from "react";
import { defineMessages, FormattedMessage } from "react-intl";

import styles from "./EntriesCountIntro.scss";

const INTL_MESSAGES = defineMessages({
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
  numEntries: number;
}

function EntriesCountIntro({ numEntries }: ComponentProps): React.ReactElement {
  // Render the component
  return (
    <p className={styles.container}>
      <FormattedMessage
        {...INTL_MESSAGES.text}
        values={{
          bold: FormattedMessageBold,
          numCounters: numEntries,
        }}
      />
    </p>
  );
}

export default EntriesCountIntro;
