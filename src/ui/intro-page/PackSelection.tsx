import { memoize } from "lodash";
import * as React from "react";
import { connect } from "react-redux";

import { STUDY_PACKS, StudyPack } from "../../data/study-packs";
import Localization from "../../localization";

import { State } from "../../redux";
import { changeStudyPacks } from "../../redux/actions";
import { Dispatch } from "../../redux/store";

import TooltipButton from "../TooltipButton";
import PackDetailsModal from "./PackDetailsModal";

import InfoIcon from "./info.svg";

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
  detailsPack: StudyPack | null;
  packs: ReadonlySet<string>;
}

class PackSelection extends React.PureComponent<
  ComponentProps,
  ComponentState
> {
  public state: ComponentState;

  private onTogglePack = memoize((pack: StudyPack) => () => {
    const packs = new Set<string>(this.state.packs);

    if (packs.has(pack.packId)) {
      packs.delete(pack.packId);
    } else {
      packs.add(pack.packId);
    }

    this.setState({ packs });
  });

  private onClickViewPack = memoize(
    (pack: StudyPack) => (event: React.MouseEvent) => {
      this.setState({ detailsPack: pack });
      event.stopPropagation();
      event.preventDefault();
    }
  );

  public constructor(props: ComponentProps) {
    super(props);
    this.state = {
      detailsPack: null,
      packs: props.enabledPacks
    };
  }

  public componentDidUpdate({
    enabledPacks: prevEnabledPacks
  }: ComponentProps) {
    const { enabledPacks } = this.props;
    if (enabledPacks !== prevEnabledPacks) {
      this.setState({
        detailsPack: null,
        packs: new Set(enabledPacks)
      });
    }
  }

  public render() {
    const { localization } = this.props;
    const { detailsPack, packs } = this.state;
    return (
      <div className="PackSelection">
        {STUDY_PACKS.map(this.renderPack)}
        <button disabled={!packs.size} onClick={this.onClickApply}>
          {localization.startQuiz} {!!packs.size && `(${packs.size})`}
        </button>
        <PackDetailsModal
          onRequestClose={this.onRequestCloseDetails}
          pack={detailsPack}
        />
      </div>
    );
  }

  private onClickApply = () => {
    const { dispatch } = this.props;
    const { packs } = this.state;
    dispatch(
      changeStudyPacks(
        Array.from(packs).map(packId => STUDY_PACK_LOOKUP[packId])
      )
    );
  };

  private onRequestCloseDetails = () => this.setState({ detailsPack: null });

  private renderPack = (pack: StudyPack) => {
    const { packs } = this.state;
    const enabled = packs.has(pack.packId);
    return (
      <label key={pack.name} className="pack-option">
        <input
          type="checkbox"
          checked={enabled}
          onChange={this.onTogglePack(pack)}
        />{" "}
        {pack.name}
        <TooltipButton
          enabled={true}
          icon={InfoIcon}
          onClick={this.onClickViewPack(pack)}
          text="View Pack"
        />
      </label>
    );
  };
}

export default connect(mapStateToProps)(PackSelection);
