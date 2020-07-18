import * as React from "react";

import "./SectionContainer.scss";

interface ComponentProps {
  children?: React.ReactNode;
  header: string;
}

class SectionContainer extends React.PureComponent<ComponentProps> {
  public render(): React.ReactNode {
    const { children, header } = this.props;
    return (
      <div className="SectionContainer">
        <div className="header">{header}</div>
        <div className="contents">{children}</div>
      </div>
    );
  }
}

export default SectionContainer;
