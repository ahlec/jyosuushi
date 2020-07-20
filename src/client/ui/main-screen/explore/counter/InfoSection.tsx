import * as React from "react";

import {
  Counter,
  ExternalLink,
  ExternalLinkLanguage,
} from "@jyosuushi/interfaces";
import Localization from "@jyosuushi/localization";

import IconFlagJapan from "@jyosuushi/icons/flag-japan.png";
import IconFlagUsa from "@jyosuushi/icons/flag-usa.png";

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
    let languageIconSrc: string;
    let languageAlt: string;
    switch (link.language) {
      case ExternalLinkLanguage.Japanese: {
        languageIconSrc = IconFlagJapan;
        languageAlt = "[日本語]";
        break;
      }
      case ExternalLinkLanguage.English: {
        languageIconSrc = IconFlagUsa;
        languageAlt = "[English]";
        break;
      }
    }

    return (
      <li key={link.url}>
        <a href={link.url} target="_blank" rel="noopener noreferrer">
          <img
            src={languageIconSrc}
            className="language-icon"
            alt={languageAlt}
          />
          <strong className="site">[{link.siteName}]</strong>
          {link.displayText}
        </a>
        <div className="description">{link.description}</div>
      </li>
    );
  };
}
