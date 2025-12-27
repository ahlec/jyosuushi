// Taken and modified from https://loading.io/css/

import classnames from "classnames";
import React from "react";

import * as styles from "./LoadingSpinner.scss";

type SpinnerColor = "pink" | "green" | "blue";

interface ComponentProps {
  /**
   * An optional CSS class name that will be included on the root DOM element
   * rendered by this component.
   */
  className?: string;

  /**
   * The color that the spinner should render in.
   */
  color: SpinnerColor;

  /**
   * An optional number which, if provided, should be the measurement in pixels
   * for the width and height of the DOM element rendered.
   *
   * @default 80px
   */
  size?: number;

  /**
   * An optional number which, if provided, should be a measurement in pixels
   * for how thick the lines of the spinner should be.
   *
   * @default 8px
   */
  thickness?: number;
}

const COLOR_CLASS_NAMES: { [color in SpinnerColor]: string } = {
  blue: styles.blue,
  green: styles.green,
  pink: styles.pink,
};

function LoadingSpinner({
  className,
  color,
  size = 80,
  thickness = 8,
}: ComponentProps): React.ReactElement {
  return (
    <div
      className={classnames(
        styles.loadingSpinner,
        COLOR_CLASS_NAMES[color],
        className,
      )}
      style={{
        height: size,
        width: size,
      }}
    >
      <div
        className={classnames(styles.ring, styles.first)}
        style={{ borderWidth: thickness }}
      />
      <div
        className={classnames(styles.ring, styles.second)}
        style={{ borderWidth: thickness }}
      />
      <div
        className={classnames(styles.ring, styles.third)}
        style={{ borderWidth: thickness }}
      />
      <div className={styles.ring} style={{ borderWidth: thickness }} />
    </div>
  );
}

export default LoadingSpinner;
