import * as React from "react";
import { connect } from "react-redux";
import { NavLink, RouteComponentProps, withRouter } from "react-router-dom";

import { COUNTERS_LOOKUP } from "@data/counters";
import { STUDY_PACK_LOOKUP } from "@data/studyPacks";

import { State } from "@jyosuushi/redux";
import { getLocalization } from "@jyosuushi/redux/selectors";

import Localization from "@jyosuushi/localization";

import { interleave } from "@jyosuushi/utils";

import {
  EXPLORE_COUNTER_PATH,
  EXPLORE_PAGE_PATH,
  EXPLORE_STUDY_PACK_PATH,
  getStudyPackLink
} from "./pathing";

import "./BreadcrumbBar.scss";

interface ReduxProps {
  localization: Localization;
}

function mapStateToProps(state: State): ReduxProps {
  return {
    localization: getLocalization(state)
  };
}

type ComponentProps = ReduxProps &
  RouteComponentProps<{ counterId?: string; packId?: string }>;

function makeStudyPackDomLink(
  localization: Localization,
  packId: string
): React.ReactNode {
  const studyPack = STUDY_PACK_LOOKUP[packId];
  return (
    <NavLink
      key={EXPLORE_STUDY_PACK_PATH}
      exact={true}
      to={getStudyPackLink(studyPack)}
    >
      {localization.pageExploreStudyPack}{" "}
      {localization.studyPackName(studyPack)}
    </NavLink>
  );
}

function assertParamDefined<
  TKey extends keyof ComponentProps["match"]["params"],
  TType extends ComponentProps["match"]["params"][TKey]
>(key: TKey, param: TType): asserts param is Exclude<TType, undefined> {
  if (!param) {
    throw new Error(`Param '${key}' is required.`);
  }
}

class BreadcrumbBar extends React.PureComponent<ComponentProps> {
  public render(): React.ReactNode {
    const { localization, location, match } = this.props;

    const links: React.ReactNode[] = [
      <NavLink key={EXPLORE_PAGE_PATH} exact={true} to={EXPLORE_PAGE_PATH}>
        {localization.pageExplore}
      </NavLink>
    ];

    switch (match.path) {
      case EXPLORE_STUDY_PACK_PATH: {
        assertParamDefined("packId", match.params.packId);
        links.push(makeStudyPackDomLink(localization, match.params.packId));
        break;
      }
      case EXPLORE_COUNTER_PATH: {
        if (location.state && location.state.fromStudyPack) {
          links.push(
            makeStudyPackDomLink(localization, location.state.fromStudyPack)
          );
        }

        assertParamDefined("counterId", match.params.counterId);
        const counter = COUNTERS_LOOKUP[match.params.counterId];
        links.push(
          <NavLink key={EXPLORE_COUNTER_PATH} exact={true} to={location}>
            {localization.pageExploreCounter}{" "}
            {localization.counterName(counter)}【{counter.kanji}】
          </NavLink>
        );

        break;
      }
    }

    return (
      <div className="BreadcrumbBar">
        <span className="flourish">⁜</span> {interleave(links, " » ")}
      </div>
    );
  }
}

export default connect(mapStateToProps)(withRouter(BreadcrumbBar));
