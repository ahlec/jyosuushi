import { memoize } from "lodash";
import * as React from "react";
import { connect } from "react-redux";

import Localization from "../../localization";

import { State } from "../../redux";
import { changeStudyPacks } from "../../redux/actions";
import { Dispatch } from "../../redux/store";

import { STUDY_PACKS, StudyPack } from "../../data/study-packs";

import "./PackSelection.scss";

interface StudyPackLookup {
  [packId: string]: StudyPack;
}
const STUDY_PACK_LOOKUP: StudyPackLookup = STUDY_PACKS.reduce(
  (lookup: StudyPackLookup, studyPack: StudyPack) => {
    lookup[studyPack.packId] = studyPack;
    return lookup;
  },
  {}
);

interface ProvidedProps {
  localization: Localization;
}

interface ReduxProps {
  enabledPacks: ReadonlySet<string>;
}

type ComponentProps = ProvidedProps & ReduxProps & { dispatch: Dispatch };

const getEnabledPacksSet = memoize(
  (enabledPacks: ReadonlyArray<string>) => new Set(enabledPacks)
);

function mapStateToProps(state: State): ReduxProps {
  return {
    enabledPacks: getEnabledPacksSet(state.enabledPacks)
  };
}

interface ComponentState {
  numChanges: number;
  toDisable: ReadonlySet<string>;
  toEnable: ReadonlySet<string>;
}

class PackSelection extends React.PureComponent<
  ComponentProps,
  ComponentState
> {
  public state: ComponentState = {
    numChanges: 0,
    toDisable: new Set(),
    toEnable: new Set()
  };

  private onTogglePack = memoize((pack: StudyPack) => () => {
    const { enabledPacks } = this.props;
    let { numChanges, toDisable, toEnable } = this.state;

    if (enabledPacks.has(pack.packId)) {
      const mutableToDisable = new Set<string>(toDisable);
      toDisable = mutableToDisable;
      if (mutableToDisable.delete(pack.packId)) {
        numChanges--;
      } else {
        mutableToDisable.add(pack.packId);
        numChanges++;
      }
    } else {
      const mutableToEnable = new Set<string>(toEnable);
      toEnable = mutableToEnable;
      if (mutableToEnable.delete(pack.packId)) {
        numChanges--;
      } else {
        mutableToEnable.add(pack.packId);
        numChanges++;
      }
    }

    this.setState({ numChanges, toDisable, toEnable });
  });

  public componentDidUpdate({
    enabledPacks: prevEnabledPacks
  }: ComponentProps) {
    const { enabledPacks } = this.props;
    if (enabledPacks !== prevEnabledPacks) {
      this.setState({
        numChanges: 0,
        toDisable: new Set(),
        toEnable: new Set()
      });
    }
  }

  public render() {
    const { localization } = this.props;
    const { numChanges } = this.state;
    return (
      <div className="PackSelection">
        {STUDY_PACKS.map(this.renderPack)}
        <button disabled={!numChanges} onClick={this.onClickApply}>
          {localization.startQuiz} {!!numChanges && `(${numChanges})`}
        </button>
      </div>
    );
  }

  private onClickApply = () => {
    const { dispatch, enabledPacks } = this.props;
    const { toDisable, toEnable } = this.state;

    const next = new Set(enabledPacks);
    for (const packId of toDisable) {
      next.delete(packId);
    }

    for (const packId of toEnable) {
      next.add(packId);
    }

    dispatch(
      changeStudyPacks(
        Array.from(next).map(packId => STUDY_PACK_LOOKUP[packId])
      )
    );
  };

  private isPackEnabled(pack: StudyPack): boolean {
    const { enabledPacks } = this.props;
    const { toDisable, toEnable } = this.state;
    if (enabledPacks.has(pack.packId)) {
      return !toDisable.has(pack.packId);
    }

    return toEnable.has(pack.packId);
  }

  private renderPack = (pack: StudyPack) => {
    const { enabledPacks } = this.props;
    const currentlyEnabled = enabledPacks.has(pack.packId);
    const enabled = this.isPackEnabled(pack);
    return (
      <label key={pack.name} className="pack-option">
        <input
          type="checkbox"
          checked={enabled}
          onChange={this.onTogglePack(pack)}
        />{" "}
        {pack.name}
        {currentlyEnabled && (
          <React.Fragment>
            {" "}
            <span className="currently-enabled">(currently enabled)</span>
          </React.Fragment>
        )}
      </label>
    );
  };
}

export default connect(mapStateToProps)(PackSelection);
