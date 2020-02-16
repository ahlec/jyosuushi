import * as React from "react";

import Header from "./Header";
import MainScreen from "./main-screen/MainScreen";

import "./Application.scss";

export default class Application extends React.PureComponent {
  public render() {
    return (
      <div className="Application">
        <Header />
        <MainScreen />
      </div>
    );
  }
}
