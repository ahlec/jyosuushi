import { uniq } from "lodash";
import * as React from "react";
import * as ReactGA from "react-ga";
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

import JudgmentBubble from "../../JudgmentBubble";

import AnswersTable from "./AnswersTable";
import "./index.scss";

interface ProvidedProps {
  currentQuestion: Question;
  localization: Localization;
  onClickNextQuestion: () => void;
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
        <div className="results">
          <JudgmentBubble
            judgment={usersAnswer.judgment}
            shape="block-circle"
          />
          <div className="info">
            <h3>{HEADERS[usersAnswer.judgment](localization)}</h3>
            {usersAnswer.judgment !== "skipped" ? (
              <React.Fragment>
                <p>{localization.resultTableIntro}</p>
                <AnswersTable
                  currentQuestion={currentQuestion}
                  localization={localization}
                  usersAnswer={usersAnswer}
                />
              </React.Fragment>
            ) : (
              <p>{localization.skippedQuestionResult}</p>
            )}
          </div>
        </div>
        <div className="buttons">
          {usersAnswer.judgment === "incorrect" && (
            <button className="ignore-answer" onClick={this.onIgnoreClicked}>
              {localization.buttonIgnoreAnswer}
            </button>
          )}
          <button className="next-question" onClick={this.onClickNextQuestion}>
            {localization.buttonNextQuestion}
          </button>
        </div>
      </div>
    );
  }

  private onIgnoreClicked = () => {
    const { currentQuestion, dispatch } = this.props;
    const counters = uniq(
      currentQuestion.validAnswers.map(({ counterId }: Answer) => counterId)
    );

    ReactGA.event({
      action: "Answer Ignored",
      category: "Quiz",
      label: `${currentQuestion.amount} of '${currentQuestion.itemId}'`
    });

    dispatch(ignoreLastAnswer(counters));
  };

  private onClickNextQuestion = (event: React.MouseEvent) => {
    const { onClickNextQuestion } = this.props;
    onClickNextQuestion();
    event.stopPropagation();
  };
}

export default connect(mapStateToProps)(ResultsView);
