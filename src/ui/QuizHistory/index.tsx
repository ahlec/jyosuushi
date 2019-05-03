import * as React from "react";
import { connect } from "react-redux";

import { Question, State, UserAnswer } from "../../redux";

import HistoryRow from "./HistoryRow";

import "./index.scss";

export function hasSufficientData(state: State): boolean {
  if (state.quizState === "reviewing-answer") {
    return true;
  }

  return state.questions.currentQuestion > 0;
}

interface ComponentProps {
  currentQuestion: number;
  questions: ReadonlyArray<Question>;
  userAnswers: ReadonlyArray<UserAnswer>;
}

function mapStateToProps(state: State): ComponentProps {
  return {
    currentQuestion:
      state.questions.currentQuestion +
      (state.quizState === "reviewing-answer" ? 1 : 0),
    questions: state.questions.questions,
    userAnswers: state.userAnswers
  };
}

class QuizHistory extends React.PureComponent<ComponentProps> {
  public render() {
    const { currentQuestion } = this.props;

    const rows: JSX.Element[] = [];
    for (let index = 0; index < currentQuestion; ++index) {
      rows.push(this.renderQuestionRow(index));
    }

    return (
      <table className="rows">
        <tbody>{rows}</tbody>
      </table>
    );
  }

  private renderQuestionRow = (index: number) => {
    const { questions, userAnswers } = this.props;
    return (
      <HistoryRow
        key={index}
        question={questions[index]}
        questionNo={index + 1}
        usersAnswer={userAnswers[index]}
      />
    );
  };
}

export default connect(mapStateToProps)(QuizHistory);
