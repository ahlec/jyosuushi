import * as React from "react";

import { Counter } from "../redux";

interface ComponentProps {
  counter: Counter;
}

export default class CounterDetails extends React.PureComponent<
  ComponentProps
> {
  public render() {
    const { counter } = this.props;
    return <div>{counter.kanji}</div>;
  }
}
