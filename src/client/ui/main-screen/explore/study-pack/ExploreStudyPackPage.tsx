import { memoize } from "lodash";
import * as React from "react";
import { connect } from "react-redux";
import { Redirect, RouteComponentProps } from "react-router-dom";

import { STUDY_PACK_LOOKUP } from "@data/studyPacks";

import { Counter, StudyPack } from "@jyosuushi/interfaces";
import Localization from "@jyosuushi/localization";
import { State } from "@jyosuushi/redux";
import { getLocalization } from "@jyosuushi/redux/selectors";

import CounterDisplay from "@jyosuushi/ui/components/CounterDisplay";
import RightIcon from "@jyosuushi/ui/right.svg";

import BreadcrumbBar from "@jyosuushi/ui/main-screen/explore/BreadcrumbBar";
import { getCounterLink } from "@jyosuushi/ui/main-screen/explore/pathing";

import styles from "./ExploreStudyPackPage.scss";

interface ReduxProps {
  localization: Localization;
}

function mapStateToProps(state: State): ReduxProps {
  return {
    localization: getLocalization(state),
  };
}

type ComponentProps = RouteComponentProps<{ packId: string }> & ReduxProps;

class ExploreStudyPackPage extends React.PureComponent<ComponentProps> {
  private get studyPack(): StudyPack | null {
    const {
      match: {
        params: { packId },
      },
    } = this.props;
    return STUDY_PACK_LOOKUP[packId] || null;
  }

  private onClickInvestigate = memoize((counter: Counter) => (): void => {
    const {
      history,
      match: {
        params: { packId },
      },
    } = this.props;
    history.push({
      pathname: getCounterLink(counter),
      state: {
        fromStudyPack: packId,
      },
    });
  });

  public render(): React.ReactNode {
    const {
      studyPack,
      props: { localization },
    } = this;
    if (!studyPack) {
      return <Redirect to="/explore" />;
    }

    const { counters } = studyPack;
    return (
      <div className={styles.exploreStudyPackPage}>
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

  private renderCounter = (counter: Counter): React.ReactNode => {
    const { localization } = this.props;
    return (
      <tr
        key={counter.counterId}
        className={styles.counter}
        onClick={this.onClickInvestigate(counter)}
      >
        <td className={styles.jp}>
          <CounterDisplay className={styles.counterDisplay} counter={counter} />
        </td>
        <td className={styles.name}>{localization.counterName(counter)}</td>
        <td className={styles.button}>
          <RightIcon />
        </td>
      </tr>
    );
  };
}

export default connect(mapStateToProps)(ExploreStudyPackPage);
