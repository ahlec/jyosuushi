import { groupBy, uniq } from "lodash";
import * as React from "react";
import { connect } from "react-redux";

import { STUDY_PACK_LOOKUP } from "../../../data/study-packs";
import Localization from "../../../localization";
import { Answer, CountersState, Question, State } from "../../../redux";

import "./AnswersTable.scss";

interface ProvidedProps {
  currentQuestion: Question;
  localization: Localization;
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

function getKanaFromAnswer(answer: Answer): string {
  return answer.kana;
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
            this.renderCounterAnswerRow(
              counterId,
              answersByCounterId[counterId]
            )
          )}
        </tbody>
      </table>
    );
  }

  private renderCounterAnswerRow(
    counterId: string,
    answers: ReadonlyArray<Answer>
  ) {
    const { counters } = this.props;
    const {
      counter: { kana, kanji, name },
      studyPacks
    } = counters[counterId];
    const kanjiAnswers = uniq(answers.map(getKanjiFromAnswer).filter(x => x));
    const kanaAnswers = uniq(answers.map(getKanaFromAnswer));
    return (
      <tr key={counterId}>
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
        <td className="cell-hiragana">{kanaAnswers.map(this.renderKana)}</td>
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

  private renderKana = (kana: string) => {
    return (
      <div key={kana} className="kana">
        {kana}
      </div>
    );
  };
}

export default connect(mapStateToProps)(AnswersTable);
