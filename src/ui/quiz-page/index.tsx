import * as React from "react";
import { connect } from "react-redux";

import Localization from "../../localization";

import QuizManager from "../../QuizManager";
import { Question, QuizState, State } from "../../redux";

import AnswerInput from "./AnswerInput";
import QuestionDisplay from "./QuestionDisplay";
import QuizWrapup from "./QuizWrapup";
import ResultsView from "./ResultsView";

import "./index.scss";

const KEY_ENTER = 13;

interface ProvidedProps {
  localization: Localization;
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

class QuizPage extends React.PureComponent<ComponentProps> {
  public componentDidMount() {
    window.addEventListener("keydown", this.onKeyDown);
  }

  public componentWillUnmount() {
    window.removeEventListener("keydown", this.onKeyDown);
  }

  public render() {
    const {
      currentQuestion,
      localization,
      quizManager,
      quizState
    } = this.props;
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
        />
        {quizState === "reviewing-answer" && (
          <React.Fragment>
            <ResultsView
              currentQuestion={currentQuestion}
              localization={localization}
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
}

export default connect(mapStateToProps)(QuizPage);
