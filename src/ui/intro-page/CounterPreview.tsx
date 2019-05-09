import { memoize } from "lodash";
import * as React from "react";

import { StudyPack } from "../../data/study-packs";
import Localization from "../../localization";
import { Counter } from "../../redux";
import { getDistinctCounters } from "../../utils";

import "./CounterPreview.scss";

const getCountersForPacks = memoize(
  (packs: ReadonlyArray<StudyPack>) => getDistinctCounters(packs),
  (packs: ReadonlyArray<StudyPack>) =>
    JSON.stringify(packs.map(({ packId }) => packId))
);

interface ComponentProps {
  localization: Localization;
  packs: ReadonlyArray<StudyPack>;
}

export default class CounterPreview extends React.PureComponent<
  ComponentProps
> {
  public render() {
    const { localization, packs } = this.props;
    const counters = getCountersForPacks(packs);

    if (!counters.length) {
      return null;
    }

    return (
      <div className="CounterPreview">
        <h3>{localization.countersDisplayHeader(counters.length)}</h3>
        <div className="counters">{counters.map(this.renderCounter)}</div>
      </div>
    );
  }

  private renderCounter = (counter: Counter) => {
    const { localization } = this.props;
    return (
      <div key={counter.counterId} className="counter">
        <div className="kanji">{counter.kanji}</div>
        <div className="name">{localization.counterName(counter)}</div>
      </div>
    );
  };
}
