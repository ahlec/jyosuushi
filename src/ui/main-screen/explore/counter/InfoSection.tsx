import * as React from "react";

import { Counter, ExternalLink } from "@jyosuushi/interfaces";
import Localization from "@jyosuushi/localization";

import MarkdownPresenter from "./MarkdownPresenter";

import "./InfoSection.scss";

interface ComponentProps {
  counter: Counter;
  localization: Localization;
}

export function hasInfoSectionContents(counter: Counter): boolean {
  return !!counter.notes || !!counter.externalLinks.length;
}

export default class InfoSection extends React.PureComponent<ComponentProps> {
  public render(): React.ReactNode {
    const { counter, localization } = this.props;

    if (!counter.notes && !counter.externalLinks.length) {
      return null;
    }

    return (
      <section className="InfoSection">
        {counter.notes && (
          <MarkdownPresenter component={counter.notes} className="notes" />
        )}
        {counter.externalLinks.length ? (
          <React.Fragment>
            <h6>
              {counter.notes
                ? localization.furtherReading
                : localization.externalLinksHeader}
            </h6>
            <ul className="external-links">
              {counter.externalLinks.map(this.renderLink)}
            </ul>
          </React.Fragment>
        ) : null}
      </section>
    );
  }

  private renderLink = (link: ExternalLink): React.ReactNode => {
    return (
      <li key={link.url}>
        <a href={link.url} target="_blank" rel="noopener noreferrer">
          <strong className="site">[{link.siteName}]</strong>
          {link.displayText}
        </a>
        {link.additionalDescription && (
          <div className="additional-description">
            {link.additionalDescription}
          </div>
        )}
      </li>
    );
  };
}
