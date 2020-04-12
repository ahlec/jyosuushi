import { clamp, sortBy } from "lodash";
import memoizeOne from "memoize-one";
import * as React from "react";

import {
  Conjugation,
  Counter,
  CounterIrregular,
  CountingSystem
} from "@jyosuushi/interfaces";
import Localization from "@jyosuushi/localization";
import { conjugateCounter } from "@jyosuushi/japanese/counters";

import "./ConjugationsSection.scss";

const AMOUNTS_TO_DISPLAY = 17;
const MIN_USER_INPUT = 1;
const MAX_USER_INPUT = 999_999_999;

function highlightIrregular(contents: string): React.ReactNode {
  return (
    <span className="irregular" key={contents}>
      {contents}
    </span>
  );
}

interface ComponentProps {
  counter: Counter;
  localization: Localization;
}

interface ComponentState {
  currentUserInput: number;
}

export default class ConjugationsSection extends React.PureComponent<
  ComponentProps,
  ComponentState
> {
  public state: ComponentState = {
    currentUserInput: AMOUNTS_TO_DISPLAY + 1
  };

  private readonly memoizeExamplesTable = memoizeOne(
    (counter: Counter): ReadonlyArray<ReadonlyArray<Conjugation>> => {
      const results: Array<ReadonlyArray<Conjugation>> = [];
      for (let amount = 1; amount <= AMOUNTS_TO_DISPLAY; ++amount) {
        results.push(conjugateCounter(amount, counter));
      }

      return results;
    }
  );

  private readonly memoizeNumIrregulars = memoizeOne(
    (counter: Counter): number => {
      return Object.keys(counter.irregulars).reduce(
        (sum: number, amountStr: string): number => {
          return sum + counter.irregulars[parseInt(amountStr, 10)].length;
        },
        0
      );
    }
  );

  private readonly memoizeIrregularsBeyondExampleTable = memoizeOne(
    (counter: Counter): ReadonlyArray<CounterIrregular> => {
      const results: CounterIrregular[] = [];
      Object.keys(counter.irregulars).forEach(amountStr => {
        const amount = parseInt(amountStr, 10);
        if (amount <= AMOUNTS_TO_DISPLAY) {
          return;
        }

        // TODO: This won't group multiple irregulars of the same amount so
        // they'll appear on different lines.
        results.push(...counter.irregulars[amount]);
      });

      return sortBy(results, (irregular): number => irregular.amount);
    }
  );

  public render(): React.ReactNode {
    const { counter, localization } = this.props;
    const { currentUserInput } = this.state;

    const furtherIrregulars = this.memoizeIrregularsBeyondExampleTable(counter);

    return (
      <section className="ConjugationsSection">
        <p className="examples-prefix">
          {localization.hereAreTheFirstXNumbers(AMOUNTS_TO_DISPLAY)}{" "}
          {this.renderIrregularsWarning(counter)}
        </p>
        <div className="examples-table">
          {this.memoizeExamplesTable(counter).map(this.renderAmountTile)}
          <div className="etc">{localization.andSoForth}</div>
        </div>
        {!!furtherIrregulars.length && (
          <React.Fragment>
            <p className="further-irregulars">
              {localization.furtherIrregulars}
            </p>
            <div className="examples-table">
              {furtherIrregulars.map(this.renderFurtherIrregular)}
            </div>
          </React.Fragment>
        )}
        <p className="custom-input-prefix">
          {localization.customCounterAmountInputPrefix}
        </p>
        <div className="conjugated-user-input">
          {conjugateCounter(currentUserInput, counter).map(
            this.renderCurrentUserInputItem
          )}
        </div>
        <input
          type="number"
          className="current-user-input"
          min={MIN_USER_INPUT}
          max={MAX_USER_INPUT}
          value={currentUserInput}
          onChange={this.onUserInputChanged}
        />
      </section>
    );
  }

  private renderIrregularsWarning(counter: Counter): React.ReactNode {
    const {
      props: { localization }
    } = this;
    const numIrregulars = this.memoizeNumIrregulars(counter);
    if (!numIrregulars) {
      return localization.irregularsWarningNoIrregulars;
    }

    return localization.irregularsWarning(numIrregulars, highlightIrregular);
  }

  private renderAmountTile = (
    conjugations: ReadonlyArray<Conjugation>,
    index: number
  ): React.ReactNode => {
    const amount = index + 1;
    return (
      <div className="conjugation-container" key={index}>
        <div className="amount">{amount}</div>
        <div className="conjugations">
          {conjugations.map(this.renderConjugation)}
        </div>
      </div>
    );
  };

  private renderFurtherIrregular = ({
    amount,
    reading
  }: CounterIrregular): React.ReactNode => {
    return (
      <div className="conjugation-container" key={amount}>
        <div className="amount">{amount}</div>
        <div className="conjugations">
          <div className="irregular">{reading}</div>
        </div>
      </div>
    );
  };

  private renderCurrentUserInputItem = (
    conjugation: Conjugation,
    index: number
  ): React.ReactNode => <div key={index}>{conjugation.reading}</div>;

  private renderConjugation = ({
    countingSystem,
    irregularType,
    reading
  }: Conjugation): React.ReactNode => {
    return (
      <div
        key={reading}
        className={
          irregularType
            ? "irregular"
            : countingSystem !== CountingSystem.Kango
            ? "non-kango"
            : ""
        }
      >
        {reading}
      </div>
    );
  };

  private onUserInputChanged = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const newValue = event.target.valueAsNumber;

    if (
      isNaN(newValue) ||
      newValue < MIN_USER_INPUT ||
      newValue > MAX_USER_INPUT
    ) {
      return;
    }

    this.setState({
      currentUserInput: clamp(newValue, MIN_USER_INPUT, MAX_USER_INPUT)
    });
  };
}
