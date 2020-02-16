import { memoize, noop } from "lodash";
import * as React from "react";
import { connect } from "react-redux";

import { STUDY_PACK_LOOKUP } from "@data/studyPacks";
import { StudyPack } from "@jyosuushi/interfaces";
import Localization from "@jyosuushi/localization";
import withQuizManager, {
  InjectedProps
} from "@jyosuushi/quiz/withQuizManager";
import { State } from "@jyosuushi/redux";
import { getLocalization } from "@jyosuushi/redux/selectors";
import { Dispatch } from "@jyosuushi/redux/store";

import CounterPreview from "./CounterPreview";
import PackSelection from "./PackSelection";

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

class PreparePage extends React.PureComponent<ComponentProps> {
  public render() {
    const { enabledPacks, localization } = this.props;
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
          <span className="link">Click here to read the tutorial.</span>
        </p>
        <PackSelection
          localization={localization}
          onSelectionChanged={noop}
          selection={enabledPacks}
        />
        <div className="start">
          <button disabled={!enabledPacks.length} onClick={noop}>
            {localization.startQuiz}
          </button>
        </div>
        <CounterPreview localization={localization} packs={enabledPacks} />
        <div className="flex" />
      </div>
    );
  }
}

export default connect(mapStateToProps)(withQuizManager(PreparePage));
