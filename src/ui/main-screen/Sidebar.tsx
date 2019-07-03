import * as React from "react";
import { NavLink } from "react-router-dom";

import { ORDERED_SIDEBAR_PAGES, PageDefinition } from "./pages";

import "./Sidebar.scss";

export default class Sidebar extends React.Component {
  public render() {
    return (
      <div className="Sidebar">
        {ORDERED_SIDEBAR_PAGES.map(this.renderLink)}
      </div>
    );
  }

  private renderLink = ({ path }: PageDefinition) => {
    return (
      <NavLink key={path} to={path}>
        hi
      </NavLink>
    );
  };
}
