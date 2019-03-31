import { memoize } from "lodash";
import * as React from "react";
import { connect } from "react-redux";

import { State } from "../redux";
import { disableStudyPack, enableStudyPack } from "../redux/actions";
import { Dispatch } from "../redux/store";

import { STUDY_PACKS, StudyPack } from "../data/study-packs";

interface ReduxProps {
  enabledPacks: { [packId: string]: boolean };
}

type ComponentProps = ReduxProps & { dispatch: Dispatch };

function mapStateToProps(state: State): ReduxProps {
  return {
    enabledPacks: state.enabledPacks
  };
}

class PackSelection extends React.PureComponent<ComponentProps> {
  private onSelect = memoize(
    (pack: StudyPack) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const { dispatch, enabledPacks } = this.props;
      const isEnabled = enabledPacks[pack.packId];
      dispatch(isEnabled ? disableStudyPack(pack) : enableStudyPack(pack));
    }
  );

  public render() {
    return (
      <div className="PackSelection">{STUDY_PACKS.map(this.renderPack)}</div>
    );
  }

  private renderPack = (pack: StudyPack) => {
    const { enabledPacks } = this.props;
    const enabled = enabledPacks[pack.packId];
    return (
      <label key={pack.name}>
        <input
          type="checkbox"
          checked={enabled}
          onChange={this.onSelect(pack)}
        />{" "}
        {pack.name}
      </label>
    );
  };
}

export default connect(mapStateToProps)(PackSelection);
