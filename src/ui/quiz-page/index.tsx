import * as React from "react";
import { connect } from "react-redux";

import QuizManager from "../../QuizManager";
import { Answer, Question, QuizState, State } from "../../redux";

import AnswerInput from "./AnswerInput";
import QuestionDisplay from "./QuestionDisplay";
import ResultsView from "./ResultsView";

import "./index.scss";

const KEY_ENTER = 13;

interface ProvidedProps {
  currentQuestion: Question;
  quizManager: QuizManager;
}

interface ReduxProps {
  quizState: QuizState;
}

function mapStateToProps(state: State): ReduxProps {
  return {
    quizState: state.quizState
  };
}

type ComponentProps = ProvidedProps & ReduxProps;

interface ComponentState {
  lastQuestionCorrectAnswer: Answer | null;
}

class QuizPage extends React.PureComponent<ComponentProps, ComponentState> {
  public state: ComponentState = {
    lastQuestionCorrectAnswer: null
  };

  public componentDidMount() {
    window.addEventListener("keydown", this.onKeyDown);
  }

  public componentWillUnmount() {
    window.removeEventListener("keydown", this.onKeyDown);
  }

  public render() {
    const { currentQuestion, quizState } = this.props;
    const { lastQuestionCorrectAnswer } = this.state;
    if (quizState === "not-in-quiz") {
      return null;
    }

    return (
      <div className="QuestionPage">
        <QuestionDisplay currentQuestion={currentQuestion} />
        <AnswerInput
          currentQuestion={currentQuestion}
          enabled={quizState === "waiting-for-answer"}
          onAnswerSubmitted={this.onAnswerSubmitted}
        />
        {quizState === "reviewing-answer" && (
          <React.Fragment>
            <ResultsView
              currentQuestion={currentQuestion}
              usersCorrectAnswer={lastQuestionCorrectAnswer}
            />
            <button
              className="next-question"
              onClick={this.onClickNextQuestion}
            >
              Next Question!
            </button>
          </React.Fragment>
        )}
      </div>
    );
  }

  private onClickNextQuestion = (event: React.MouseEvent) => {
    const { quizManager } = this.props;
    quizManager.nextQuestion();
    event.stopPropagation();
  };

  private onKeyDown = (event: KeyboardEvent) => {
    const { quizManager, quizState } = this.props;
    if (quizState !== "reviewing-answer") {
      return;
    }

    if (event.keyCode === KEY_ENTER) {
      quizManager.nextQuestion();
    }
  };

  private onAnswerSubmitted = (usersCorrectAnswer: Answer | null) =>
    this.setState({ lastQuestionCorrectAnswer: usersCorrectAnswer });
}

export default connect(mapStateToProps)(QuizPage);
