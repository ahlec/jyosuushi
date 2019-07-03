import classnames from "classnames";
import { memoize } from "lodash";
import * as React from "react";

import { STUDY_PACKS } from "../../../data/studyPacks";
import { StudyPack } from "../../interfaces";
import Localization from "../../localization";

import CheckIcon from "./check.svg";

import "./PackSelection.scss";

interface ComponentProps {
  localization: Localization;
  onSelectionChanged: (selection: ReadonlyArray<StudyPack>) => void;
  selection: ReadonlyArray<StudyPack>;
}

function comparePacks(a: StudyPack, b: StudyPack): number {
  return a.packId.localeCompare(b.packId);
}

export default class PackSelection extends React.PureComponent<ComponentProps> {
  private onTogglePack = memoize((pack: StudyPack) => () => {
    const { onSelectionChanged, selection } = this.props;
    const next = [...selection];

    const index = next.indexOf(pack);
    if (index >= 0) {
      next.splice(index, 1);
    } else {
      next.push(pack);
    }

    next.sort(comparePacks);
    onSelectionChanged(next);
  });

  private onClickViewPack = memoize(
    (pack: StudyPack) => (event: React.MouseEvent) => {
      this.setState({ detailsPack: pack });
      event.stopPropagation();
      event.preventDefault();
    }
  );

  public componentDidUpdate({ selection: prevSelection }: ComponentProps) {
    const { selection } = this.props;
    if (selection !== prevSelection) {
      this.setState({
        detailsPack: null
      });
    }
  }

  public render() {
    const { localization } = this.props;
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
      </div>
    );
  }

  private renderPack = (pack: StudyPack) => {
    const { localization, selection } = this.props;
    const enabled = selection.indexOf(pack) >= 0;
    return (
      <div key={pack.packId} className="pack">
        <div
          className={classnames("front", enabled && "checked")}
          onClick={this.onTogglePack(pack)}
        >
          <CheckIcon className="check" />
          <div className="name">{localization.studyPackName(pack)}</div>
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
}
