import React from "react";

import { MarkdownComponent } from "@jyosuushi/interfaces";

import MarkdownPresenter from "./MarkdownPresenter";

import * as styles from "./FootnotesSection.scss";

interface ComponentProps {
  footnotes: ReadonlyArray<MarkdownComponent>;
}

class FootnotesSection extends React.PureComponent<ComponentProps> {
  public render(): React.ReactNode {
    const { footnotes } = this.props;
    return (
      <ol className={styles.footnotesSection}>
        {footnotes.map(this.renderFootnote)}
      </ol>
    );
  }

  private renderFootnote = (
    component: MarkdownComponent,
    index: number
  ): React.ReactNode => {
    return (
      <MarkdownPresenter
        key={index}
        className={styles.footnote}
        component={component}
      />
    );
  };
}

export default FootnotesSection;
