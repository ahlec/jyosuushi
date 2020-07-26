import * as React from "react";
import { defineMessages, FormattedMessage } from "react-intl";

import {
  Counter,
  ExternalLink,
  ExternalLinkLanguage,
} from "@jyosuushi/interfaces";

import IconFlagJapan from "@jyosuushi/icons/flag-japan.png";
import IconFlagUsa from "@jyosuushi/icons/flag-usa.png";

import MarkdownPresenter from "./MarkdownPresenter";

import styles from "./InfoSection.scss";

interface ComponentProps {
  counter: Counter;
}

const INTL_MESSAGES = defineMessages({
  externalLinksHeader: {
    defaultMessage: "Further Reading",
    id: "explorePage.counter.info.externalLinksHeader",
  },
});

export function hasInfoSectionContents(counter: Counter): boolean {
  return !!counter.notes || !!counter.externalLinks.length;
}

export default class InfoSection extends React.PureComponent<ComponentProps> {
  public render(): React.ReactNode {
    const { counter } = this.props;

    if (!counter.notes && !counter.externalLinks.length) {
      return null;
    }

    return (
      <section className={styles.infoSection}>
        {counter.notes && (
          <MarkdownPresenter
            component={counter.notes}
            className={styles.notes}
          />
        )}
        {counter.externalLinks.length ? (
          <React.Fragment>
            <FormattedMessage
              {...INTL_MESSAGES.externalLinksHeader}
              tagName="h6"
            />
            <ul className={styles.externalLinks}>
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
            className={styles.languageIcon}
            alt={languageAlt}
          />
          <strong className={styles.site}>[{link.siteName}]</strong>
          {link.displayText}
        </a>
        <div className={styles.description}>{link.description}</div>
      </li>
    );
  };
}
