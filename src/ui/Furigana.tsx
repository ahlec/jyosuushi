import classnames from "classnames";
import * as React from "react";

interface ComponentProps {
  className?: string;
  furigana?: string | null;
  text: string;
}

// Among other things, this globally fixes a bug where <ruby> elements
// in Firefox that are nested directly underneath a { display: flex }
// parent will render with the <rt> floating to the right of the main
// text. Wrapping it in a non-flex parent fixes this issue.

export default class Furigana extends React.PureComponent<ComponentProps> {
  public render(): React.ReactNode {
    const { className, furigana, text } = this.props;
    return (
      <span className={classnames("Furigana", className)}>
        <ruby>
          {text}
          {furigana ? <rt>{furigana}</rt> : null}
        </ruby>
      </span>
    );
  }
}
