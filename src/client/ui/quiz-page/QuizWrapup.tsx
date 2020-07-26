import { round } from "lodash";
import * as React from "react";
import {
  defineMessages,
  FormattedMessage,
  MessageDescriptor,
} from "react-intl";
import { connect } from "react-redux";

import QuizManager from "@jyosuushi/quiz/QuizManager";
import { Scorecard, State } from "@jyosuushi/redux";
import { leaveQuiz } from "@jyosuushi/redux/actions";
import { Dispatch } from "@jyosuushi/redux/store";
import { randomFromArray } from "@jyosuushi/utils";

import QuizHistory from "@jyosuushi/ui/QuizHistory";

import styles from "./QuizWrapup.scss";

interface ProvidedProps {
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

const INTL_MESSAGES = defineMessages({
  highScoreEncouragement1: {
    defaultMessage: "That was astounding, really.",
    description:
      "(A random message displayed if the user got a high score; does not need to be a literal translation)",
    id: "quiz-page.QuizWrapup.encouragement.highScore1",
  },
  highScoreEncouragement2: {
    defaultMessage: "Look at how far you've come on your journey!",
    description:
      "(A random message displayed if the user got a high score; does not need to be a literal translation)",
    id: "quiz-page.QuizWrapup.encouragement.highScore2",
  },
  highScoreEncouragement3: {
    defaultMessage: "This stuff isn't easy, and you're aceing it!",
    description:
      "(A random message displayed if the user got a high score; does not need to be a literal translation)",
    id: "quiz-page.QuizWrapup.encouragement.highScore3",
  },
  highScoreEncouragement4: {
    defaultMessage:
      "It's taken a lot of work to get here; pat yourself on the back.",
    description:
      "(A random message displayed if the user got a high score; does not need to be a literal translation)",
    id: "quiz-page.QuizWrapup.encouragement.highScore4",
  },
  lowScoreEncouragement1: {
    defaultMessage: "You're trying your best, and that's the key to success!",
    description:
      "(A random message displayed if the user got a low score; does not need to be a literal translation)",
    id: "quiz-page.QuizWrapup.encouragement.lowScore1",
  },
  lowScoreEncouragement2: {
    defaultMessage:
      "You've learned so much to get here, I know you'll get to where you want to go!",
    description:
      "(A random message displayed if the user got a low score; does not need to be a literal translation)",
    id: "quiz-page.QuizWrapup.encouragement.lowScore2",
  },
  lowScoreEncouragement3: {
    defaultMessage: "This stuff isn't easy; practice WILL make perfect.",
    description:
      "(A random message displayed if the user got a low score; does not need to be a literal translation)",
    id: "quiz-page.QuizWrapup.encouragement.lowScore3",
  },
});

const LOW_SCORE_ENCOURAGEMENTS: readonly MessageDescriptor[] = [
  INTL_MESSAGES.lowScoreEncouragement1,
  INTL_MESSAGES.lowScoreEncouragement2,
  INTL_MESSAGES.lowScoreEncouragement3,
];

const HIGH_SCORE_ENCOURAGEMENTS: readonly MessageDescriptor[] = [
  INTL_MESSAGES.highScoreEncouragement1,
  INTL_MESSAGES.highScoreEncouragement2,
  INTL_MESSAGES.highScoreEncouragement3,
  INTL_MESSAGES.highScoreEncouragement4,
];

class QuizWrapup extends React.PureComponent<ComponentProps> {
  public render(): React.ReactNode {
    const {
      scorecard: { numCorrectAnswers, numIncorrectAnswers },
    } = this.props;
    const numAnswered = numCorrectAnswers + numIncorrectAnswers;
    const grade = numAnswered
      ? round((numCorrectAnswers / numAnswered) * 100, 2)
      : 0;

    const encouragementDescriptor = randomFromArray(
      grade <= 50 ? LOW_SCORE_ENCOURAGEMENTS : HIGH_SCORE_ENCOURAGEMENTS
    );

    return (
      <div className={styles.quizWrapup}>
        <div className={styles.score}>{grade}%</div>
        <FormattedMessage {...encouragementDescriptor} tagName="div" />
        <div className={styles.buttons}>
          <button onClick={this.onClickRestart}>Restart</button>
          <button onClick={this.onClickLeave}>Leave</button>
        </div>
        <QuizHistory rowClassName="" />
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
