import classnames from "classnames";
import { groupBy, uniq } from "lodash";
import * as React from "react";
import { connect } from "react-redux";

import { STUDY_PACK_LOOKUP } from "../../../../data/studyPacks";
import Localization from "../../../localization";
import {
  Answer,
  ConjugationCategory,
  CountersState,
  Question,
  State,
  UserAnswer
} from "../../../redux";

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

function getKanjiFromAnswer(answer: Answer): string | null {
  return answer.kanji;
}

class AnswersTable extends React.PureComponent<ComponentProps> {
  public render() {
    const { currentQuestion, localization } = this.props;
    const answersByCounterId = groupBy(
      currentQuestion.validAnswers,
      answer => answer.counterId
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
          {Object.keys(answersByCounterId).map(counterId =>
            this.renderCounter(counterId, answersByCounterId[counterId])
          )}
        </tbody>
      </table>
    );
  }

  private renderCounter(counterId: string, answers: ReadonlyArray<Answer>) {
    const { counters, localization, usersAnswer } = this.props;
    const { counter, studyPacks } = counters[counterId];
    const kanjiAnswers = uniq(answers.map(getKanjiFromAnswer).filter(x => x));
    const correctAnswer =
      usersAnswer.judgment === "correct"
        ? answers.find(answer => answer.kana === usersAnswer.input)
        : undefined;
    return (
      <tr key={counterId} className={classnames(correctAnswer && "correct")}>
        <td className="cell-counter">
          {counter.kanji ? (
            <ruby>
              {counter.kanji}
              <rt>{counter.kana}</rt>
            </ruby>
          ) : (
            <ruby>{counter.kana}</ruby>
          )}
        </td>
        <td className="cell-rule">{localization.counterName(counter)}</td>
        <td className="cell-study-pack">
          {studyPacks.map(this.renderStudyPack)}
        </td>
        <td className="cell-kanji">
          {kanjiAnswers.length ? kanjiAnswers.map(this.renderKanji) : "(none)"}
        </td>
        <td className="cell-hiragana">{answers.map(this.renderKana)}</td>
      </tr>
    );
  }

  private renderStudyPack = (packId: string) => {
    const { localization } = this.props;
    const pack = STUDY_PACK_LOOKUP[packId];
    return (
      <div key={packId} className="study-pack">
        {localization.studyPackName(pack)}
      </div>
    );
  };

  private renderKanji = (kanji: string) => {
    return (
      <div key={kanji} className="kanji">
        {kanji}
      </div>
    );
  };

  private renderKana = ({ category, kana }: Answer) => {
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
        {this.renderConjugationCategory(category)}
      </div>
    );
  };

  private renderConjugationCategory(
    category: ConjugationCategory
  ): React.ReactNode {
    const { localization } = this.props;
    switch (category) {
      case ConjugationCategory.Regular:
        return null;
      case ConjugationCategory.Strange:
        return (
          <span className="strange">
            {localization.resultTableStrangeLabel}
          </span>
        );
      case ConjugationCategory.Irregular:
        return (
          <span className="irregular">
            {localization.resultTableIrregularLabel}
          </span>
        );
    }
  }
}

export default connect(mapStateToProps)(AnswersTable);
