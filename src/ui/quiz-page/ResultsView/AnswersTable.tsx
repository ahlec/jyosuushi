import classnames from "classnames";
import { groupBy, uniq } from "lodash";
import * as React from "react";
import { connect } from "react-redux";

import { STUDY_PACK_LOOKUP } from "../../../data/study-packs";
import Localization from "../../../localization";
import {
  Answer,
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
    const { counters, usersAnswer } = this.props;
    const {
      counter: { kana, kanji, name },
      studyPacks
    } = counters[counterId];
    const kanjiAnswers = uniq(answers.map(getKanjiFromAnswer).filter(x => x));
    const correctAnswer =
      usersAnswer.judgment === "correct"
        ? answers.find(answer => answer.kana === usersAnswer.input)
        : undefined;
    return (
      <tr key={counterId} className={classnames(correctAnswer && "correct")}>
        <td className="cell-counter">
          {kanji ? (
            <ruby>
              {kanji}
              <rt>{kana}</rt>
            </ruby>
          ) : (
            <ruby>{kana}</ruby>
          )}
        </td>
        <td className="cell-rule">{name}</td>
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
    const { name } = STUDY_PACK_LOOKUP[packId];
    return (
      <div key={packId} className="study-pack">
        {name}
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

  private renderKana = ({ kana, isIrregular }: Answer) => {
    const { localization, usersAnswer } = this.props;
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
        {isIrregular && (
          <span className="irregular">
            {localization.resultsTableIrregularLabel}
          </span>
        )}
      </div>
    );
  };
}

export default connect(mapStateToProps)(AnswersTable);
