import classnames from "classnames";
import * as React from "react";
import * as ReactGA from "react-ga";
import { connect } from "react-redux";

import Localization from "@jyosuushi/localization";

import { Scorecard, State } from "@jyosuushi/redux";
import { leaveQuiz } from "@jyosuushi/redux/actions";
import { getLocalization } from "@jyosuushi/redux/selectors";
import { Dispatch } from "@jyosuushi/redux/store";

import TooltipButton from "@jyosuushi/ui/components/TooltipButton";

import Furigana from "@jyosuushi/ui/Furigana";
import Modal from "@jyosuushi/ui/Modal";
import QuizHistory from "@jyosuushi/ui/QuizHistory";

import AbortConfirmationModal from "./AbortConfirmationModal";
import BetaBanner from "./BetaBanner";
import Score from "./Score";

import HistoryIcon from "./history.svg";
import HomeIcon from "./home.svg";
import SakuraIcon from "./sakura.svg";

import styles from "./index.scss";

interface ProvidedProps {
  isQuizActive: boolean;
  onModalOpened: (isOpen: boolean) => void;
}

interface ReduxProps {
  enabledPacks: ReadonlyArray<string>;
  hasAnsweredQuestion: boolean;
  isOnQuizWrapup: boolean;
  localization: Localization;
  scorecard: Scorecard;
  totalNumberQuestions: number;
}

function mapStateToProps(state: State): ReduxProps {
  let hasAnsweredQuestion: boolean;
  switch (state.quizState.state) {
    case "reviewing-answer":
    case "quiz-wrapup": {
      hasAnsweredQuestion = true;
      break;
    }
    default: {
      hasAnsweredQuestion = !!state.questions.asked.length;
      break;
    }
  }

  return {
    enabledPacks: state.enabledPacks,
    hasAnsweredQuestion,
    isOnQuizWrapup: state.quizState.state === "quiz-wrapup",
    localization: getLocalization(state),
    scorecard: state.scorecard,
    totalNumberQuestions:
      state.questions.asked.length +
      (state.questions.currentQuestion ? 1 : 0) +
      state.questions.queue.length,
  };
}

type ComponentProps = ProvidedProps & ReduxProps & { dispatch: Dispatch };

enum Stage {
  RestingHome = "resting-home",
  TransitioningFromHome = "transitioning-from-home",
  TransitioningToQuiz = "transitioning-to-quiz",
  RestingQuiz = "resting-quiz",
  TransitioningFromQuiz = "transitioning-from-quiz",
  TransitioningToHome = "transitioning-to-home",
}

type Layout = "home" | "quiz";

interface ComponentState {
  isPromptingToLeave: boolean;
  showHistoryModal: boolean;
  stage: Stage;
}

const STAGE_DEFINITIONS: {
  [stage in Stage]: {
    animationName: string;
    cssClassName: string;
    followingStage: Stage | null;
  };
} = {
  [Stage.RestingHome]: {
    animationName: styles.restingHome,
    cssClassName: styles.restingHome,
    followingStage: null,
  },
  [Stage.TransitioningFromHome]: {
    animationName: styles.transitioningFromHomeKeyframes,
    cssClassName: styles.transitioningFromHome,
    followingStage: Stage.TransitioningToQuiz,
  },
  [Stage.TransitioningToQuiz]: {
    animationName: styles.transitioningToQuizKeyframes,
    cssClassName: styles.transitioningToQuiz,
    followingStage: Stage.RestingQuiz,
  },
  [Stage.RestingQuiz]: {
    animationName: styles.restingQuiz,
    cssClassName: styles.restingQuiz,
    followingStage: null,
  },
  [Stage.TransitioningFromQuiz]: {
    animationName: styles.transitioningFromQuizKeyframes,
    cssClassName: styles.transitioningFromQuiz,
    followingStage: Stage.TransitioningToHome,
  },
  [Stage.TransitioningToHome]: {
    animationName: styles.transitioningToHomeKeyframes,
    cssClassName: styles.transitioningToHome,
    followingStage: Stage.RestingHome,
  },
};

const LAYOUT_TO_CSS_CLASS_NAME: { [layout in Layout]: string } = {
  home: styles.home,
  quiz: styles.quiz,
};

class Header extends React.PureComponent<ComponentProps, ComponentState> {
  public state: ComponentState;

  public constructor(props: ComponentProps) {
    super(props);
    this.state = {
      isPromptingToLeave: false,
      showHistoryModal: false,
      stage: props.isQuizActive ? Stage.RestingQuiz : Stage.RestingHome,
    };
  }

  public componentDidUpdate({
    isQuizActive: wasQuizActive,
  }: ComponentProps): void {
    const { hasAnsweredQuestion, isQuizActive, onModalOpened } = this.props;
    if (wasQuizActive !== isQuizActive) {
      this.setState({
        stage: isQuizActive
          ? Stage.TransitioningFromHome
          : Stage.TransitioningFromQuiz,
      });
    }

    if (!hasAnsweredQuestion && this.state.showHistoryModal) {
      this.setState({
        showHistoryModal: false,
      });
      onModalOpened(false);
    }
  }

  public render(): React.ReactNode {
    const { stage } = this.state;

    const layout: Layout =
      stage === "resting-home" ||
      stage === "transitioning-from-home" ||
      stage === "transitioning-to-home"
        ? "home"
        : "quiz";
    return (
      <div
        className={classnames(
          styles.header,
          LAYOUT_TO_CSS_CLASS_NAME[layout],
          STAGE_DEFINITIONS[stage].cssClassName
        )}
        onAnimationEnd={this.onAnimationEnd}
      >
        <SakuraIcon className={styles.sakura} />
        {layout === "home" ? this.renderHomeLayout() : this.renderQuizLayout()}
      </div>
    );
  }

  private renderHomeLayout(): React.ReactNode {
    const { localization } = this.props;
    return (
      <React.Fragment>
        <div className={styles.main}>
          <Furigana furigana="じょすうし" text="助数詞" />を
          <Furigana furigana="れんしゅう" text="練習" />
        </div>
        <div className={styles.subheader}>{localization.siteTagline}</div>
        <BetaBanner className={styles.betaBanner} localization={localization} />
      </React.Fragment>
    );
  }

  private renderQuizLayout(): React.ReactNode {
    const {
      hasAnsweredQuestion,
      localization,
      scorecard: { numCorrectAnswers, numIncorrectAnswers },
    } = this.props;
    const { isPromptingToLeave, showHistoryModal, stage } = this.state;
    const enabled = stage === "resting-quiz";
    const numAnswered = numCorrectAnswers + numIncorrectAnswers;

    return (
      <React.Fragment>
        <div className={styles.siteName}>助数詞を練習</div>
        <div
          className={classnames(
            styles.scorecard,
            hasAnsweredQuestion && styles.hasAnsweredQuestion,
            numAnswered > 0 && styles.hasScore
          )}
        >
          <div className={styles.onlyIfAnswered}>
            <Score className={styles.score} localization={localization} />
            <span className={styles.buttonWrapper}>
              <TooltipButton
                enabled={enabled}
                icon={HistoryIcon}
                onClick={this.onClickHistory}
                text="History"
              />
            </span>
          </div>
          <span className={styles.buttonWrapper}>
            <TooltipButton
              enabled={enabled}
              icon={HomeIcon}
              onClick={this.onClickHome}
              text="Home"
            />
          </span>
        </div>
        <Modal
          className={styles.historyModal}
          header="History"
          isOpen={showHistoryModal}
          onRequestClose={this.onCloseHistory}
        >
          <QuizHistory localization={localization} rowClassName={styles.rows} />
        </Modal>
        <AbortConfirmationModal
          isOpen={isPromptingToLeave}
          onConfirm={this.onConfirmLeaveEarly}
          onRequestClose={this.onRequestCloseLeaveEarly}
        />
      </React.Fragment>
    );
  }

  private onAnimationEnd = ({ animationName }: React.AnimationEvent): void => {
    const completedStage = Object.values(Stage).find(
      (stage: Stage): boolean =>
        STAGE_DEFINITIONS[stage].animationName === animationName
    );

    if (!completedStage) {
      // A nested animation, we'll just ignore
      return;
    }

    const nextStage = STAGE_DEFINITIONS[completedStage].followingStage;
    if (!nextStage) {
      return;
    }

    this.setState({ stage: nextStage });
  };

  private onClickHistory = (): void => {
    const { hasAnsweredQuestion, onModalOpened } = this.props;
    if (!hasAnsweredQuestion) {
      return;
    }

    this.setState({ showHistoryModal: true });
    onModalOpened(true);
  };

  private onCloseHistory = (): void => {
    const { onModalOpened } = this.props;
    this.setState({ showHistoryModal: false });
    onModalOpened(false);
  };

  private onClickHome = (): void => {
    const { dispatch, isOnQuizWrapup, onModalOpened, scorecard } = this.props;
    const numQuestionsAnswered =
      scorecard.numCorrectAnswers + scorecard.numIncorrectAnswers;
    if (isOnQuizWrapup || !numQuestionsAnswered) {
      if (!isOnQuizWrapup) {
        this.trackLeavingQuizEarly();
      }

      dispatch(leaveQuiz());
      return;
    }

    this.setState({ isPromptingToLeave: true });
    onModalOpened(true);
  };

  private onConfirmLeaveEarly = (): void => {
    const { dispatch } = this.props;
    this.trackLeavingQuizEarly();
    dispatch(leaveQuiz());
  };

  private onRequestCloseLeaveEarly = (): void => {
    const { onModalOpened } = this.props;
    this.setState({ isPromptingToLeave: false });
    onModalOpened(false);
  };

  private trackLeavingQuizEarly(): void {
    const { enabledPacks, scorecard, totalNumberQuestions } = this.props;
    const numQuestionsAnswered =
      scorecard.numCorrectAnswers + scorecard.numIncorrectAnswers;
    ReactGA.event({
      action: "Quiz Aborted",
      category: "Quiz",
      label: `[${enabledPacks.join(
        ", "
      )}] Answered: ${numQuestionsAnswered}, Skipped: ${
        scorecard.numSkippedQuestions
      }, Ignored: ${
        scorecard.numIgnoredAnswers
      }, Total: ${totalNumberQuestions}`,
    });
  }
}

export default connect(mapStateToProps)(Header);
