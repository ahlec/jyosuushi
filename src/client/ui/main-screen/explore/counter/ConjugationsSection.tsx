import { clamp, sortBy } from "lodash";
import memoizeOne from "memoize-one";
import React from "react";

import { Conjugation, Counter, CountingSystem } from "@jyosuushi/interfaces";
import Localization from "@jyosuushi/localization";
import { conjugateCounter } from "@jyosuushi/japanese/counters";

import styles from "./ConjugationsSection.scss";

const AMOUNTS_TO_DISPLAY = 17;
const MIN_USER_INPUT = 1;
const MAX_USER_INPUT = 999_999_999;

function highlightIrregular(contents: string): React.ReactNode {
  return (
    <span className={styles.irregular} key={contents}>
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

interface ConjugationTile {
  amount: number;
  conjugations: ReadonlyArray<Conjugation>;
}

export default class ConjugationsSection extends React.PureComponent<
  ComponentProps,
  ComponentState
> {
  public state: ComponentState = {
    currentUserInput: AMOUNTS_TO_DISPLAY + 1,
  };

  private readonly memoizeExamplesTable = memoizeOne(
    (counter: Counter): ReadonlyArray<ConjugationTile> => {
      const results: Array<ConjugationTile> = [];
      for (let amount = 1; amount <= AMOUNTS_TO_DISPLAY; ++amount) {
        results.push({
          amount,
          conjugations: conjugateCounter(amount, counter),
        });
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
    (counter: Counter): ReadonlyArray<ConjugationTile> => {
      const results: ConjugationTile[] = [];
      Object.keys(counter.irregulars).forEach((amountStr) => {
        const amount = parseInt(amountStr, 10);
        if (amount <= AMOUNTS_TO_DISPLAY) {
          return;
        }

        results.push({
          amount,
          conjugations: conjugateCounter(amount, counter),
        });
      });

      return sortBy(results, ({ amount }: ConjugationTile): number => amount);
    }
  );

  public render(): React.ReactNode {
    const { counter, localization } = this.props;
    const { currentUserInput } = this.state;

    const furtherIrregulars = this.memoizeIrregularsBeyondExampleTable(counter);

    return (
      <section className={styles.conjugationsSection}>
        <p className={styles.examplesPrefix}>
          {localization.hereAreTheFirstXNumbers(AMOUNTS_TO_DISPLAY)}{" "}
          {this.renderIrregularsWarning(counter)}
        </p>
        <div className={styles.examplesTable}>
          {this.memoizeExamplesTable(counter).map(this.renderConjugationTile)}
          <div>{localization.andSoForth}</div>
        </div>
        {!!furtherIrregulars.length && (
          <React.Fragment>
            <p className={styles.furtherIrregulars}>
              {localization.furtherIrregulars}
            </p>
            <div className={styles.examplesTable}>
              {furtherIrregulars.map(this.renderConjugationTile)}
            </div>
          </React.Fragment>
        )}
        <p className={styles.customInputPrefix}>
          {localization.customCounterAmountInputPrefix}
        </p>
        <div className={styles.conjugatedUserInput}>
          {conjugateCounter(currentUserInput, counter).map(
            this.renderCurrentUserInputItem
          )}
        </div>
        <input
          type="number"
          className={styles.currentUserInput}
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
      props: { localization },
    } = this;
    const numIrregulars = this.memoizeNumIrregulars(counter);
    if (!numIrregulars) {
      return localization.irregularsWarningNoIrregulars;
    }

    return localization.irregularsWarning(numIrregulars, highlightIrregular);
  }

  private renderConjugationTile = ({
    amount,
    conjugations,
  }: ConjugationTile): React.ReactNode => {
    return (
      <div className={styles.conjugationContainer} key={amount}>
        <div className={styles.amount}>{amount}</div>
        <div>{conjugations.map(this.renderConjugation)}</div>
      </div>
    );
  };

  private renderCurrentUserInputItem = (
    conjugation: Conjugation,
    index: number
  ): React.ReactNode => (
    <div
      key={index}
      className={
        conjugation.irregularType
          ? styles.irregular
          : conjugation.countingSystem !== CountingSystem.Kango
          ? styles.nonKango
          : ""
      }
    >
      {conjugation.reading}
    </div>
  );

  private renderConjugation = ({
    countingSystem,
    irregularType,
    reading,
  }: Conjugation): React.ReactNode => {
    return (
      <div
        key={reading}
        className={
          irregularType
            ? styles.irregular
            : countingSystem !== CountingSystem.Kango
            ? styles.nonKango
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
      currentUserInput: clamp(newValue, MIN_USER_INPUT, MAX_USER_INPUT),
    });
  };
}
