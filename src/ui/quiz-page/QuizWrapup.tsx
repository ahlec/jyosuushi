import { round } from "lodash";
import * as React from "react";
import { connect } from "react-redux";

import Localization from "@jyosuushi/localization";
import QuizManager from "@jyosuushi/quiz/QuizManager";
import { Scorecard, State } from "@jyosuushi/redux";
import { leaveQuiz } from "@jyosuushi/redux/actions";
import { Dispatch } from "@jyosuushi/redux/store";
import { randomFromArray } from "@jyosuushi/utils";

import QuizHistory from "@jyosuushi/ui/QuizHistory";

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
    scorecard: state.scorecard,
  };
}

type ComponentProps = ProvidedProps & ReduxProps & { dispatch: Dispatch };

class QuizWrapup extends React.PureComponent<ComponentProps> {
  public render(): React.ReactNode {
    const {
      localization,
      scorecard: { numCorrectAnswers, numIncorrectAnswers },
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

  private onClickLeave = (): void => {
    this.props.dispatch(leaveQuiz());
  };

  private onClickRestart = (): void => {
    this.props.quizManager.restart();
  };
}

export default connect(mapStateToProps)(QuizWrapup);
