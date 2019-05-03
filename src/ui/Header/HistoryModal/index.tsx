import * as React from "react";
import { connect } from "react-redux";

import { Question, State, UserAnswer } from "../../../redux";

import Modal from "../../Modal";

interface ProvidedProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

interface ReduxProps {
  currentQuestion: number;
  questions: ReadonlyArray<Question>;
  userAnswers: ReadonlyArray<UserAnswer>;
}

function mapStateToProps(state: State): ReduxProps {
  return {
    currentQuestion: state.questions.currentQuestion,
    questions: state.questions.questions,
    userAnswers: state.userAnswers
  };
}

type ComponentProps = ProvidedProps & ReduxProps;

class HistoryModal extends React.PureComponent<ComponentProps> {
  public render() {
    const { currentQuestion, isOpen, onRequestClose } = this.props;

    const rows: JSX.Element[] = [];
    if (isOpen) {
      for (let index = 0; index < currentQuestion; ++index) {
        rows.push(this.renderQuestionRow(index));
      }
    }

    return (
      <Modal isOpen={isOpen} header="History" onRequestClose={onRequestClose}>
        {rows}
      </Modal>
    );
  }

  private renderQuestionRow = (index: number) => {
    const { questions, userAnswers } = this.props;
    const question = questions[index];
    const usersAnswer = userAnswers[index];

    return (
      <div key={index}>
        {question.amount} of {question.itemId}: {usersAnswer.judgment}
      </div>
    );
  };
}

export default connect(mapStateToProps)(HistoryModal);
