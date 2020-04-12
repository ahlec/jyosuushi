import { clamp } from "lodash";
import * as React from "react";

import { Conjugation, Counter } from "@jyosuushi/interfaces";
import Localization from "@jyosuushi/localization";
import { conjugateCounter } from "@jyosuushi/japanese/counters";

import "./ConjugationsSection.scss";

const AMOUNTS_TO_DISPLAY = 17;
const MIN_USER_INPUT = 1;
const MAX_USER_INPUT = 999_999_999;

// interface Irregular {
//   conjugation: string;
//   amount: number;
// }

// const getConjugations = memoize(
//   (counter: Counter): ReadonlyArray<ReadonlyArray<ConjugatedInfo>> => {
//     const results: Array<ReadonlyArray<ConjugatedInfo>> = [];
//     for (let amount = 1; amount <= AMOUNTS_TO_DISPLAY; ++amount) {
//       results[amount - 1] = conjugateCounter(amount, counter);
//     }

//     return results;
//   },
//   (counter: Counter) => counter.counterId
// );

// const countIrregulars = memoize(
//   (conjugations: ReadonlyArray<ReadonlyArray<ConjugatedInfo>>) =>
//     conjugations.reduce(
//       (total: number, nested: ReadonlyArray<ConjugatedInfo>) => {
//         return (
//           total +
//           nested.filter(
//             ({ category }) => category === ConjugationCategory.Irregular
//           ).length
//         );
//       },
//       0
//     )
// );

// function compareIrregulars(a: Irregular, b: Irregular): number {
//   return a.amount - b.amount;
// }

// const getFurtherIrregulars = memoize(
//   (counter: Counter): ReadonlyArray<Irregular> => {
//     const results: Irregular[] = [];
//     Object.keys(counter.irregulars).forEach(amountStr => {
//       const amount = parseInt(amountStr, 10);
//       if (amount <= AMOUNTS_TO_DISPLAY) {
//         return;
//       }

//       // TODO: This won't group multiple irregulars of the same amount so
//       // they'll appear on different lines.
//       const conjugations = conjugateCounter(amount, counter);
//       for (const conjugation of conjugations) {
//         results.push({
//           amount,
//           conjugation: conjugation.kana
//         });
//       }
//     });

//     results.sort(compareIrregulars);
//     return results;
//   },
//   (counter: Counter) => counter.counterId
// );

// function highlightIrregular(contents: string): React.ReactNode {
//   return (
//     <span className="irregular" key={contents}>
//       {contents}
//     </span>
//   );
// }

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

  public render(): React.ReactNode {
    const { counter, localization } = this.props;
    const { currentUserInput } = this.state;

    // const conjugations = getConjugations(counter);
    // const furtherIrregulars = getFurtherIrregulars(counter);

    return (
      <section className="ConjugationsSection">
        {/* <p className="examples-prefix">
          {localization.hereAreTheFirstXNumbers(AMOUNTS_TO_DISPLAY)}{" "}
          {this.renderIrregularsWarning(counter)}
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
        )} */}
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

  // private renderIrregularsWarning(counter: Counter): React.ReactNode {
  //   const {
  //     props: { localization }
  //   } = this;
  //   const conjugations = getConjugations(counter);
  //   const furtherIrregulars = getFurtherIrregulars(counter);
  //   const numIrregulars =
  //     countIrregulars(conjugations) + furtherIrregulars.length;
  //   if (!numIrregulars) {
  //     return localization.irregularsWarningNoIrregulars;
  //   }

  //   return localization.irregularsWarning(numIrregulars, highlightIrregular);
  // }

  // private renderAmountTile = (
  //   conjugations: ReadonlyArray<Conjugation>,
  //   index: number
  // ): React.ReactNode => {
  //   const amount = index + 1;
  //   return (
  //     <div className="conjugation-container" key={index}>
  //       <div className="amount">{amount}</div>
  //       <div className="conjugations">
  //         {conjugations.map(this.renderConjugation)}
  //       </div>
  //     </div>
  //   );
  // };

  // private renderFurtherIrregular = ({
  //   amount,
  //   conjugation
  // }: Irregular): React.ReactNode => {
  //   return (
  //     <div className="conjugation-container" key={amount}>
  //       <div className="amount">{amount}</div>
  //       <div className="conjugations">
  //         <div className="irregular">{conjugation}</div>
  //       </div>
  //     </div>
  //   );
  // };

  private renderCurrentUserInputItem = (
    conjugation: Conjugation,
    index: number
  ): React.ReactNode => <div key={index}>{conjugation.reading}</div>;

  // private renderConjugation = ({
  //   category,
  //   kana
  // }: Conjugation): React.ReactNode => {
  //   return (
  //     <div
  //       key={kana}
  //       className={classnames(
  //         category === ConjugationCategory.Strange && "strange",
  //         category === ConjugationCategory.Irregular && "irregular"
  //       )}
  //     >
  //       {kana}
  //     </div>
  //   );
  // };

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
