import * as React from "react";

import PreparePage from "./prepare/PreparePage";
import Sidebar from "./Sidebar";

import "./MainScreen.scss";

export default class MainScreen extends React.PureComponent<{}> {
  public render() {
    return (
      <div className="MainScreen">
        <Sidebar />
        <div className="content">
          <PreparePage />
        </div>
      </div>
    );
  }
}
