import React from "react";
import {
  defineMessages,
  FormattedMessage,
  MessageDescriptor,
} from "react-intl";

import { BugFixBrowser, BugFixEntry } from "@changelog";

import Markdown from "./Markdown";

import styles from "./BugFixEntryDisplay.scss";

const INTL_MESSAGES = defineMessages({
  browserChrome: {
    defaultMessage: "Chrome",
    id: "releaseNotes.browserNames.chrome",
  },
  browserEdge: {
    defaultMessage: "Microsoft Edge",
    id: "releaseNotes.browserNames.edge",
  },
  browserFirefox: {
    defaultMessage: "Firefox",
    id: "releaseNotes.browserNames.firefox",
  },
  browserIE: {
    defaultMessage: "Internet Explorer",
    id: "releaseNotes.browserNames.ie",
  },
  browserSafari: {
    defaultMessage: "Safari",
    id: "releaseNotes.browserNames.safari",
  },
});

const BROWSER_NAMES: { [browser in BugFixBrowser]: MessageDescriptor } = {
  chrome: INTL_MESSAGES.browserChrome,
  edge: INTL_MESSAGES.browserEdge,
  firefox: INTL_MESSAGES.browserFirefox,
  ie: INTL_MESSAGES.browserIE,
  safari: INTL_MESSAGES.browserSafari,
};

interface ComponentProps {
  entry: BugFixEntry;
}

function BugFixEntryDisplay({ entry }: ComponentProps): React.ReactElement {
  return (
    <>
      {entry.browser && (
        <>
          [
          <span className={styles.browser}>
            <FormattedMessage {...BROWSER_NAMES[entry.browser]} />
          </span>
          ]{" "}
        </>
      )}
      <Markdown source={entry.text} />
    </>
  );
}

export default BugFixEntryDisplay;
