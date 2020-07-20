import classnames from "classnames";
import { flatten, groupBy, uniq } from "lodash";
import memoizeOne from "memoize-one";
import * as React from "react";
import { connect } from "react-redux";

import { STUDY_PACK_LOOKUP } from "@data/studyPacks";
import {
  Answer,
  Question,
  Counter,
  StudyPack,
  CountingSystem,
} from "@jyosuushi/interfaces";
import Localization from "@jyosuushi/localization";
import { CountersState, State, UserAnswer } from "@jyosuushi/redux";

import CounterDisplay from "@jyosuushi/ui/components/CounterDisplay";

import styles from "./AnswersTable.scss";

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
    counters: state.counters,
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
        (answer) => answer.counterId
      );

      return Object.keys(answersByCounterId).map(
        (counterId): AnswerTableRow => {
          const { counter, studyPacks } = counters[counterId];
          const answers = answersByCounterId[counterId];
          return {
            counter,
            kanaAnswers: answers,
            studyPacks: studyPacks.map((packId) => STUDY_PACK_LOOKUP[packId]),
            validKanji: uniq(
              flatten(
                answers.map(
                  ({ kanji }): ReadonlyArray<string> =>
                    kanji === null ? [] : kanji
                )
              )
            ),
            wasUsersCorrectAnswer:
              usersAnswer.judgment === "correct" &&
              !!answers.find((answer) => answer.kana === usersAnswer.input),
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
      <table className={styles.answersTable}>
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
        className={classnames(row.wasUsersCorrectAnswer && styles.correct)}
      >
        <td className={styles.cellCounter}>
          <CounterDisplay counter={row.counter} />
        </td>
        <td className={styles.cellRule}>
          {localization.counterName(row.counter)}
        </td>
        <td className={styles.cellStudyPack}>
          {row.studyPacks.map(this.renderStudyPack)}
        </td>
        <td className={styles.cellKanji}>
          {row.validKanji.length
            ? row.validKanji.map(this.renderKanji)
            : "(none)"}
        </td>
        <td className={styles.cellHiragana}>
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

  private renderKana = ({
    countingSystem,
    irregularType,
    kana,
  }: Answer): React.ReactNode => {
    const { localization, usersAnswer } = this.props;
    return (
      <div
        key={kana}
        className={classnames(
          styles.kana,
          usersAnswer.judgment === "correct" &&
            usersAnswer.input === kana &&
            styles.correct
        )}
      >
        {kana}
        {irregularType ? (
          <span className={styles.irregular}>
            {localization.resultTableIrregularLabel}
          </span>
        ) : countingSystem !== CountingSystem.Kango ? (
          <span className={styles.nonKango}>
            {localization.resultTableNonKangoLabel}
          </span>
        ) : null}
      </div>
    );
  };
}

export default connect(mapStateToProps)(AnswersTable);
