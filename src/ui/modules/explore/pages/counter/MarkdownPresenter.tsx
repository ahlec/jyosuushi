import classnames from "classnames";
import * as React from "react";

import { MarkdownComponent } from "@jyosuushi/interfaces";

import * as styles from "./MarkdownPresenter.scss";

interface ComponentProps {
  component: MarkdownComponent;
  className: string;
}

class MarkdownPresenter extends React.PureComponent<ComponentProps> {
  public render(): React.ReactNode {
    const { component: Component, className } = this.props;
    return (
      <div className={classnames(styles.markdownPresenter, className)}>
        <Component />
      </div>
    );
  }
}

export default MarkdownPresenter;
