import * as React from "react";
import { connect } from "react-redux";

import { Question } from "../../interfaces";
import Localization from "../../localization";
import QuizManager from "../../QuizManager";
import { QuizState, State } from "../../redux";
import { getLocalization } from "../../redux/selectors";

import FeedbackFooter from "../FeedbackFooter";
import AnswerInput from "./AnswerInput";
import QuestionDisplay from "./QuestionDisplay";
import QuizWrapup from "./QuizWrapup";
import ResultsView from "./ResultsView";

import "./index.scss";

const KEY_ENTER = 13;

interface ProvidedProps {
  enabled: boolean;
  quizManager: QuizManager;
}

interface ReduxProps {
  currentQuestion: Question;
  localization: Localization;
  quizState: QuizState;
}

function mapStateToProps(state: State): ReduxProps {
  return {
    currentQuestion: state.questions.currentQuestion!,
    localization: getLocalization(state),
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
      enabled,
      localization,
      quizManager,
      quizState
    } = this.props;
    if (quizState === "not-in-quiz") {
      return null;
    }

    if (quizState === "quiz-wrapup") {
      return (
        <QuizWrapup localization={localization} quizManager={quizManager} />
      );
    }

    return (
      <div className="QuestionPage">
        <QuestionDisplay
          currentQuestion={currentQuestion}
          localization={localization}
        />
        <AnswerInput
          currentQuestion={currentQuestion}
          enabled={enabled && quizState === "waiting-for-answer"}
          localization={localization}
        />
        {quizState === "reviewing-answer" && (
          <ResultsView
            currentQuestion={currentQuestion}
            localization={localization}
            onClickNextQuestion={this.onClickNextQuestion}
          />
        )}
        <div className="flex" />
        <FeedbackFooter localization={localization} />
      </div>
    );
  }

  private advance() {
    const { enabled, quizManager } = this.props;
    if (!enabled) {
      return;
    }

    if (quizManager.hasNextQuestion) {
      quizManager.nextQuestion();
    } else {
      quizManager.endQuiz();
    }
  }

  private onClickNextQuestion = () => {
    this.advance();
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
