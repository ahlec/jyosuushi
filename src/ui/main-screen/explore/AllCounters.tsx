import { values } from "lodash";
import * as React from "react";
import { Link } from "react-router-dom";

import { Counter } from "../../../interfaces";

import { COUNTERS_LOOKUP } from "../../../../data/counters";

import { getCounterLink } from "./constants";

const ALL_COUNTERS = values(COUNTERS_LOOKUP);

export default class AllCounters extends React.PureComponent {
  public render() {
    return <div>{ALL_COUNTERS.map(this.renderStudyPack)}</div>;
  }

  private renderStudyPack = (counter: Counter) => {
    return (
      <Link key={counter.counterId} to={getCounterLink(counter)}>
        {counter.kanji}
      </Link>
    );
  };
}
