import React from "react";

import { ConsumerFacingEntry } from "@changelog";

import Markdown from "./Markdown";

import * as styles from "./FeatureEntryDisplay.scss";

interface ComponentProps {
  entry: ConsumerFacingEntry;
}

function FeatureEntryDisplay({ entry }: ComponentProps): React.ReactElement {
  return (
    <>
      <span className={styles.label}>{entry.label}</span>{" "}
      <Markdown className={styles.details} source={entry.details} />
      {entry.nestedListItems?.length ? (
        <ul className={styles.nestedItems}>
          {entry.nestedListItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : null}
    </>
  );
}

export default FeatureEntryDisplay;
