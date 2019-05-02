import classnames from "classnames";
import { groupBy, uniq } from "lodash";
import * as React from "react";
import { connect } from "react-redux";

import Localization from "../../localization";

import { STUDY_PACK_LOOKUP } from "../../data/study-packs";
import {
  Answer,
  CountersState,
  Question,
  State,
  UserAnswer,
  UserAnswerJudgment
} from "../../redux";
import { ignoreLastAnswer } from "../../redux/actions";
import { Dispatch } from "../../redux/store";

import "./ResultsView.scss";

interface ProvidedProps {
  currentQuestion: Question;
  localization: Localization;
}

interface ReduxProps {
  counters: CountersState;
  usersAnswer: UserAnswer;
}

function mapStateToProps(state: State): ReduxProps {
  return {
    counters: state.counters,
    usersAnswer: state.userAnswers[state.questions.currentQuestion]
  };
}

type ComponentProps = ProvidedProps & ReduxProps & { dispatch: Dispatch };

function getKanjiFromAnswer(answer: Answer): string | null {
  return answer.kanji;
}

function getKanaFromAnswer(answer: Answer): string {
  return answer.kana;
}

const RESULT_BUBBLE_CONTENTS: {
  [judgment in UserAnswerJudgment]: { kanji: string; kana: string }
} = {
  correct: {
    kana: "せいかい",
    kanji: "正解"
  },
  ignored: {
    kana: "",
    kanji: ""
  },
  incorrect: {
    kana: "ふせいかい",
    kanji: "不正解"
  },
  skipped: {
    kana: "みかいとう",
    kanji: "未回答"
  }
};

const HEADERS: {
  [judgment in UserAnswerJudgment]: (localization: Localization) => string
} = {
  correct: localization => localization.resultCorrectHeader,
  ignored: localization => localization.resultIncorrectHeader,
  incorrect: localization => localization.resultIncorrectHeader,
  skipped: localization => localization.resultSkippedHeader
};

class ResultsView extends React.PureComponent<ComponentProps> {
  public render() {
    const { currentQuestion, localization, usersAnswer } = this.props;
    const answersByCounterId = groupBy(
      currentQuestion.validAnswers,
      (answer: Answer) => answer.counterId
    );
    return (
      <div className="ResultsView">
        <div className={classnames("result-bubble", usersAnswer.judgment)}>
          <ruby>
            {RESULT_BUBBLE_CONTENTS[usersAnswer.judgment].kanji}
            <rt>{RESULT_BUBBLE_CONTENTS[usersAnswer.judgment].kana}</rt>
          </ruby>
        </div>
        <div className="info">
          <h3>{HEADERS[usersAnswer.judgment](localization)}</h3>
          {usersAnswer.judgment !== "skipped" ? (
            <React.Fragment>
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
            </React.Fragment>
          ) : (
            <p>{localization.skippedQuestionResult}</p>
          )}
          {usersAnswer.judgment === "incorrect" && (
            <button onClick={this.onIgnoreClicked}>ignore answer</button>
          )}
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
    const kanjiAnswers = uniq(answers.map(getKanjiFromAnswer).filter(x => x));
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

  private onIgnoreClicked = () => {
    const { currentQuestion, dispatch } = this.props;
    const counters = uniq(
      currentQuestion.validAnswers.map(({ counterId }: Answer) => counterId)
    );
    dispatch(ignoreLastAnswer(counters));
  };
}

export default connect(mapStateToProps)(ResultsView);
