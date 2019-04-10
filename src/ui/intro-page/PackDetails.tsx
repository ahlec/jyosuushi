import classnames from "classnames";
import { memoize } from "lodash";
import * as React from "react";

import { StudyPack } from "../../data/study-packs";
import { Counter } from "../../redux";

import RightIcon from "../right.svg";

import "./PackDetails.scss";

interface ComponentProps {
  enabled: boolean;
  onInvestigateCounter: (counter: Counter) => void;
  pack: StudyPack;
}

export default class PackDetails extends React.PureComponent<ComponentProps> {
  private onClickInvestigate = memoize((counter: Counter) => () => {
    const { enabled, onInvestigateCounter } = this.props;
    if (!enabled) {
      return;
    }

    onInvestigateCounter(counter);
  });

  public render() {
    const {
      pack: { counters }
    } = this.props;
    return (
      <div className="PackDetails">
        <p>
          This pack contains{" "}
          <strong>
            {counters.length} {counters.length === 1 ? "counter" : "counters"}
          </strong>
          :
        </p>
        {counters.map(this.renderCounter)}
      </div>
    );
  }

  private renderCounter = (counter: Counter) => {
    const { enabled } = this.props;
    return (
      <div
        key={counter.counterId}
        className={classnames("counter", !enabled && "disabled")}
        onClick={this.onClickInvestigate(counter)}
      >
        <ruby className="jp">
          {counter.kanji || counter.kana}
          {counter.kanji && <rt>{counter.kana}</rt>}
        </ruby>
        <div className="name">{counter.name}</div>
        <RightIcon />
      </div>
    );
  };
}
