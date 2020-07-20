import * as React from "react";
import { connect } from "react-redux";

import { Question } from "@jyosuushi/interfaces";
import Localization from "@jyosuushi/localization";
import { State, UserAnswer } from "@jyosuushi/redux";

import HistoryRow from "./HistoryRow";

import styles from "./index.scss";

interface ProvidedProps {
  localization: Localization;
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

class QuizHistory extends React.PureComponent<ComponentProps> {
  public render(): React.ReactNode {
    const { askedQuestions, currentQuestion } = this.props;

    const rows: JSX.Element[] = [];
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

  private renderQuestionRow(index: number, question: Question): JSX.Element {
    const { localization, rowClassName, userAnswers } = this.props;
    return (
      <HistoryRow
        key={index}
        className={rowClassName}
        localization={localization}
        question={question}
        questionNo={index + 1}
        usersAnswer={userAnswers[index]}
      />
    );
  }
}

export default connect(mapStateToProps)(QuizHistory);
