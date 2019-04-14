import classnames from "classnames";
import { memoize } from "lodash";
import * as React from "react";
import { connect } from "react-redux";

import { STUDY_PACKS, StudyPack } from "../../data/study-packs";
import Localization from "../../localization";

import { Counter, State } from "../../redux";
import { changeStudyPacks } from "../../redux/actions";
import { Dispatch } from "../../redux/store";

import PackDetailsModal from "./PackDetailsModal";

import CheckIcon from "./check.svg";

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

function compareCounters(a: Counter, b: Counter): number {
  return a.kana.localeCompare(b.kana);
}

function getDistinctCounters(
  enabledPacks: ReadonlySet<string>
): ReadonlyArray<Counter> {
  const counters: Counter[] = [];
  const encountered = new Set<string>();
  for (const packId of enabledPacks) {
    const pack = STUDY_PACK_LOOKUP[packId];
    for (const counter of pack.counters) {
      if (encountered.has(counter.counterId)) {
        continue;
      }

      encountered.add(counter.counterId);
      counters.push(counter);
    }
  }

  counters.sort(compareCounters);
  return counters;
}

function mapStateToProps(state: State): ReduxProps {
  return {
    enabledPacks: getEnabledPacksSet(state.enabledPacks)
  };
}

interface ComponentState {
  counters: ReadonlyArray<Counter>;
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

    this.setState({ counters: getDistinctCounters(packs), packs });
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
      counters: getDistinctCounters(props.enabledPacks),
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
        counters: getDistinctCounters(enabledPacks),
        detailsPack: null,
        packs: new Set(enabledPacks)
      });
    }
  }

  public render() {
    const { localization } = this.props;
    const { counters, detailsPack, packs } = this.state;
    return (
      <div className="PackSelection">
        <div className="fieldset">
          <div className="header">
            <strong>{localization.studyPackSelectionHeader}</strong>{" "}
            <span className="subheader">
              {localization.studyPackSelectionSubheader}
            </span>
          </div>
          {STUDY_PACKS.map(this.renderPack)}
        </div>
        <div className="start">
          <button disabled={!packs.size} onClick={this.onClickApply}>
            {localization.startQuiz}
          </button>
        </div>
        {!!counters.length && (
          <div className="counters">
            <div className="header">{localization.countersDisplayHeader}</div>
            {counters.map(this.renderCounter)}
          </div>
        )}
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
    const { localization } = this.props;
    const { packs } = this.state;
    const enabled = packs.has(pack.packId);
    return (
      <div key={pack.name} className="pack">
        <div
          className={classnames("front", enabled && "checked")}
          onClick={this.onTogglePack(pack)}
        >
          <CheckIcon className="check" />
          <div className="name">{pack.name}</div>
          <div className="count">
            {localization.studyPackSize(pack.counters.length)}
          </div>
        </div>
        <div className="view-details" onClick={this.onClickViewPack(pack)}>
          View Details
        </div>
      </div>
    );
  };

  private renderCounter = (counter: Counter) => {
    return <div key={counter.counterId}>{counter.kana}</div>;
  };
}

export default connect(mapStateToProps)(PackSelection);
