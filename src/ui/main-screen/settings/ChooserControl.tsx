import classnames from "classnames";
import { memoize } from "lodash";
import * as React from "react";

import "./ChooserControl.scss";

export interface Choice<TValue> {
  title: string;
  subtext?: string;
  value: TValue;
}

interface ComponentProps<TValue> {
  choices: ReadonlyArray<Choice<TValue>>;
  currentValue: TValue;
  onChoiceClicked: (value: TValue) => void;
}

export default class ChooserControl<TValue> extends React.PureComponent<
  ComponentProps<TValue>
> {
  private onChoiceClicked = memoize((value: TValue) => () => {
    const { currentValue, onChoiceClicked } = this.props;
    if (currentValue === value) {
      return;
    }

    onChoiceClicked(value);
  });

  public render() {
    const { choices } = this.props;
    return (
      <div className="ChooserControl">{choices.map(this.renderChoice)}</div>
    );
  }

  private renderChoice = (choice: Choice<TValue>) => {
    const { currentValue } = this.props;
    return (
      <div
        key={choice.title}
        className={classnames(
          "choice",
          choice.value === currentValue && "selected"
        )}
        onClick={this.onChoiceClicked(choice.value)}
      >
        {choice.title}
        {choice.subtext && <div className="subtext">{choice.subtext}</div>}
      </div>
    );
  };
}
