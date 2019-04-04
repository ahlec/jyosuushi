import classnames from "classnames";
import * as React from "react";
import { connect } from "react-redux";

import { Scorecard, State } from "../../redux";

import "./Header.scss";

interface ProvidedProps {
  isQuizActive: boolean;
}

interface ReduxProps {
  scorecard: Scorecard;
}

function mapStateToProps(state: State): ReduxProps {
  return {
    scorecard: state.scorecard
  };
}

type ComponentProps = ProvidedProps & ReduxProps;

type Stage =
  | "resting-home"
  | "transitioning-from-home"
  | "transitioning-to-quiz"
  | "resting-quiz"
  | "transitioning-from-quiz"
  | "transitioning-to-home";

type Layout = "home" | "quiz";

interface ComponentState {
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
      stage: props.isQuizActive ? "resting-quiz" : "resting-home"
    };
  }

  public componentDidUpdate({ isQuizActive: wasQuizActive }: ComponentProps) {
    const { isQuizActive } = this.props;
    if (wasQuizActive !== isQuizActive) {
      this.setState({
        stage: isQuizActive
          ? "transitioning-from-home"
          : "transitioning-from-quiz"
      });
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
        <div className="subheader">Let's review Japanese counters!</div>
      </React.Fragment>
    );
  }

  private renderQuizLayout() {
    return (
      <React.Fragment>
        <div className="site-name">助数詞を練習</div>
        <div className="scorecard">your score:</div>
      </React.Fragment>
    );
  }

  private onAnimationEnd = ({ animationName }: React.AnimationEvent) => {
    const nextStage = SUBSEQUENT_LAYOUT_STAGE[animationName as Stage];
    if (!nextStage) {
      // A nested animation, we'll just ignore
      return;
    }

    console.log(animationName, "->", nextStage);
    this.setState({ stage: nextStage });
  };
}

export default connect(mapStateToProps)(Header);
