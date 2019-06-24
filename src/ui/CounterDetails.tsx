import classnames from "classnames";
import { memoize } from "lodash";
import * as React from "react";

import { ITEMS_FROM_COUNTER } from "../../data/items";
import { ConjugationCategory, Counter, Item } from "../interfaces";
import Localization from "../localization";
import { conjugateCounter, ConjugatedInfo } from "../utils";

import "./CounterDetails.scss";

const AMOUNTS_TO_DISPLAY = 17;

interface ComponentProps {
  counter: Counter;
  localization: Localization;
}

interface Irregular {
  conjugation: string;
  amount: number;
}

const getConjugations = memoize(
  (counter: Counter): ReadonlyArray<ReadonlyArray<ConjugatedInfo>> => {
    const results: Array<ReadonlyArray<ConjugatedInfo>> = [];
    for (let amount = 1; amount <= AMOUNTS_TO_DISPLAY; ++amount) {
      results[amount - 1] = conjugateCounter(amount, counter);
    }

    return results;
  },
  (counter: Counter) => counter.counterId
);

const countIrregulars = memoize(
  (conjugations: ReadonlyArray<ReadonlyArray<ConjugatedInfo>>) =>
    conjugations.reduce(
      (total: number, nested: ReadonlyArray<ConjugatedInfo>) => {
        return (
          total +
          nested.filter(
            ({ category }) => category === ConjugationCategory.Irregular
          ).length
        );
      },
      0
    )
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

      // TODO: This won't group multiple irregulars of the same amount so
      // they'll appear on different lines.
      const conjugations = conjugateCounter(amount, counter);
      for (const conjugation of conjugations) {
        results.push({
          amount,
          conjugation: conjugation.kana
        });
      }
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
    const conjugations = getConjugations(counter);
    const numIrregulars = countIrregulars(conjugations);
    if (!numIrregulars) {
      return localization.irregularsWarningNoIrregulars;
    }

    return localization.irregularsWarning(numIrregulars, highlightIrregular);
  }

  private renderAmountTile = (
    conjugations: ReadonlyArray<ConjugatedInfo>,
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

  private renderConjugation = ({ category, kana }: ConjugatedInfo) => {
    return (
      <div
        key={kana}
        className={classnames(
          category === ConjugationCategory.Strange && "strange",
          category === ConjugationCategory.Irregular && "irregular"
        )}
      >
        {kana}
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
