import classnames from "classnames";
import { memoize } from "lodash";
import * as React from "react";

import { Counter, StudyPack } from "../../interfaces";
import Localization from "../../localization";

import Furigana from "../Furigana";
import RightIcon from "../right.svg";

import "./PackDetails.scss";

interface ComponentProps {
  enabled: boolean;
  localization: Localization;
  onInvestigateCounter: (counter: Counter) => void;
  pack: StudyPack;
}

export default class PackDetails extends React.PureComponent<ComponentProps> {
  private onClickInvestigate = memoize((counter: Counter) => () => {
    const { enabled, onInvestigateCounter } = this.props;
    if (!enabled) {
      return;
    }

    onInvestigateCounter(counter);
  });

  public render() {
    const {
      pack: { counters }
    } = this.props;
    return (
      <div className="PackDetails">
        <p>
          This pack contains{" "}
          <strong>
            {counters.length} {counters.length === 1 ? "counter" : "counters"}
          </strong>
          :
        </p>
        <table>
          <tbody>{counters.map(this.renderCounter)}</tbody>
        </table>
      </div>
    );
  }

  private renderCounter = (counter: Counter) => {
    const { enabled, localization } = this.props;
    return (
      <tr
        key={counter.counterId}
        className={classnames("counter", !enabled && "disabled")}
        onClick={this.onClickInvestigate(counter)}
      >
        <td className="jp">
          <Furigana
            text={counter.kanji || counter.kana}
            furigana={counter.kanji && counter.kana}
          />
        </td>
        <td className="name">{localization.counterName(counter)}</td>
        <td className="button">
          <RightIcon />
        </td>
      </tr>
    );
  };
}
