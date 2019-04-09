import classnames from "classnames";
import * as React from "react";
import ReactModal from "react-modal";

import CloseIcon from "./close.svg";
import LeftIcon from "./left.svg";

import { PAGE_TRANSITION_DURATION } from "./MultiPageModal.scss";
console.log(PAGE_TRANSITION_DURATION);

interface ComponentProps<TSubpageData> {
  getSubpageHeader: (data: TSubpageData) => string;
  isOpen: boolean;
  mainPageHeader: string;
  mainPageRenderer: (
    isActive: boolean,
    openSubpage: (data: TSubpageData) => void
  ) => React.ReactNode;
  subpageRenderer: (
    isActive: boolean,
    currentData: TSubpageData | null
  ) => React.ReactNode;
  onRequestClose: () => void;
}

interface ComponentState<TSubpageData> {
  subpageData: TSubpageData | null;
}

export default class MultiPageModal<TSubpageData> extends React.Component<
  ComponentProps<TSubpageData>,
  ComponentState<TSubpageData>
> {
  public state: ComponentState<TSubpageData> = {
    subpageData: null
  };

  public render() {
    const {
      getSubpageHeader,
      isOpen,
      mainPageHeader,
      mainPageRenderer,
      subpageRenderer
    } = this.props;
    const { subpageData } = this.state;
    return (
      <ReactModal
        className={classnames("MultiPageModal", subpageData && "subpage-open")}
        isOpen={isOpen}
        onRequestClose={this.onRequestClose}
      >
        <header>
          <div className="main-page">
            <div className="button left" onClick={this.onRequestClose}>
              <CloseIcon />
            </div>
            {mainPageHeader}
          </div>
          <div className="sub-page">
            <div className="button right" onClick={this.onLeaveSubpage}>
              <LeftIcon />
            </div>
            {subpageData ? getSubpageHeader(subpageData) : "-"}
            <div className="button left" onClick={this.onRequestClose}>
              <CloseIcon />
            </div>
          </div>
        </header>
        <div className="content">
          <div className="main-page">
            {mainPageRenderer(!subpageData, this.openSubpage)}
          </div>
          <div className="sub-page">
            {subpageRenderer(!!subpageData, subpageData)}
          </div>
        </div>
      </ReactModal>
    );
  }

  private openSubpage = (data: TSubpageData) =>
    this.setState({ subpageData: data });

  private onLeaveSubpage = () => this.setState({ subpageData: null });

  private onRequestClose = () => {
    const { isOpen, onRequestClose } = this.props;
    if (!isOpen) {
      return;
    }

    this.setState({ subpageData: null });
    onRequestClose();
  };
}
