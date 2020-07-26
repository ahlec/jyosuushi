import * as React from "react";
import { connect } from "react-redux";

import { Question } from "@jyosuushi/interfaces";
import withQuizManager, {
  InjectedProps,
} from "@jyosuushi/quiz/withQuizManager";
import { QuizState, State } from "@jyosuushi/redux";

import FeedbackFooter from "@jyosuushi/ui/FeedbackFooter";
import AnswerInput from "./AnswerInput";
import QuestionDisplay from "./QuestionDisplay";
import QuizWrapup from "./QuizWrapup";
import ResultsView from "./ResultsView";

import styles from "./index.scss";

const KEY_ENTER = 13;

interface ProvidedProps {
  enabled: boolean;
}

interface ReduxProps {
  currentQuestion: Question | null;
  quizState: QuizState;
}

function mapStateToProps(state: State): ReduxProps {
  return {
    currentQuestion: state.questions.currentQuestion,
    quizState: state.quizState,
  };
}

type ComponentProps = ProvidedProps & ReduxProps & InjectedProps;

class QuizPage extends React.PureComponent<ComponentProps> {
  public componentDidMount(): void {
    window.addEventListener("keydown", this.onKeyDown);
  }

  public componentWillUnmount(): void {
    window.removeEventListener("keydown", this.onKeyDown);
  }

  public render(): React.ReactNode {
    const { currentQuestion, enabled, quizManager, quizState } = this.props;
    if (quizState.state === "not-in-quiz") {
      return null;
    }

    if (quizState.state === "quiz-wrapup") {
      return <QuizWrapup quizManager={quizManager} />;
    }

    if (!currentQuestion) {
      throw new Error("Cannot render quiz page without question");
    }

    return (
      <div className={styles.questionPage}>
        <QuestionDisplay currentQuestion={currentQuestion} />
        <AnswerInput
          buttonsClassName={styles.buttons}
          currentQuestion={currentQuestion}
          enabled={enabled && quizState.state === "waiting-for-answer"}
        />
        {quizState.state === "reviewing-answer" && (
          <ResultsView
            className={styles.resultsView}
            currentQuestion={currentQuestion}
            onClickNextQuestion={this.onClickNextQuestion}
          />
        )}
        <div className={styles.flex} />
        <FeedbackFooter />
      </div>
    );
  }

  private advance(): void {
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

  private onClickNextQuestion = (): void => {
    this.advance();
  };

  private onKeyDown = (event: KeyboardEvent): void => {
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
