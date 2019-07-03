import * as React from "react";
import { Route, Switch } from "react-router-dom";

import Sidebar from "./Sidebar";

import { LANDING_PAGE, PageDefinition, UNORDERED_NESTED_PAGES } from "./pages";

import "./MainScreen.scss";

export default class MainScreen extends React.PureComponent {
  public render() {
    return (
      <div className="MainScreen">
        <Sidebar />
        <div className="content">
          <Switch>
            {UNORDERED_NESTED_PAGES.map(this.renderRoute)}
            {this.renderRoute(LANDING_PAGE)}
          </Switch>
        </div>
      </div>
    );
  }

  private renderRoute = ({ component, path }: PageDefinition) => {
    return <Route key={path} path={path || "/"} component={component} />;
  };
}
