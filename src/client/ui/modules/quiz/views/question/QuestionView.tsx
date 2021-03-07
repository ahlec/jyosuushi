import React from "react";

import { Question } from "@jyosuushi/interfaces";
import QuizManager from "@jyosuushi/ui/modules/quiz/state/QuizManager";
import { QuizState } from "@jyosuushi/redux";

import FeedbackFooter from "@jyosuushi/ui/feedback/FeedbackFooter";
import AnswerInput from "./AnswerInput";
import QuestionDisplay from "./QuestionDisplay";
import ResultsView from "./ResultsView";

import styles from "./QuestionView.scss";

const KEY_ENTER = 13;

interface ComponentProps {
  currentQuestion: Question;
  quizManager: QuizManager;
  quizState: QuizState;
  enabled: boolean;
}

class QuestionView extends React.PureComponent<ComponentProps> {
  public componentDidMount(): void {
    window.addEventListener("keydown", this.onKeyDown);
  }

  public componentWillUnmount(): void {
    window.removeEventListener("keydown", this.onKeyDown);
  }

  public render(): React.ReactNode {
    const { currentQuestion, enabled, quizState } = this.props;
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

export default QuestionView;
