import * as React from "react";
import { connect } from "react-redux";
import { NavLink, RouteComponentProps, withRouter } from "react-router-dom";

import { STUDY_PACK_LOOKUP } from "../../../../data/studyPacks";

import { State } from "../../../redux";
import { getLocalization } from "../../../redux/selectors";

import Localization from "../../../localization";

import { interleave } from "../../../utils";

import { EXPLORE_PAGE_PATH, EXPLORE_STUDY_PACK_PATH } from "./constants";

import "./BreadcrumbBar.scss";

interface ReduxProps {
  localization: Localization;
}

function mapStateToProps(state: State): ReduxProps {
  return {
    localization: getLocalization(state)
  };
}

type ComponentProps = ReduxProps & RouteComponentProps<any>;

class BreadcrumbBar extends React.PureComponent<ComponentProps> {
  public render() {
    const { localization, location, match } = this.props;

    const links: React.ReactNode[] = [
      <NavLink key={EXPLORE_PAGE_PATH} exact={true} to={EXPLORE_PAGE_PATH}>
        {localization.pageExplore}
      </NavLink>
    ];

    if (match.path === EXPLORE_STUDY_PACK_PATH) {
      const packId: string = match.params.packId;
      const studyPack = STUDY_PACK_LOOKUP[packId];
      links.push(
        <NavLink key={EXPLORE_STUDY_PACK_PATH} exact={true} to={location}>
          {localization.pageExploreStudyPack}{" "}
          {localization.studyPackName(studyPack)}
        </NavLink>
      );
    }

    return <div className="BreadcrumbBar">{interleave(links, " > ")}</div>;
  }
}

export default connect(mapStateToProps)(withRouter(BreadcrumbBar));
