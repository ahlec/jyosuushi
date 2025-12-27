import classnames from "classnames";
import React from "react";

import HeaderSubtitle from "./HeaderSubtitle";
import { HeaderColorTheme, HeaderSubtitleEntryDefinition } from "./types";
import * as styles from "./PageHeader.scss";

interface ComponentProps {
  /**
   * The primary text representation that should appear as the main title.
   */
  children: React.ReactElement | string;

  /**
   * The color theme that should be used for the header.
   */
  colorTheme: HeaderColorTheme;

  /**
   * An ordered array of entries that should appear in the subtitle area
   * underneath the page title.
   */
  subtitleEntries: readonly HeaderSubtitleEntryDefinition[];
}

const BACKGROUND_OVERLAY_CSS_CLASS_NAMES: {
  [color in HeaderColorTheme]: string;
} = {
  blue: styles.overlayBlue,
  green: styles.overlayGreen,
  pink: styles.overlayPink,
};

function PageHeader({
  children,
  colorTheme,
  subtitleEntries,
}: ComponentProps): React.ReactElement {
  // Render the component
  return (
    <div className={styles.container}>
      <div
        className={classnames(
          styles.overlay,
          BACKGROUND_OVERLAY_CSS_CLASS_NAMES[colorTheme],
        )}
      />
      <div className={styles.contents}>
        <h3 className={styles.header}>{children}</h3>
        <div className={styles.separator} />
        <HeaderSubtitle color={colorTheme} entries={subtitleEntries} />
      </div>
    </div>
  );
}

export default PageHeader;
