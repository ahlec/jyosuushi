import classnames from "classnames";
import * as React from "react";
import * as ReactGA from "react-ga";
import { connect } from "react-redux";

import Localization from "../../localization";

import { Scorecard, State } from "../../redux";
import { leaveQuiz } from "../../redux/actions";
import { Dispatch } from "../../redux/store";

import Modal from "../Modal";
import QuizHistory from "../QuizHistory";
import TooltipButton from "../TooltipButton";

import AbortConfirmationModal from "./AbortConfirmationModal";
import BetaBanner from "./BetaBanner";
import Score from "./Score";

import HistoryIcon from "./history.svg";
import HomeIcon from "./home.svg";
import SakuraIcon from "./sakura.svg";

import "./index.scss";

interface ProvidedProps {
  isQuizActive: boolean;
  localization: Localization;
  onModalOpened: (isOpen: boolean) => void;
}

interface ReduxProps {
  enabledPacks: ReadonlyArray<string>;
  hasAnsweredQuestion: boolean;
  isOnQuizWrapup: boolean;
  scorecard: Scorecard;
  totalNumberQuestions: number;
}

function mapStateToProps(state: State): ReduxProps {
  let hasAnsweredQuestion: boolean;
  switch (state.quizState) {
    case "reviewing-answer":
    case "quiz-wrapup": {
      hasAnsweredQuestion = true;
      break;
    }
    default: {
      hasAnsweredQuestion = state.questions.currentQuestion > 0;
      break;
    }
  }

  return {
    enabledPacks: state.enabledPacks,
    hasAnsweredQuestion,
    isOnQuizWrapup: state.quizState === "quiz-wrapup",
    scorecard: state.scorecard,
    totalNumberQuestions: state.questions.questions.length
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

/* tslint:disable:object-literal-sort-keys */
// JUSTIFICATION: Allows the object to follow a linear progression through animations.
const SUBSEQUENT_LAYOUT_STAGE: { [stage in Stage]: Stage | null } = {
  "resting-home": null,
  "transitioning-from-home": "transitioning-to-quiz",
  "transitioning-to-quiz": "resting-quiz",
  "resting-quiz": null,
  "transitioning-from-quiz": "transitioning-to-home",
  "transitioning-to-home": "resting-home"
};
/* tslint:enable:object-literal-sort-keys */

class Header extends React.PureComponent<ComponentProps, ComponentState> {
  public state: ComponentState;

  public constructor(props: ComponentProps) {
    super(props);
    this.state = {
      isPromptingToLeave: false,
      showHistoryModal: false,
      stage: props.isQuizActive ? "resting-quiz" : "resting-home"
    };
  }

  public componentDidUpdate({ isQuizActive: wasQuizActive }: ComponentProps) {
    const { hasAnsweredQuestion, isQuizActive, onModalOpened } = this.props;
    if (wasQuizActive !== isQuizActive) {
      this.setState({
        stage: isQuizActive
          ? "transitioning-from-home"
          : "transitioning-from-quiz"
      });
    }

    if (!hasAnsweredQuestion && this.state.showHistoryModal) {
      this.setState({
        showHistoryModal: false
      });
      onModalOpened(false);
    }
  }

  public render() {
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

  private renderHomeLayout() {
    const { localization } = this.props;
    return (
      <React.Fragment>
        <div className="main">
          <ruby>
            助数詞<rt>じょすうし</rt>
          </ruby>
          を
          <ruby>
            練習<rt>れんしゅう</rt>
          </ruby>
        </div>
        <div className="subheader">{localization.siteTagline}</div>
        <BetaBanner localization={localization} />
      </React.Fragment>
    );
  }

  private renderQuizLayout() {
    const {
      hasAnsweredQuestion,
      localization,
      scorecard: { numCorrectAnswers, numIncorrectAnswers }
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

  private onAnimationEnd = ({ animationName }: React.AnimationEvent) => {
    const nextStage = SUBSEQUENT_LAYOUT_STAGE[animationName as Stage];
    if (!nextStage) {
      // A nested animation, we'll just ignore
      return;
    }

    this.setState({ stage: nextStage });
  };

  private onClickHistory = () => {
    const { hasAnsweredQuestion, onModalOpened } = this.props;
    if (!hasAnsweredQuestion) {
      return;
    }

    this.setState({ showHistoryModal: true });
    onModalOpened(true);
  };
  private onCloseHistory = () => {
    const { onModalOpened } = this.props;
    this.setState({ showHistoryModal: false });
    onModalOpened(false);
  };

  private onClickHome = () => {
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

  private onConfirmLeaveEarly = () => {
    const { dispatch } = this.props;
    this.trackLeavingQuizEarly();
    dispatch(leaveQuiz());
  };

  private onRequestCloseLeaveEarly = () => {
    const { onModalOpened } = this.props;
    this.setState({ isPromptingToLeave: false });
    onModalOpened(false);
  };

  private trackLeavingQuizEarly() {
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
      }, Total: ${totalNumberQuestions}`
    });
  }
}

export default connect(mapStateToProps)(Header);
