import classnames from "classnames";
import * as React from "react";

import "./index.scss";

interface ComponentState {
  isOpen: boolean;
}

export default class HistoryPanel extends React.PureComponent<
  {},
  ComponentState
> {
  public state: ComponentState = {
    isOpen: false
  };

  public render() {
    const { isOpen } = this.state;
    return (
      <div className={classnames("HistoryPanel", isOpen && "open")}>
        <div className="tab" onClick={this.onClickTab}>
          History Panel
        </div>
        stuff here
      </div>
    );
  }

  private onClickTab = () => this.setState({ isOpen: !this.state.isOpen });
}
