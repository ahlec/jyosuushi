import classnames from "classnames";
import { uniq } from "lodash";
import * as React from "react";
import { connect } from "react-redux";

import Localization from "../../../localization";

import {
  Answer,
  CountersState,
  Question,
  State,
  UserAnswer,
  UserAnswerJudgment
} from "../../../redux";
import { ignoreLastAnswer } from "../../../redux/actions";
import { Dispatch } from "../../../redux/store";

import AnswersTable from "./AnswersTable";
import "./index.scss";

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

const RESULT_BUBBLE_CONTENTS: {
  [judgment in UserAnswerJudgment]: { kanji: string; kana: string }
} = {
  correct: {
    kana: "せいかい",
    kanji: "正解"
  },
  ignored: {
    kana: "むし",
    kanji: "無視"
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
              <p>{localization.resultTableIntro}</p>
              <AnswersTable
                currentQuestion={currentQuestion}
                localization={localization}
              />
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

  private onIgnoreClicked = () => {
    const { currentQuestion, dispatch } = this.props;
    const counters = uniq(
      currentQuestion.validAnswers.map(({ counterId }: Answer) => counterId)
    );
    dispatch(ignoreLastAnswer(counters));
  };
}

export default connect(mapStateToProps)(ResultsView);
