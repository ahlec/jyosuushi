import { memoize } from "lodash";
import * as React from "react";
import { connect } from "react-redux";

import { STUDY_PACK_LOOKUP, StudyPack } from "../../data/study-packs";
import Localization, {
  CreditsPiece,
  VARIABLE_ALEC_DEITLOFF,
  VARIABLE_FAVICON_CREDIT_LINK,
  VARIABLE_ICON_CREDIT_LINK
} from "../../localization";
import QuizManager from "../../QuizManager";
import { State } from "../../redux";

import TutorialModal from "./TutorialModal";

import CounterPreview from "./CounterPreview";
import PackSelection from "./PackSelection";

import "./index.scss";

function getPacksFromArray(packs: ReadonlyArray<string>) {
  return packs.map(packId => STUDY_PACK_LOOKUP[packId]);
}

const getPacksFromSet = memoize(
  (packs: ReadonlyArray<string>) => getPacksFromArray(Array.from(packs)),
  (packs: ReadonlyArray<string>) => JSON.stringify(packs)
);

interface ProvidedProps {
  localization: Localization;
  quizManager: QuizManager;
}

interface ReduxProps {
  enabledPacks: ReadonlyArray<StudyPack>;
}

function mapStateToProps(state: State): ReduxProps {
  return {
    enabledPacks: getPacksFromSet(state.enabledPacks)
  };
}

type ComponentProps = ProvidedProps & ReduxProps;

interface ComponentState {
  selection: ReadonlyArray<StudyPack>;
  showingTutorial: boolean;
}

class IntroPage extends React.PureComponent<ComponentProps, ComponentState> {
  public state: ComponentState;

  public constructor(props: ComponentProps) {
    super(props);

    this.state = {
      selection: props.enabledPacks,
      showingTutorial: false
    };
  }

  public componentDidUpdate({
    enabledPacks: prevEnabledPacks
  }: ComponentProps) {
    const { enabledPacks } = this.props;
    if (enabledPacks !== prevEnabledPacks) {
      this.setState({
        selection: enabledPacks
      });
    }
  }

  public render() {
    const { localization } = this.props;
    const { selection, showingTutorial } = this.state;
    return (
      <div className="IntroPage">
        <p>
          Welcome to <strong>助数詞を練習</strong>! This is a tool that's meant
          to help you study{" "}
          <a
            href="https://en.wikipedia.org/wiki/Japanese_counter_word"
            target="_blank"
          >
            Japanese counters
          </a>
          . You'll be given a random item and a random number, and then you tell
          us how you'd count that in Japanese.{" "}
          <span className="link" onClick={this.showTutorialModal}>
            Click here to read the tutorial.
          </span>
        </p>
        <p>
          To begin, select one or more study pack below. These will determine
          which counters you'll be asked.
        </p>
        <PackSelection
          localization={localization}
          onSelectionChanged={this.onSelectionChanged}
          selection={selection}
        />
        <div className="start">
          <button disabled={!selection.length} onClick={this.onStartQuiz}>
            {localization.startQuiz}
          </button>
        </div>
        <CounterPreview localization={localization} packs={selection} />
        <div className="flex" />
        <div className="credits">
          {localization.credits.map(this.renderCredit)}
        </div>
        <TutorialModal
          isOpen={showingTutorial}
          localization={localization}
          onRequestClose={this.hideTutorialModal}
        />
      </div>
    );
  }

  private renderCredit = (piece: CreditsPiece) => {
    switch (piece) {
      case VARIABLE_ALEC_DEITLOFF:
        return (
          <a
            key={VARIABLE_ALEC_DEITLOFF}
            href="http://alec.deitloff.com"
            target="_blank"
          >
            {this.props.localization.alecDeitloff}
          </a>
        );
      case VARIABLE_ICON_CREDIT_LINK:
        return (
          <React.Fragment key={VARIABLE_ICON_CREDIT_LINK}>
            <a
              href="https://www.iconfinder.com/iconsets/core-ui-outlined"
              target="_blank"
            >
              Core - UI - Outlined
            </a>
          </React.Fragment>
        );
      case VARIABLE_FAVICON_CREDIT_LINK:
        return (
          <a
            key={VARIABLE_FAVICON_CREDIT_LINK}
            href="https://www.flaticon.com/packs/chinese-new-year-12"
            target="_blank"
          >
            Freepik
          </a>
        );
      default:
        return piece;
    }
  };

  private showTutorialModal = () => this.setState({ showingTutorial: true });
  private hideTutorialModal = () => this.setState({ showingTutorial: false });

  private onSelectionChanged = (selection: ReadonlyArray<StudyPack>) =>
    this.setState({
      selection
    });

  private onStartQuiz = () => {
    const { quizManager } = this.props;
    const { selection } = this.state;
    quizManager.startNewQuiz(selection);
  };
}

export default connect(mapStateToProps)(IntroPage);
