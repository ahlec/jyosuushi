import { round } from "lodash";
import * as React from "react";
import { connect } from "react-redux";

import Localization from "../../localization";
import QuizManager from "../../QuizManager";
import { Scorecard, State } from "../../redux";
import { leaveQuiz } from "../../redux/actions";
import { Dispatch } from "../../redux/store";

import QuizHistory from "../QuizHistory";

interface ProvidedProps {
  localization: Localization;
  quizManager: QuizManager;
}

interface ReduxProps {
  scorecard: Scorecard;
}

function mapStateToProps(state: State): ReduxProps {
  return {
    scorecard: state.scorecard
  };
}

type ComponentProps = ProvidedProps & ReduxProps & { dispatch: Dispatch };

class QuizWrapup extends React.PureComponent<ComponentProps> {
  public render() {
    const {
      localization,
      scorecard: { numCorrectAnswers, numIncorrectAnswers }
    } = this.props;
    const numAnswered = numCorrectAnswers + numIncorrectAnswers;
    const grade = round((numCorrectAnswers / numAnswered) * 100, 2);

    return (
      <div className="QuizWrapup">
        <div className="score">{grade}%</div>
        <QuizHistory localization={localization} />
        <button onClick={this.onClickRestart}>Restart</button>
        <button onClick={this.onClickLeave}>Leave</button>
      </div>
    );
  }

  private onClickLeave = () => this.props.dispatch(leaveQuiz());
  private onClickRestart = () => this.props.quizManager.restart();
}

export default connect(mapStateToProps)(QuizWrapup);
