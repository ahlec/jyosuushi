import React, { useCallback } from "react";
import { defineMessages, FormattedMessage } from "react-intl";

import { STUDY_PACKS, STUDY_PACK_LOOKUP } from "@data/studyPacks";
import { StudyPack } from "@jyosuushi/interfaces";

import CollectionToggleButton from "./CollectionToggleButton";

import styles from "./PackSelection.scss";

interface ComponentProps {
  onSelectionChanged: (selection: readonly StudyPack[]) => void;
  selection: readonly StudyPack[];
}

function comparePacks(a: StudyPack, b: StudyPack): number {
  return a.packId.localeCompare(b.packId);
}

const INTL_MESSAGES = defineMessages({
  header: {
    defaultMessage: "Study Packs",
    id: "preparePage.PackSelection.header",
  },
  subheader: {
    defaultMessage: "(select 1 or more)",
    id: "preparePage.PackSelection.subheader",
  },
});

function PackSelection({
  onSelectionChanged,
  selection,
}: ComponentProps): React.ReactElement {
  // Handle events
  const handlePackToggled = useCallback(
    (collectionId: string): void => {
      const next = [...selection];

      const index = next.findIndex(
        (pack): boolean => pack.packId === collectionId
      );
      if (index >= 0) {
        next.splice(index, 1);
      } else {
        next.push(STUDY_PACK_LOOKUP[collectionId]);
      }

      next.sort(comparePacks);
      onSelectionChanged(next);
    },
    [onSelectionChanged, selection]
  );

  // Render the component
  return (
    <div className={styles.packSelection}>
      <div className={styles.fieldset}>
        <div className={styles.header}>
          <FormattedMessage {...INTL_MESSAGES.header} tagName="strong" />{" "}
          <span className={styles.subheader}>
            <FormattedMessage {...INTL_MESSAGES.subheader} />
          </span>
        </div>
        {STUDY_PACKS.map(
          (pack): React.ReactElement => (
            <CollectionToggleButton
              key={pack.packId}
              collectionId={pack.packId}
              isSelected={selection.indexOf(pack) >= 0}
              name={pack.englishName}
              numCounters={pack.counters.length}
              onToggle={handlePackToggled}
            />
          )
        )}
      </div>
    </div>
  );
}

export default PackSelection;
