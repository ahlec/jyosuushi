import { memoize } from "lodash";
import * as React from "react";
import { connect } from "react-redux";

import { STUDY_PACK_LOOKUP } from "../../../../data/studyPacks";
import { StudyPack } from "../../../interfaces";
import Localization from "../../../localization";
import withQuizManager, { InjectedProps } from "../../../quiz/withQuizManager";
import { State } from "../../../redux";
import { setEnabledPacks } from "../../../redux/actions";
import { getLocalization } from "../../../redux/selectors";
import { Dispatch } from "../../../redux/store";

import CounterPreview from "./CounterPreview";
import PackSelection from "./PackSelection";
import TutorialModal from "./TutorialModal";

import "./PreparePage.scss";

function getPacksFromArray(packs: ReadonlyArray<string>) {
  return packs.map(packId => STUDY_PACK_LOOKUP[packId]);
}

const getPacksFromSet = memoize(
  (packs: ReadonlyArray<string>) => getPacksFromArray(Array.from(packs)),
  (packs: ReadonlyArray<string>) => JSON.stringify(packs)
);

interface ReduxProps {
  enabledPacks: ReadonlyArray<StudyPack>;
  localization: Localization;
}

function mapStateToProps(state: State): ReduxProps {
  return {
    enabledPacks: getPacksFromSet(state.enabledPacks),
    localization: getLocalization(state)
  };
}

type ComponentProps = ReduxProps & InjectedProps & { dispatch: Dispatch };

interface ComponentState {
  showingTutorial: boolean;
}

class PreparePage extends React.PureComponent<ComponentProps, ComponentState> {
  public constructor(props: ComponentProps) {
    super(props);

    this.state = {
      showingTutorial: false
    };
  }

  public render() {
    const { enabledPacks, localization } = this.props;
    const { showingTutorial } = this.state;
    return (
      <div className="PreparePage">
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
        <PackSelection
          localization={localization}
          onSelectionChanged={this.onSelectionChanged}
          selection={enabledPacks}
        />
        <div className="start">
          <button disabled={!enabledPacks.length} onClick={this.onStartQuiz}>
            {localization.startQuiz}
          </button>
        </div>
        <CounterPreview localization={localization} packs={enabledPacks} />
        <div className="flex" />
        <TutorialModal
          isOpen={showingTutorial}
          localization={localization}
          onRequestClose={this.hideTutorialModal}
        />
      </div>
    );
  }

  private showTutorialModal = () => this.setState({ showingTutorial: true });
  private hideTutorialModal = () => this.setState({ showingTutorial: false });

  private onSelectionChanged = (selection: ReadonlyArray<StudyPack>) => {
    const { dispatch } = this.props;
    dispatch(setEnabledPacks(selection));
  };

  private onStartQuiz = () => {
    const { quizManager } = this.props;
    quizManager.startNewQuiz();
  };
}

export default connect(mapStateToProps)(withQuizManager(PreparePage));
