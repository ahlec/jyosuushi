import * as React from "react";
import { Link } from "react-router-dom";

import { COUNTERS_LOOKUP } from "@data/counters";

import { Counter } from "@jyosuushi/interfaces";
import Localization from "@jyosuushi/localization";

import { getCounterLink } from "@jyosuushi/ui/main-screen/explore/pathing";

import "./DisambiguationSection.scss";

export function hasDisambiguationSection(counter: Counter): boolean {
  return !!Object.keys(counter.disambiguations).length;
}

interface ComponentProps {
  counter: Counter;
  localization: Localization;
}

export default class DisambiguationSection extends React.PureComponent<
  ComponentProps
> {
  public render() {
    const { counter } = this.props;

    if (!hasDisambiguationSection(counter)) {
      return null;
    }

    return (
      <section className="DisambiguationSection">
        {Object.keys(counter.disambiguations).map(this.renderCounter)}
      </section>
    );
  }

  private renderCounter = (otherCounterId: string) => {
    const { counter } = this.props;
    const otherCounter = COUNTERS_LOOKUP[otherCounterId];
    return (
      <div key={otherCounterId} className="disambiguation">
        <Link className="counter" to={getCounterLink(otherCounter)}>
          {otherCounter.kanji}
        </Link>
        <div className="distinction">
          {counter.disambiguations[otherCounterId]!.disambiguation}
        </div>
      </div>
    );
  };
}
