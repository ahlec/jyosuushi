import * as React from "react";
import { connect } from "react-redux";

import { Question } from "@jyosuushi/interfaces";
import Localization from "@jyosuushi/localization";
import withQuizManager, {
  InjectedProps
} from "@jyosuushi/quiz/withQuizManager";
import { QuizState, State } from "@jyosuushi/redux";
import { getLocalization } from "@jyosuushi/redux/selectors";

import FeedbackFooter from "@jyosuushi/ui/FeedbackFooter";
import AnswerInput from "./AnswerInput";
import QuestionDisplay from "./QuestionDisplay";
import QuizWrapup from "./QuizWrapup";
import ResultsView from "./ResultsView";

import "./index.scss";

const KEY_ENTER = 13;

interface ProvidedProps {
  enabled: boolean;
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

type ComponentProps = ProvidedProps & ReduxProps & InjectedProps;

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
    if (quizState.state === "not-in-quiz") {
      return null;
    }

    if (quizState.state === "quiz-wrapup") {
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
          enabled={enabled && quizState.state === "waiting-for-answer"}
          localization={localization}
        />
        {quizState.state === "reviewing-answer" && (
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
    if (quizState.state !== "reviewing-answer") {
      return;
    }

    if (event.keyCode === KEY_ENTER) {
      this.advance();
    }
  };
}

export default connect(mapStateToProps)(withQuizManager(QuizPage));
