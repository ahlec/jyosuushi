import { round } from "lodash";
import * as React from "react";
import { connect } from "react-redux";

import Localization from "../../localization";
import QuizManager from "../../QuizManager";
import { Scorecard, State } from "../../redux";
import { leaveQuiz } from "../../redux/actions";
import { Dispatch } from "../../redux/store";
import { randomFromArray } from "../../utils";

import QuizHistory from "../QuizHistory";

import "./QuizWrapup.scss";

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
    const grade = numAnswered
      ? round((numCorrectAnswers / numAnswered) * 100, 2)
      : 0;

    return (
      <div className="QuizWrapup">
        <div className="score">{grade}%</div>
        <div className="encouragement">
          {randomFromArray(
            grade <= 50
              ? localization.lowScoreEncouragements
              : localization.highScoreEncouragements
          )}
        </div>
        <div className="buttons">
          <button onClick={this.onClickRestart}>Restart</button>
          <button onClick={this.onClickLeave}>Leave</button>
        </div>
        <QuizHistory localization={localization} />
      </div>
    );
  }

  private onClickLeave = () => this.props.dispatch(leaveQuiz());
  private onClickRestart = () => this.props.quizManager.restart();
}

export default connect(mapStateToProps)(QuizWrapup);
