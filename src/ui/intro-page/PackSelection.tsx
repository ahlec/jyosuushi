import classnames from "classnames";
import { memoize } from "lodash";
import * as React from "react";
import { connect } from "react-redux";

import {
  STUDY_PACK_LOOKUP,
  STUDY_PACKS,
  StudyPack
} from "../../data/study-packs";
import Localization from "../../localization";
import QuizManager from "../../QuizManager";
import { getDistinctCounters } from "../../utils";

import { Counter, State } from "../../redux";

import PackDetailsModal from "./PackDetailsModal";

import CheckIcon from "./check.svg";

import "./PackSelection.scss";

interface ProvidedProps {
  localization: Localization;
  quizManager: QuizManager;
}

interface ReduxProps {
  enabledPacks: ReadonlyArray<string>;
}

type ComponentProps = ProvidedProps & ReduxProps;

function mapStateToProps(state: State): ReduxProps {
  return {
    enabledPacks: state.enabledPacks
  };
}

interface ComponentState {
  counters: ReadonlyArray<Counter>;
  detailsPack: StudyPack | null;
  packs: ReadonlySet<string>;
}

function getPacksFromArray(packs: ReadonlyArray<string>) {
  return packs.map(packId => STUDY_PACK_LOOKUP[packId]);
}

function getPacksFromSet(packs: ReadonlySet<string>): ReadonlyArray<StudyPack> {
  return getPacksFromArray(Array.from(packs));
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

    this.setState({
      counters: getDistinctCounters(getPacksFromSet(packs)),
      packs
    });
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
      counters: getDistinctCounters(getPacksFromArray(props.enabledPacks)),
      detailsPack: null,
      packs: new Set(props.enabledPacks)
    };
  }

  public componentDidUpdate({
    enabledPacks: prevEnabledPacks
  }: ComponentProps) {
    const { enabledPacks } = this.props;
    if (enabledPacks !== prevEnabledPacks) {
      this.setState({
        counters: getDistinctCounters(getPacksFromArray(enabledPacks)),
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
    const { quizManager } = this.props;
    const { packs } = this.state;
    quizManager.startNewQuiz(getPacksFromSet(packs));
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
