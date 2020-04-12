import classnames from "classnames";
import { groupBy, uniq } from "lodash";
import memoizeOne from "memoize-one";
import * as React from "react";
import { connect } from "react-redux";

import { STUDY_PACK_LOOKUP } from "@data/studyPacks";
import { Answer, Question, Counter, StudyPack } from "@jyosuushi/interfaces";
import Localization from "@jyosuushi/localization";
import { CountersState, State, UserAnswer } from "@jyosuushi/redux";

import CounterDisplay from "@jyosuushi/ui/components/CounterDisplay";

import "./AnswersTable.scss";

interface ProvidedProps {
  currentQuestion: Question;
  localization: Localization;
  usersAnswer: UserAnswer;
}

interface ReduxProps {
  counters: CountersState;
}

function mapStateToProps(state: State): ReduxProps {
  return {
    counters: state.counters
  };
}

type ComponentProps = ProvidedProps & ReduxProps;

interface AnswerTableRow {
  counter: Counter;
  studyPacks: ReadonlyArray<StudyPack>;

  kanaAnswers: ReadonlyArray<Answer>;

  /**
   * An array of all of the valid kanji answers usable for this
   * counter row.
   */
  validKanji: ReadonlyArray<string>;

  /**
   * A boolean that is true iff the user's answer was correct
   * AND this row includes the answer that the user typed in.
   */
  wasUsersCorrectAnswer: boolean;
}

class AnswersTable extends React.PureComponent<ComponentProps> {
  private readonly getRows = memoizeOne(
    (
      usersAnswer: UserAnswer,
      validAnswers: ReadonlyArray<Answer>,
      counters: CountersState
    ): ReadonlyArray<AnswerTableRow> => {
      const answersByCounterId = groupBy(
        validAnswers,
        answer => answer.counterId
      );

      return Object.keys(answersByCounterId).map(
        (counterId): AnswerTableRow => {
          const { counter, studyPacks } = counters[counterId];
          const answers = answersByCounterId[counterId];
          return {
            counter,
            kanaAnswers: answers,
            studyPacks: studyPacks.map(packId => STUDY_PACK_LOOKUP[packId]),
            validKanji: uniq(
              answers
                .map(({ kanji }) => kanji)
                .filter((kanji): kanji is string => typeof kanji == "string")
            ),
            wasUsersCorrectAnswer:
              usersAnswer.judgment === "correct" &&
              !!answers.find(answer => answer.kana === usersAnswer.input)
          };
        }
      );
    }
  );

  public render(): React.ReactNode {
    const { counters, currentQuestion, localization, usersAnswer } = this.props;
    const rows = this.getRows(
      usersAnswer,
      currentQuestion.validAnswers,
      counters
    );
    return (
      <table className="AnswersTable">
        <tbody>
          <tr>
            <th>{localization.resultColumnHeaderCounter}</th>
            <th>{localization.resultColumnHeaderRule}</th>
            <th>{localization.resultColumnHeaderStudyPack}</th>
            <th>{localization.resultColumnHeaderKanji}</th>
            <th>{localization.resultColumnHeaderHiragana}</th>
          </tr>
          {rows.map(this.renderRow)}
        </tbody>
      </table>
    );
  }

  private renderRow = (row: AnswerTableRow): React.ReactNode => {
    const { localization } = this.props;
    return (
      <tr
        key={row.counter.counterId}
        className={classnames(row.wasUsersCorrectAnswer && "correct")}
      >
        <td className="cell-counter">
          <CounterDisplay counter={row.counter} />
        </td>
        <td className="cell-rule">{localization.counterName(row.counter)}</td>
        <td className="cell-study-pack">
          {row.studyPacks.map(this.renderStudyPack)}
        </td>
        <td className="cell-kanji">
          {row.validKanji.length
            ? row.validKanji.map(this.renderKanji)
            : "(none)"}
        </td>
        <td className="cell-hiragana">
          {row.kanaAnswers.map(this.renderKana)}
        </td>
      </tr>
    );
  };

  private renderStudyPack = (pack: StudyPack): React.ReactNode => {
    const { localization } = this.props;
    return (
      <div key={pack.packId} className="study-pack">
        {localization.studyPackName(pack)}
      </div>
    );
  };

  private renderKanji = (kanji: string): React.ReactNode => {
    return (
      <div key={kanji} className="kanji">
        {kanji}
      </div>
    );
  };

  private renderKana = ({ kana }: Answer): React.ReactNode => {
    const { usersAnswer } = this.props;
    return (
      <div
        key={kana}
        className={classnames(
          "kana",
          usersAnswer.judgment === "correct" &&
            usersAnswer.input === kana &&
            "correct"
        )}
      >
        {kana}
        {/* {this.renderConjugationCategory(category)} */}
      </div>
    );
  };

  // private renderConjugationCategory(
  //   category: ConjugationCategory
  // ): React.ReactNode {
  //   const { localization } = this.props;
  //   switch (category) {
  //     case ConjugationCategory.Regular:
  //       return null;
  //     case ConjugationCategory.Strange:
  //       return (
  //         <span className="strange">
  //           {localization.resultTableStrangeLabel}
  //         </span>
  //       );
  //     case ConjugationCategory.Irregular:
  //       return (
  //         <span className="irregular">
  //           {localization.resultTableIrregularLabel}
  //         </span>
  //       );
  //   }
  // }
}

export default connect(mapStateToProps)(AnswersTable);
