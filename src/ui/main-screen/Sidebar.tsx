import { Location } from "history";
import { memoize } from "lodash";
import * as React from "react";
import { match as Match, NavLink } from "react-router-dom";

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

export default class Sidebar extends React.Component {
  public render() {
    return (
      <div className="Sidebar">
        {ORDERED_SIDEBAR_PAGES.map(this.renderLink)}
      </div>
    );
  }

  private renderLink = (page: PageDefinition) => {
    const { icon: Icon, name, path } = page;
    return (
      <NavLink
        key={path}
        to={path}
        className="entry"
        isActive={isPageActive(page)}
      >
        <Icon />
        {name}
      </NavLink>
    );
  };
}
