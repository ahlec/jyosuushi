import { memoize } from "lodash";
import * as React from "react";
import { connect } from "react-redux";
import { Redirect, RouteComponentProps } from "react-router-dom";

import { STUDY_PACK_LOOKUP } from "../../../../../data/studyPacks";

import { Counter, StudyPack } from "../../../../interfaces";
import Localization from "../../../../localization";
import { State } from "../../../../redux";
import { getLocalization } from "../../../../redux/selectors";

import Furigana from "../../../Furigana";
import RightIcon from "../../../right.svg";

import BreadcrumbBar from "../BreadcrumbBar";
import { getCounterLink } from "../pathing";

import "./ExploreStudyPackPage.scss";

interface ReduxProps {
  localization: Localization;
}

function mapStateToProps(state: State): ReduxProps {
  return {
    localization: getLocalization(state)
  };
}

type ComponentProps = RouteComponentProps<{ packId: string }> & ReduxProps;

class ExploreStudyPackPage extends React.PureComponent<ComponentProps> {
  private get studyPack(): StudyPack | null {
    const {
      match: {
        params: { packId }
      }
    } = this.props;
    return STUDY_PACK_LOOKUP[packId] || null;
  }

  private onClickInvestigate = memoize((counter: Counter) => () => {
    const {
      history,
      match: {
        params: { packId }
      }
    } = this.props;
    history.push({
      pathname: getCounterLink(counter),
      state: {
        fromStudyPack: packId
      }
    });
  });

  public render() {
    const {
      studyPack,
      props: { localization }
    } = this;
    if (!studyPack) {
      return <Redirect to="/explore" />;
    }

    const { counters } = studyPack;
    return (
      <div className="ExploreStudyPackPage">
        <BreadcrumbBar />
        <h3>{localization.studyPackName(studyPack)}</h3>
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
    const { localization } = this.props;
    return (
      <tr
        key={counter.counterId}
        className="counter"
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

export default connect(mapStateToProps)(ExploreStudyPackPage);
