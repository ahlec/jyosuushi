import { memoize } from "lodash";
import * as React from "react";
import { connect } from "react-redux";

import { STUDY_PACK_LOOKUP } from "@data/studyPacks";
import { StudyPack } from "@jyosuushi/interfaces";
import Localization from "@jyosuushi/localization";
import withQuizManager, {
  InjectedProps,
} from "@jyosuushi/quiz/withQuizManager";
import { State } from "@jyosuushi/redux";
import { setEnabledPacks } from "@jyosuushi/redux/actions";
import { getLocalization } from "@jyosuushi/redux/selectors";
import { Dispatch } from "@jyosuushi/redux/store";

import InlineTrigger from "@jyosuushi/ui/components/InlineTrigger";

import CounterPreview from "./CounterPreview";
import PackSelection from "./PackSelection";
import TutorialModal from "./TutorialModal";

import styles from "./PreparePage.scss";

function getPacksFromArray(
  packs: ReadonlyArray<string>
): ReadonlyArray<StudyPack> {
  return packs.map((packId) => STUDY_PACK_LOOKUP[packId]);
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
    localization: getLocalization(state),
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
      showingTutorial: false,
    };
  }

  public render(): React.ReactNode {
    const { enabledPacks, localization } = this.props;
    const { showingTutorial } = this.state;
    return (
      <div className={styles.preparePage}>
        <p>
          Welcome to <strong>助数詞を練習</strong>! This is a tool that&apos;s
          meant to help you study{" "}
          <a
            href="https://en.wikipedia.org/wiki/Japanese_counter_word"
            target="_blank"
            rel="noopener noreferrer"
          >
            Japanese counters
          </a>
          . You&apos;ll be given a random item and a random number, and then you
          tell us how you&apos;d count that in Japanese.{" "}
          <InlineTrigger onTrigger={this.showTutorialModal}>
            Click here to read the tutorial.
          </InlineTrigger>
        </p>
        <PackSelection
          localization={localization}
          onSelectionChanged={this.onSelectionChanged}
          selection={enabledPacks}
        />
        <div className={styles.start}>
          <button disabled={!enabledPacks.length} onClick={this.onStartQuiz}>
            {localization.startQuiz}
          </button>
        </div>
        <CounterPreview
          className={styles.counterPreview}
          localization={localization}
          packs={enabledPacks}
        />
        <div className={styles.flex} />
        <TutorialModal
          isOpen={showingTutorial}
          localization={localization}
          onRequestClose={this.hideTutorialModal}
        />
      </div>
    );
  }

  private showTutorialModal = (): void =>
    this.setState({ showingTutorial: true });
  private hideTutorialModal = (): void =>
    this.setState({ showingTutorial: false });

  private onSelectionChanged = (selection: ReadonlyArray<StudyPack>): void => {
    const { dispatch } = this.props;
    dispatch(setEnabledPacks(selection));
  };

  private onStartQuiz = (): void => {
    const { quizManager } = this.props;
    quizManager.startNewQuiz();
  };
}

export default connect(mapStateToProps)(withQuizManager(PreparePage));
