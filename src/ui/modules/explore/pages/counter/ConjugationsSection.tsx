import classnames from "classnames";
import { clamp, sortBy } from "lodash";
import memoizeOne from "memoize-one";
import React from "react";
import { defineMessages, FormattedMessage } from "react-intl";

import {
  Conjugation,
  Counter,
  CounterAnnotation,
  CounterFrequency,
  CountingSystem,
} from "@jyosuushi/interfaces";
import { conjugateCounter } from "@jyosuushi/japanese/counters";

import * as styles from "./ConjugationsSection.scss";

const AMOUNTS_TO_DISPLAY = 17;
const MIN_USER_INPUT = 1;
const MAX_USER_INPUT = 999_999_999;

interface ComponentProps {
  counter: Counter;
}

interface ComponentState {
  currentUserInput: number;
}

interface ConjugationTile {
  amount: number;
  conjugations: ReadonlyArray<Conjugation>;
}

const FREQUENCY_DISPLAYS: Record<
  CounterFrequency,
  { className: string; prefix: string }
> = {
  [CounterFrequency.Common]: { className: "", prefix: "" },
  [CounterFrequency.Uncommon]: { className: styles.uncommon, prefix: "uncom." },
  [CounterFrequency.Archaic]: { className: styles.archaic, prefix: "arch." },
};

const INTL_MESSAGES = defineMessages({
  andSoForth: {
    defaultMessage: "... and so forth",
    id: "explorePage.counter.conjugationSection.andSoForth",
  },
  customCounterAmountInputPrefix: {
    defaultMessage: "Or you can try out any number you'd like to here:",
    id: "explorePage.counter.conjugationSection.customCounterAmountInputPrefix",
  },
  furtherIrregulars: {
    defaultMessage: "There are some more irregulars later on as well though:",
    id: "explorePage.counter.conjugationSection.furtherIrregulars",
  },
  hereAreTheFirstXNumbers: {
    defaultMessage:
      "Here {amount, plural, one {is} other {are}} the first {amount, plural, one {# number} other {# numbers}}.",
    id: "explorePage.counter.conjugationSection.hereAreTheFirstXNumbers",
  },
  introNoIrregulars: {
    defaultMessage:
      "Luckily, there are no irregular conjugations with this counter!",
    id: "explorePage.counter.conjugationSection.introNoIrregulars",
  },
  introWithIrregulars: {
    defaultMessage: "Make note of the {highlightedElement}.",
    id: "explorePage.counter.conjugationSection.introWithIrregulars",
  },
  numIrregulars: {
    defaultMessage:
      "{numIrregulars, plural, one {1 irregular conjugation} other {# irregular conjugations}}",
    id: "explorePage.counter.conjugationSection.numIrregulars",
  },
});

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
    },
  );

  private readonly memoizeNumIrregulars = memoizeOne(
    (counter: Counter): number => {
      return Object.values(counter.annotations).reduce(
        (
          sum: number,
          annotations: ReadonlyArray<CounterAnnotation> | undefined,
        ): number => {
          let numIrregularsForAmount = 0;
          annotations?.forEach((annotation): void => {
            if (annotation.kind !== "irregular") {
              return;
            }

            numIrregularsForAmount++;
          });

          return sum + numIrregularsForAmount;
        },
        0,
      );
    },
  );

  private readonly memoizeIrregularsBeyondExampleTable = memoizeOne(
    (counter: Counter): ReadonlyArray<ConjugationTile> => {
      const results: ConjugationTile[] = [];
      Object.keys(counter.annotations).forEach((amountStr) => {
        const amount = parseInt(amountStr, 10);
        if (amount <= AMOUNTS_TO_DISPLAY) {
          return;
        }

        if (
          !counter.annotations[amount]?.some(
            (annotation) => annotation.kind === "irregular",
          )
        ) {
          return;
        }

        results.push({
          amount,
          conjugations: conjugateCounter(amount, counter),
        });
      });

      return sortBy(results, ({ amount }: ConjugationTile): number => amount);
    },
  );

  public render(): React.ReactNode {
    const { counter } = this.props;
    const { currentUserInput } = this.state;

    const furtherIrregulars = this.memoizeIrregularsBeyondExampleTable(counter);

    return (
      <section className={styles.conjugationsSection}>
        <p className={styles.examplesPrefix}>
          <FormattedMessage
            {...INTL_MESSAGES.hereAreTheFirstXNumbers}
            values={{ amount: AMOUNTS_TO_DISPLAY }}
          />{" "}
          {this.renderIrregularsWarning(counter)}
        </p>
        <div className={styles.examplesTable}>
          {this.memoizeExamplesTable(counter).map(this.renderConjugationTile)}
          <FormattedMessage {...INTL_MESSAGES.andSoForth} tagName="div" />
        </div>
        {!!furtherIrregulars.length && (
          <React.Fragment>
            <p className={styles.furtherIrregulars}>
              <FormattedMessage {...INTL_MESSAGES.furtherIrregulars} />
            </p>
            <div className={styles.examplesTable}>
              {furtherIrregulars.map(this.renderConjugationTile)}
            </div>
          </React.Fragment>
        )}
        <p className={styles.customInputPrefix}>
          <FormattedMessage {...INTL_MESSAGES.customCounterAmountInputPrefix} />
        </p>
        <div className={styles.conjugatedUserInput}>
          {conjugateCounter(currentUserInput, counter).map(
            this.renderCurrentUserInputItem,
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

  private renderIrregularsWarning(counter: Counter): React.ReactElement {
    const numIrregulars = this.memoizeNumIrregulars(counter);
    if (!numIrregulars) {
      return <FormattedMessage {...INTL_MESSAGES.introNoIrregulars} />;
    }

    return (
      <FormattedMessage
        {...INTL_MESSAGES.introWithIrregulars}
        values={{
          highlightedElement: (
            <FormattedMessage
              {...INTL_MESSAGES.numIrregulars}
              values={{
                numIrregulars,
              }}
            >
              {(text) => <span className={styles.irregular}>{text}</span>}
            </FormattedMessage>
          ),
        }}
      />
    );
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
    index: number,
  ): React.ReactNode => (
    <div
      key={index}
      className={classnames(
        conjugation.irregularType
          ? styles.irregular
          : conjugation.countingSystem !== CountingSystem.Kango
            ? styles.nonKango
            : "",
        FREQUENCY_DISPLAYS[conjugation.frequency].className,
      )}
    >
      {FREQUENCY_DISPLAYS[conjugation.frequency].prefix} {conjugation.reading}
    </div>
  );

  private renderConjugation = ({
    countingSystem,
    irregularType,
    frequency,
    reading,
  }: Conjugation): React.ReactNode => {
    return (
      <div
        key={reading}
        className={classnames(
          irregularType
            ? styles.irregular
            : countingSystem !== CountingSystem.Kango
              ? styles.nonKango
              : "",
          FREQUENCY_DISPLAYS[frequency].className,
        )}
      >
        {FREQUENCY_DISPLAYS[frequency].prefix} {reading}
      </div>
    );
  };

  private onUserInputChanged = (
    event: React.ChangeEvent<HTMLInputElement>,
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
