import memoizeOne from "memoize-one";
import * as React from "react";
import { Link } from "react-router-dom";

import { COUNTERS_LOOKUP } from "@data/counters";

import { Counter } from "@jyosuushi/interfaces";
import Localization from "@jyosuushi/localization";
import { getPrimaryJapaneseRepresentation } from "@jyosuushi/utils";

import { getCounterLink } from "@jyosuushi/ui/main-screen/explore/pathing";

import "./DisambiguationSection.scss";

export function hasDisambiguationSection(counter: Counter): boolean {
  return !!Object.keys(counter.disambiguations).length;
}

interface ComponentProps {
  counter: Counter;
  localization: Localization;
}

interface Disambiguation {
  distinction: string;
  otherCounter: Counter;
}

export default class DisambiguationSection extends React.PureComponent<
  ComponentProps
> {
  private readonly getDisambiguations = memoizeOne(
    (counter: Counter): ReadonlyArray<Disambiguation> => {
      const disambiguations: Disambiguation[] = [];

      const entries = Object.entries(counter.disambiguations);
      for (const [otherCounterId, info] of entries) {
        if (!info) {
          continue;
        }

        disambiguations.push({
          distinction: info.disambiguation,
          otherCounter: COUNTERS_LOOKUP[otherCounterId]
        });
      }

      return disambiguations;
    }
  );

  public render(): React.ReactNode {
    const { counter } = this.props;
    const disambiguations = this.getDisambiguations(counter);
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
    otherCounter
  }: Disambiguation): React.ReactNode => {
    return (
      <div key={otherCounter.counterId} className="disambiguation">
        <Link className="counter" to={getCounterLink(otherCounter)}>
          {getPrimaryJapaneseRepresentation(otherCounter)}
        </Link>
        <div className="distinction">{distinction}</div>
      </div>
    );
  };
}
