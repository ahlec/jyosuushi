import * as React from "react";
import { Link } from "react-router-dom";

import { COUNTERS_LOOKUP } from "@data/counters";

import { Counter, CounterDisambiguation } from "@jyosuushi/interfaces";
import Localization from "@jyosuushi/localization";
import { getPrimaryJapaneseRepresentation } from "@jyosuushi/utils";

import { getCounterLink } from "@jyosuushi/ui/main-screen/explore/pathing";

import "./DisambiguationSection.scss";
import MarkdownPresenter from "./MarkdownPresenter";

export function hasDisambiguationSection(counter: Counter): boolean {
  return counter.disambiguations.length > 0;
}

interface ComponentProps {
  counter: Counter;
  localization: Localization;
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
      <section className="DisambiguationSection">
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
      <div key={otherCounter.counterId} className="disambiguation">
        <div className="counterContainer">
          <Link className="counter" to={getCounterLink(otherCounter)}>
            {getPrimaryJapaneseRepresentation(otherCounter)}
          </Link>
        </div>
        <MarkdownPresenter className="distinction" component={distinction} />
      </div>
    );
  };
}
