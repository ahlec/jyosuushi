import React from "react";
import { FormattedMessage, MessageDescriptor } from "react-intl";

import * as styles from "./ReleaseNotesSection.scss";

interface ComponentProps<TEntry> {
  /**
   * An ordered array of the entries that should appear in this section.
   */
  entries: readonly TEntry[];

  /**
   * A localized message descriptor for the text that should appear as a header
   * for this section.
   */
  header: MessageDescriptor;

  /**
   * A render function that will be called for each entry in {@prop entries}
   * and should return the React representation for this entry.
   *
   * @note It is not necessary to specify `key` on this -- that is already
   * handled internally.
   */
  renderEntry: (entry: TEntry) => React.ReactElement;
}

function ReleaseNotesSection<TEntry>({
  entries,
  header,
  renderEntry,
}: ComponentProps<TEntry>): React.ReactElement {
  // Render the component
  return (
    <div>
      <div className={styles.header}>
        <FormattedMessage {...header} />:
      </div>
      <ul className={styles.entriesContainer}>
        {entries.map(
          (entry, index): React.ReactElement => (
            <li key={index} className={styles.entry}>
              {renderEntry(entry)}
            </li>
          ),
        )}
      </ul>
    </div>
  );
}

export default ReleaseNotesSection;
