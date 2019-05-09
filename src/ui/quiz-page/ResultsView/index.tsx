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

import JudgmentBubble from "../../JudgmentBubble";

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
        <JudgmentBubble judgment={usersAnswer.judgment} shape="block-circle" />
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
