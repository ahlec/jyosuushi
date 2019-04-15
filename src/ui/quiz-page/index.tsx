import * as React from "react";
import { connect } from "react-redux";

import QuizManager from "../../QuizManager";
import { Answer, Question, QuizState, State } from "../../redux";

import AnswerInput from "./AnswerInput";
import QuestionDisplay from "./QuestionDisplay";
import QuizWrapup from "./QuizWrapup";
import ResultsView from "./ResultsView";

import "./index.scss";

const KEY_ENTER = 13;

interface ProvidedProps {
  quizManager: QuizManager;
}

interface ReduxProps {
  currentQuestion: Question;
  quizState: QuizState;
}

function mapStateToProps(state: State): ReduxProps {
  return {
    currentQuestion: state.questions.questions[state.questions.currentQuestion],
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
    const { currentQuestion, quizManager, quizState } = this.props;
    const { lastQuestionCorrectAnswer } = this.state;
    if (quizState === "not-in-quiz") {
      return null;
    }

    if (quizState === "quiz-wrapup") {
      return <QuizWrapup quizManager={quizManager} />;
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

  private advance() {
    const { quizManager } = this.props;
    if (quizManager.hasNextQuestion) {
      quizManager.nextQuestion();
    } else {
      quizManager.endQuiz();
    }
  }

  private onClickNextQuestion = (event: React.MouseEvent) => {
    this.advance();
    event.stopPropagation();
  };

  private onKeyDown = (event: KeyboardEvent) => {
    const { quizState } = this.props;
    if (quizState !== "reviewing-answer") {
      return;
    }

    if (event.keyCode === KEY_ENTER) {
      this.advance();
    }
  };

  private onAnswerSubmitted = (usersCorrectAnswer: Answer | null) =>
    this.setState({ lastQuestionCorrectAnswer: usersCorrectAnswer });
}

export default connect(mapStateToProps)(QuizPage);
