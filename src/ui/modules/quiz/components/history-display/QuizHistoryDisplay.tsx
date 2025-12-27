import * as React from "react";
import { connect } from "react-redux";

import { Question } from "@jyosuushi/interfaces";
import { State, UserAnswer } from "@jyosuushi/redux";

import HistoryRow from "./HistoryRow";

import * as styles from "./QuizHistoryDisplay.scss";

interface ProvidedProps {
  rowClassName: string;
}

interface ReduxProps {
  askedQuestions: ReadonlyArray<Question>;
  currentQuestion: Question | null;
  userAnswers: ReadonlyArray<UserAnswer>;
}

function mapStateToProps(state: State): ReduxProps {
  const includeCurrentQuestion =
    state.quizState.state === "reviewing-answer" ||
    state.quizState.state === "quiz-wrapup";
  return {
    askedQuestions: state.questions.asked,
    currentQuestion: includeCurrentQuestion
      ? state.questions.currentQuestion
      : null,
    userAnswers: state.userAnswers,
  };
}

type ComponentProps = ProvidedProps & ReduxProps;

class QuizHistoryDisplay extends React.PureComponent<ComponentProps> {
  public render(): React.ReactNode {
    const { askedQuestions, currentQuestion } = this.props;

    const rows: React.ReactElement[] = [];
    for (let index = 0; index < askedQuestions.length; ++index) {
      rows.push(this.renderQuestionRow(index, askedQuestions[index]));
    }

    if (currentQuestion) {
      rows.push(this.renderQuestionRow(askedQuestions.length, currentQuestion));
    }

    return (
      <table className={styles.quizHistory}>
        <tbody>{rows}</tbody>
      </table>
    );
  }

  private renderQuestionRow(
    index: number,
    question: Question,
  ): React.ReactElement {
    const { rowClassName, userAnswers } = this.props;
    return (
      <HistoryRow
        key={index}
        className={rowClassName}
        question={question}
        questionNo={index + 1}
        usersAnswer={userAnswers[index]}
      />
    );
  }
}

export default connect(mapStateToProps)(QuizHistoryDisplay);
