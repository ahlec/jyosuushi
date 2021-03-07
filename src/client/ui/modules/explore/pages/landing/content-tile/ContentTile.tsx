import classnames from "classnames";
import React from "react";
import { FormattedMessage, MessageDescriptor } from "react-intl";

import TileCorner from "./TileCorner";
import { TileColor } from "./types";

import styles from "./ContentTile.scss";

interface ComponentProps {
  children?: React.ReactNode;
  color: TileColor;
  primaryText: string | MessageDescriptor;
}

const COLOR_CSS_CLASSES: { [color in TileColor]: string } = {
  blue: styles.colorBlue,
  green: styles.colorGreen,
  pink: styles.colorPink,
};

function ContentTile({
  children,
  color,
  primaryText,
}: ComponentProps): React.ReactElement {
  return (
    <div className={classnames(styles.tile, COLOR_CSS_CLASSES[color])}>
      <div
        className={classnames(styles.horizontalAdornment, styles.topAdornment)}
      />
      <div className={styles.content}>
        <div className={styles.primary}>
          {typeof primaryText === "string" ? (
            primaryText
          ) : (
            <FormattedMessage {...primaryText} />
          )}
        </div>
        {children && (
          <>
            <div className={styles.separator} />
            <div className={styles.secondary}>{children}</div>
          </>
        )}
      </div>
      <div
        className={classnames(
          styles.horizontalAdornment,
          styles.bottomAdornment
        )}
      />
      <TileCorner className={styles.bottomLeftCorner} color={color} />
      <TileCorner className={styles.topRightCorner} color={color} />
    </div>
  );
}

export default ContentTile;
