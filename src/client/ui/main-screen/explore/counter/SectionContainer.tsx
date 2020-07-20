import React from "react";

import styles from "./SectionContainer.scss";

interface ComponentProps {
  children?: React.ReactNode;
  header: string;
}

class SectionContainer extends React.PureComponent<ComponentProps> {
  public render(): React.ReactNode {
    const { children, header } = this.props;
    return (
      <div className={styles.sectionContainer}>
        <div className={styles.header}>{header}</div>
        <div className={styles.contents}>{children}</div>
      </div>
    );
  }
}

export default SectionContainer;
