import classnames from "classnames";
import { groupBy, uniq } from "lodash";
import * as React from "react";
import { connect } from "react-redux";

import { STUDY_PACK_LOOKUP } from "../../data/study-packs";
import { Answer, CountersState, Question, State } from "../../redux";

import "./ResultsView.scss";

interface ProvidedProps {
  currentQuestion: Question;
  usersCorrectAnswer: Answer | null;
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

class ResultsView extends React.PureComponent<ComponentProps> {
  public render() {
    const { currentQuestion, usersCorrectAnswer } = this.props;
    const isCorrectAnswer = !!usersCorrectAnswer;
    const answersByCounterId = groupBy(
      currentQuestion.validAnswers,
      (answer: Answer) => answer.counterId
    );
    return (
      <div className="ResultsView">
        <div
          className={classnames(
            "result-bubble",
            isCorrectAnswer ? "correct" : "incorrect"
          )}
        >
          {isCorrectAnswer ? (
            <ruby>
              正解
              <rt>せいかい</rt>
            </ruby>
          ) : (
            <ruby>
              不正解
              <rt>ふせいかい</rt>
            </ruby>
          )}
        </div>
        <div className="info">
          <h3 className={isCorrectAnswer ? "correct" : "incorrect"}>
            {isCorrectAnswer ? "Correct!" : "Not quite right..."}
          </h3>
          <p>
            Here are all of the possible answers based on the sets you have
            enabled:
          </p>
          <table>
            <tbody>
              <tr>
                <th>Counter</th>
                <th>Study Pack</th>
                <th>Rule</th>
                <th>Kanji Reading</th>
                <th>Hiragana Reading</th>
              </tr>
              {Object.keys(answersByCounterId).map(counterId =>
                this.renderCounterAnswerRow(
                  counterId,
                  answersByCounterId[counterId]
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
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
    const kanjiAnswers = uniq(answers.map(getKanjiFromAnswer).filter(x => !!x));
    const kanaAnswers = uniq(answers.map(getKanaFromAnswer));
    return (
      <tr key={counterId}>
        <td>
          {kanji ? (
            <ruby>
              {kanji}
              <rt>{kana}</rt>
            </ruby>
          ) : (
            <ruby>{kana}</ruby>
          )}
        </td>
        <td>{studyPacks.map(this.renderStudyPack)}</td>
        <td>{name}</td>
        <td>
          {kanjiAnswers.length ? kanjiAnswers.map(this.renderKanji) : "(none)"}
        </td>
        <td>{kanaAnswers.map(this.renderKana)}</td>
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

export default connect(mapStateToProps)(ResultsView);
