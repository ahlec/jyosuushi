import React from "react";

import { ConsumerFacingEntry } from "@changelog";

import Markdown from "./Markdown";

import styles from "./FeatureEntryDisplay.scss";

interface ComponentProps {
  entry: ConsumerFacingEntry;
}

function FeatureEntryDisplay({ entry }: ComponentProps): React.ReactElement {
  return (
    <>
      <span className={styles.label}>{entry.label}</span>{" "}
      <Markdown source={entry.details} />
    </>
  );
}

export default FeatureEntryDisplay;
