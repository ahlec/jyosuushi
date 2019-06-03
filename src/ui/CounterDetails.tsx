import classnames from "classnames";
import { memoize } from "lodash";
import * as React from "react";

import { ITEMS_FROM_COUNTER } from "../../data/items";
import { conjugateNumberAndCounter } from "../japanese/counters";
import Localization from "../localization";
import { Counter, Item } from "../redux";

import "./CounterDetails.scss";

const AMOUNTS_TO_DISPLAY = 17;

interface ComponentProps {
  counter: Counter;
  localization: Localization;
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

function highlightIrregular(contents: string) {
  return (
    <span className="irregular" key={contents}>
      {contents}
    </span>
  );
}

export default class CounterDetails extends React.PureComponent<
  ComponentProps
> {
  public render() {
    const { counter, localization } = this.props;
    const conjugations = getConjugations(counter);
    const furtherIrregulars = getFurtherIrregulars(counter);
    const items = ITEMS_FROM_COUNTER[counter.counterId];
    return (
      <div className="CounterDetails">
        <div className="kanji">{counter.kanji}</div>
        <p className="examples-prefix">
          {localization.hereAreTheFirstXNumbers(AMOUNTS_TO_DISPLAY)}{" "}
          {this.renderIrregularsWarning()}
        </p>
        <div className="examples-table">
          {conjugations.map(this.renderAmountTile)}
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
        {items.length > 1 && ( // don't show list if only one item, will be rule
          <React.Fragment>
            <p className="items-prefix">
              {localization.counterItemsPrefix(items.length)}
            </p>
            <div className="items-list">{items.map(this.renderItem)}</div>
          </React.Fragment>
        )}
      </div>
    );
  }

  private renderIrregularsWarning() {
    const { counter, localization } = this.props;
    const numIrregulars = Object.keys(counter.irregulars).length;
    if (!numIrregulars) {
      return localization.irregularsWarningNoIrregulars;
    }

    return localization.irregularsWarning(numIrregulars, highlightIrregular);
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

  private renderItem = (item: Item) => {
    const { localization } = this.props;
    return <div key={item.itemId}>{localization.itemPlural(item)}</div>;
  };
}
