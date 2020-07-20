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

import "./index.scss";

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

type Stage =
  | "resting-home"
  | "transitioning-from-home"
  | "transitioning-to-quiz"
  | "resting-quiz"
  | "transitioning-from-quiz"
  | "transitioning-to-home";

type Layout = "home" | "quiz";

interface ComponentState {
  isPromptingToLeave: boolean;
  showHistoryModal: boolean;
  stage: Stage;
}

/* eslint-disable sort-keys */
// JUSTIFICATION: Allows the object to follow a linear progression through animations.
const SUBSEQUENT_LAYOUT_STAGE: { [stage in Stage]: Stage | null } = {
  "resting-home": null,
  "transitioning-from-home": "transitioning-to-quiz",
  "transitioning-to-quiz": "resting-quiz",
  "resting-quiz": null,
  "transitioning-from-quiz": "transitioning-to-home",
  "transitioning-to-home": "resting-home",
};
/* eslint-enable sort-keys */

class Header extends React.PureComponent<ComponentProps, ComponentState> {
  public state: ComponentState;

  public constructor(props: ComponentProps) {
    super(props);
    this.state = {
      isPromptingToLeave: false,
      showHistoryModal: false,
      stage: props.isQuizActive ? "resting-quiz" : "resting-home",
    };
  }

  public componentDidUpdate({
    isQuizActive: wasQuizActive,
  }: ComponentProps): void {
    const { hasAnsweredQuestion, isQuizActive, onModalOpened } = this.props;
    if (wasQuizActive !== isQuizActive) {
      this.setState({
        stage: isQuizActive
          ? "transitioning-from-home"
          : "transitioning-from-quiz",
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
        className={classnames("Header", layout, stage)}
        onAnimationEnd={this.onAnimationEnd}
      >
        <SakuraIcon className="sakura" />
        {layout === "home" ? this.renderHomeLayout() : this.renderQuizLayout()}
      </div>
    );
  }

  private renderHomeLayout(): React.ReactNode {
    const { localization } = this.props;
    return (
      <React.Fragment>
        <div className="main">
          <Furigana furigana="じょすうし" text="助数詞" />を
          <Furigana furigana="れんしゅう" text="練習" />
        </div>
        <div className="subheader">{localization.siteTagline}</div>
        <BetaBanner localization={localization} />
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
        <div className="site-name">助数詞を練習</div>
        <div
          className={classnames(
            "scorecard",
            hasAnsweredQuestion && "has-answered-question",
            numAnswered > 0 && "has-score"
          )}
        >
          <div className="only-if-answered">
            <Score localization={localization} />
            <span className="button-wrapper">
              <TooltipButton
                enabled={enabled}
                icon={HistoryIcon}
                onClick={this.onClickHistory}
                text="History"
              />
            </span>
          </div>
          <span className="button-wrapper">
            <TooltipButton
              enabled={enabled}
              icon={HomeIcon}
              onClick={this.onClickHome}
              text="Home"
            />
          </span>
        </div>
        <Modal
          className="HistoryModal"
          header="History"
          isOpen={showHistoryModal}
          onRequestClose={this.onCloseHistory}
        >
          <QuizHistory localization={localization} />
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
    const nextStage = SUBSEQUENT_LAYOUT_STAGE[animationName as Stage];
    if (!nextStage) {
      // A nested animation, we'll just ignore
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