import classnames from "classnames";
import { memoize } from "lodash";
import * as React from "react";

// import { ITEMS_FROM_COUNTER } from "../data/items";
import { conjugateNumberAndCounter } from "../japanese/counters";
import { Counter } from "../redux";

import "./CounterDetails.scss";

const AMOUNTS_TO_DISPLAY = 17;

interface ComponentProps {
  counter: Counter;
}

interface Conjugation {
  conjugation: string;
  irregular: boolean;
}

interface Irregular {
  conjugation: string;
  amount: number;
}

const getConjugations = memoize(
  (counter: Counter): ReadonlyArray<ReadonlyArray<Conjugation>> => {
    const results: Array<ReadonlyArray<Conjugation>> = [];
    for (let amount = 1; amount <= AMOUNTS_TO_DISPLAY; ++amount) {
      if (counter.irregulars[amount]) {
        results[amount - 1] = [
          {
            conjugation: counter.irregulars[amount],
            irregular: true
          }
        ];
      } else {
        results[amount - 1] = conjugateNumberAndCounter(amount, {
          kana: counter.kana,
          kanji: counter.kanji
        }).map(({ kana }) => ({
          conjugation: kana,
          irregular: false
        }));
      }
    }

    return results;
  },
  (counter: Counter) => counter.counterId
);

function compareIrregulars(a: Irregular, b: Irregular): number {
  return a.amount - b.amount;
}

const getFurtherIrregulars = memoize(
  (counter: Counter): ReadonlyArray<Irregular> => {
    const results: Irregular[] = [];
    Object.keys(counter.irregulars).forEach(amountStr => {
      const amount = parseInt(amountStr, 10);
      if (amount <= AMOUNTS_TO_DISPLAY) {
        return;
      }

      results.push({
        amount,
        conjugation: counter.irregulars[amount]
      });
    });

    results.sort(compareIrregulars);
    return results;
  },
  (counter: Counter) => counter.counterId
);

export default class CounterDetails extends React.PureComponent<
  ComponentProps
> {
  public render() {
    const { counter } = this.props;
    const conjugations = getConjugations(counter);
    const furtherIrregulars = getFurtherIrregulars(counter);
    return (
      <div className="CounterDetails">
        <div className="kanji">{counter.kanji}</div>
        <p className="examples-prefix">
          Here are the first {AMOUNTS_TO_DISPLAY} numbers.{" "}
          {this.renderIrregularsWarning()}
        </p>
        <div className="examples-table">
          {conjugations.map(this.renderAmountTile)}
          <div className="etc">... and so forth</div>
        </div>
        {!!furtherIrregulars.length && (
          <React.Fragment>
            <p className="further-irregulars">
              There are some more irregulars later on as well though:
            </p>
            <div className="examples-table">
              {furtherIrregulars.map(this.renderFurtherIrregular)}
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }

  private renderIrregularsWarning() {
    const { counter } = this.props;
    const numIrregulars = Object.keys(counter.irregulars).length;
    if (!numIrregulars) {
      return "Luckily, there are no irregular conjugations with this counter!";
    }

    if (numIrregulars === 1) {
      return (
        <React.Fragment>
          Make note of the{" "}
          <span className="irregular">irregular conjugation</span>.
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        Make note of the{" "}
        <span className="irregular">
          {numIrregulars} irregular conjugations
        </span>
        .
      </React.Fragment>
    );
  }

  private renderAmountTile = (
    conjugations: ReadonlyArray<Conjugation>,
    index: number
  ) => {
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

  private renderConjugation = (
    { conjugation, irregular }: Conjugation,
    index: number
  ) => {
    return (
      <div key={conjugation} className={classnames(irregular && "irregular")}>
        {conjugation}
      </div>
    );
  };

  private renderFurtherIrregular = ({ amount, conjugation }: Irregular) => {
    return (
      <div className="conjugation-container" key={amount}>
        <div className="amount">{amount}</div>
        <div className="conjugations">
          <div className="irregular">{conjugation}</div>
        </div>
      </div>
    );
  };
}
