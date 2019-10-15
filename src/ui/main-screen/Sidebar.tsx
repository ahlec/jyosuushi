import { Location } from "history";
import { memoize } from "lodash";
import * as React from "react";
import { connect } from "react-redux";
import { match as Match, NavLink } from "react-router-dom";

import Localization from "@jyosuushi/localization";
import { State } from "@jyosuushi/redux";
import { getLocalization } from "@jyosuushi/redux/selectors";

import { LANDING_PAGE, ORDERED_SIDEBAR_PAGES, PageDefinition } from "./pages";

import "./Sidebar.scss";

const isPageActive = memoize(
  (page: PageDefinition) => (match: Match, { pathname }: Location): boolean => {
    if (match) {
      return true;
    }

    if (pathname === "/" && page === LANDING_PAGE) {
      return true;
    }

    return false;
  }
);

interface ReduxProps {
  localization: Localization;
}

function mapStateToProps(state: State): ReduxProps {
  return {
    localization: getLocalization(state)
  };
}

type ComponentProps = ReduxProps;

class Sidebar extends React.Component<ComponentProps> {
  public render() {
    return (
      <div className="Sidebar">
        {ORDERED_SIDEBAR_PAGES.map(this.renderLink)}
      </div>
    );
  }

  private renderLink = (page: PageDefinition) => {
    const { localization } = this.props;
    const { icon: Icon, getName, path } = page;
    return (
      <NavLink
        key={path}
        to={path}
        className="entry"
        isActive={isPageActive(page)}
      >
        <Icon />
        {getName(localization)}
      </NavLink>
    );
  };
}

export default connect(mapStateToProps)(Sidebar);
