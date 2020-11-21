// Taken and modified from https://loading.io/css/

import classnames from "classnames";
import React from "react";

import styles from "./LoadingSpinner.scss";

type SpinnerColor = "pink" | "green" | "blue";

interface ComponentProps {
  /**
   * The color that the spinner should render in.
   */
  color: SpinnerColor;
}

const COLOR_CLASS_NAMES: { [color in SpinnerColor]: string } = {
  blue: styles.blue,
  green: styles.green,
  pink: styles.pink,
};

function LoadingSpinner({ color }: ComponentProps): React.ReactElement {
  return (
    <div
      className={classnames(styles.loadingSpinner, COLOR_CLASS_NAMES[color])}
    >
      <div className={classnames(styles.ring, styles.first)} />
      <div className={classnames(styles.ring, styles.second)} />
      <div className={classnames(styles.ring, styles.third)} />
      <div className={styles.ring} />
    </div>
  );
}

export default LoadingSpinner;
