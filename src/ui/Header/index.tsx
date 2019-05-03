import classnames from "classnames";
import * as React from "react";
import { connect } from "react-redux";

import Localization from "../../localization";

import { Scorecard, State } from "../../redux";
import { leaveQuiz } from "../../redux/actions";
import { Dispatch } from "../../redux/store";

import TooltipButton from "../TooltipButton";

import HistoryModal, { hasSufficientData } from "./HistoryModal";

import HistoryIcon from "./history.svg";
import HomeIcon from "./home.svg";
import "./index.scss";

interface ProvidedProps {
  isQuizActive: boolean;
  localization: Localization;
  onModalOpened: (isOpen: boolean) => void;
}

interface ReduxProps {
  hasHistoryData: boolean;
  scorecard: Scorecard;
}

function mapStateToProps(state: State): ReduxProps {
  return {
    hasHistoryData: hasSufficientData(state),
    scorecard: state.scorecard
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
  showHistoryModal: boolean;
  stage: Stage;
}

const SUBSEQUENT_LAYOUT_STAGE: { [stage in Stage]: Stage | null } = {
  "resting-home": null,
  "transitioning-from-home": "transitioning-to-quiz",
  "transitioning-to-quiz": "resting-quiz",
  "resting-quiz": null,
  "transitioning-from-quiz": "transitioning-to-home",
  "transitioning-to-home": "resting-home"
};

class Header extends React.PureComponent<ComponentProps, ComponentState> {
  public state: ComponentState;

  public constructor(props: ComponentProps) {
    super(props);
    this.state = {
      showHistoryModal: false,
      stage: props.isQuizActive ? "resting-quiz" : "resting-home"
    };
  }

  public componentDidUpdate({ isQuizActive: wasQuizActive }: ComponentProps) {
    const { hasHistoryData, isQuizActive, onModalOpened } = this.props;
    if (wasQuizActive !== isQuizActive) {
      this.setState({
        stage: isQuizActive
          ? "transitioning-from-home"
          : "transitioning-from-quiz"
      });
    }

    if (!hasHistoryData && this.state.showHistoryModal) {
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
      </React.Fragment>
    );
  }

  private renderQuizLayout() {
    const { showHistoryModal, stage } = this.state;
    const enabled = stage === "resting-quiz";
    return (
      <React.Fragment>
        <div className="site-name">助数詞を練習</div>
        <div className="scorecard">
          your score:
          <TooltipButton
            enabled={enabled}
            icon={HistoryIcon}
            onClick={this.onClickHistory}
            text="History"
          />
          <TooltipButton
            enabled={enabled}
            icon={HomeIcon}
            onClick={this.onClickHome}
            text="Home"
          />
        </div>
        <HistoryModal
          isOpen={showHistoryModal}
          onRequestClose={this.onCloseHistory}
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
    const { hasHistoryData, onModalOpened } = this.props;
    if (!hasHistoryData) {
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
    const { dispatch, scorecard } = this.props;
    const numQuestionsAnswered =
      scorecard.numCorrectAnswers + scorecard.numIncorrectAnswers;
    if (!numQuestionsAnswered) {
      dispatch(leaveQuiz());
      return;
    }

    alert("yeh");
  };
}

export default connect(mapStateToProps)(Header);
