import * as React from "react";
import { connect } from "react-redux";

import QuizManager from "../../QuizManager";
import { leaveQuiz } from "../../redux/actions";
import { Dispatch } from "../../redux/store";

interface ProvidedProps {
  quizManager: QuizManager;
}

type ComponentProps = ProvidedProps & { dispatch: Dispatch };

class QuizWrapup extends React.PureComponent<ComponentProps> {
  public render() {
    return (
      <div className="QuizWrapup">
        <button onClick={this.onClickRestart}>Restart</button>
        <button onClick={this.onClickLeave}>Leave</button>
      </div>
    );
  }

  private onClickLeave = () => this.props.dispatch(leaveQuiz());
  private onClickRestart = () => this.props.quizManager.restart();
}

export default connect()(QuizWrapup);
