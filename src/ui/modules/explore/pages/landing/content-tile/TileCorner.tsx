import classnames from "classnames";
import React from "react";

import { TileColor } from "./types";

import * as styles from "./TileCorner.scss";

interface ComponentProps {
  className: string;
  color: TileColor;
}

const LINE_COLOR_CSS_CLASS_NAMES: { [color in TileColor]: string } = {
  blue: styles.blueLine,
  green: styles.greenLine,
  pink: styles.pinkLine,
};

function TileCorner({ className, color }: ComponentProps): React.ReactElement {
  return (
    <div className={classnames(styles.container, className)}>
      <div
        className={classnames(styles.line, LINE_COLOR_CSS_CLASS_NAMES[color])}
      />
    </div>
  );
}

export default TileCorner;
