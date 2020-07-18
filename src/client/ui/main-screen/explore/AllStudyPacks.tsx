import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { StudyPack } from "@jyosuushi/interfaces";
import Localization from "@jyosuushi/localization";
import { State } from "@jyosuushi/redux";
import { getLocalization } from "@jyosuushi/redux/selectors";

import { STUDY_PACKS } from "@data/studyPacks";

import { getStudyPackLink } from "./pathing";

import "./AllStudyPacks.scss";

interface ReduxProps {
  localization: Localization;
}

function mapStateToProps(state: State): ReduxProps {
  return {
    localization: getLocalization(state),
  };
}

class AllStudyPacks extends React.PureComponent<ReduxProps> {
  public render(): React.ReactNode {
    return (
      <div className="AllStudyPacks">
        <h3>Study Packs</h3>
        <div className="list">{STUDY_PACKS.map(this.renderStudyPack)}</div>
      </div>
    );
  }

  private renderStudyPack = (studyPack: StudyPack): React.ReactNode => {
    const { localization } = this.props;

    return (
      <Link
        key={studyPack.packId}
        className="StudyPackLink"
        to={getStudyPackLink(studyPack)}
      >
        <div className="name">{localization.studyPackName(studyPack)}</div>
        <div className="count">
          {localization.studyPackSize(studyPack.counters.length)}
        </div>
      </Link>
    );
  };
}

export default connect(mapStateToProps)(AllStudyPacks);
