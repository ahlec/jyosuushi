import * as React from "react";
import { Link } from "react-router-dom";

import { COUNTERS_LOOKUP } from "@data/counters";

import { Counter, CounterDisambiguation } from "@jyosuushi/interfaces";
import { getPrimaryJapaneseRepresentation } from "@jyosuushi/utils";

import { getCounterLink } from "@jyosuushi/ui/modules/explore/pathing";

import MarkdownPresenter from "./MarkdownPresenter";
import styles from "./DisambiguationSection.scss";

export function hasDisambiguationSection(counter: Counter): boolean {
  return counter.disambiguations.length > 0;
}

interface ComponentProps {
  counter: Counter;
}

export default class DisambiguationSection extends React.PureComponent<
  ComponentProps
> {
  public render(): React.ReactNode {
    const {
      counter: { disambiguations },
    } = this.props;
    if (!disambiguations.length) {
      return null;
    }

    return (
      <section className={styles.disambiguationSection}>
        {disambiguations.map(this.renderDisambiguation)}
      </section>
    );
  }

  private renderDisambiguation = ({
    distinction,
    otherCounterId,
  }: CounterDisambiguation): React.ReactNode => {
    const otherCounter = COUNTERS_LOOKUP[otherCounterId];
    return (
      <div key={otherCounter.counterId} className={styles.disambiguation}>
        <div className={styles.counterContainer}>
          <Link
            className={styles.counter}
            to={getCounterLink(otherCounter.counterId)}
          >
            {getPrimaryJapaneseRepresentation(otherCounter)}
          </Link>
        </div>
        <MarkdownPresenter
          className={styles.distinction}
          component={distinction}
        />
      </div>
    );
  };
}
