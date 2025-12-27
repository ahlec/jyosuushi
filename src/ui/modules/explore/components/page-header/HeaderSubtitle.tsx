import classnames from "classnames";
import React from "react";

import SubtitleEntry from "./SubtitleEntry";
import { HeaderColorTheme, HeaderSubtitleEntryDefinition } from "./types";

import * as styles from "./HeaderSubtitle.scss";

interface ComponentProps {
  color: HeaderColorTheme;
  entries: readonly HeaderSubtitleEntryDefinition[];
}

const SEPARATOR_CSS_CLASS_NAMES: { [color in HeaderColorTheme]: string } = {
  blue: styles.separatorBlue,
  green: styles.separatorGreen,
  pink: styles.separatorPink,
};

function HeaderSubtitle({
  color,
  entries,
}: ComponentProps): React.ReactElement {
  // Render the component
  return (
    <div className={styles.container}>
      {entries.map((entry, index) => [
        index > 0 && (
          <span
            key={`separator-${index - 1}`}
            className={classnames(
              styles.separator,
              SEPARATOR_CSS_CLASS_NAMES[color],
            )}
          >
            |
          </span>
        ),
        <SubtitleEntry
          key={entry.uniqueId}
          message={entry.text}
          value={entry.value}
        />,
      ])}
    </div>
  );
}

export default HeaderSubtitle;
