import classnames from "classnames";
import * as React from "react";

import "./Markdown.scss";

interface ComponentProps {
  className?: string;
  content: string;
}

export default class Markdown extends React.PureComponent<ComponentProps> {
  public render(): React.ReactNode {
    const { className, content } = this.props;
    return (
      <div
        className={classnames("Markdown", className)}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }
}
