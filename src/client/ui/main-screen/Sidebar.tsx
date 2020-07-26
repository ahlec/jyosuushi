import { Location } from "history";
import { memoize } from "lodash";
import * as React from "react";
import { FormattedMessage } from "react-intl";
import { match as Match, NavLink } from "react-router-dom";

import { LANDING_PAGE, ORDERED_SIDEBAR_PAGES, PageDefinition } from "./pages";

import styles from "./Sidebar.scss";

const isPageActive = memoize(
  (page: PageDefinition) => (
    match: Match | null,
    { pathname }: Location
  ): boolean => {
    if (match && match.url) {
      return true;
    }

    if (pathname === "/" && page === LANDING_PAGE) {
      return true;
    }

    return false;
  }
);

class Sidebar extends React.Component<unknown> {
  public render(): React.ReactNode {
    return (
      <div className={styles.sidebar}>
        {ORDERED_SIDEBAR_PAGES.map(this.renderLink)}
      </div>
    );
  }

  private renderLink = (page: PageDefinition): React.ReactNode => {
    const { icon: Icon, name, path } = page;
    return (
      <NavLink
        key={path}
        to={path}
        className={styles.entry}
        activeClassName={styles.active}
        isActive={isPageActive(page)}
      >
        <Icon />
        <FormattedMessage {...name} />
      </NavLink>
    );
  };
}

export default Sidebar;
