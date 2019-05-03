import * as React from "react";
import { connect } from "react-redux";

import { Question, State, UserAnswer } from "../../../redux";

import Modal from "../../Modal";

import HistoryRow from "./HistoryRow";

import "./index.scss";

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
      <Modal
        className="HistoryModal"
        isOpen={isOpen}
        header="History"
        onRequestClose={onRequestClose}
      >
        <table className="rows">
          <tbody>{rows}</tbody>
        </table>
      </Modal>
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

export default connect(mapStateToProps)(HistoryModal);
