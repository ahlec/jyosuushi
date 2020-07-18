import classnames from "classnames";
import * as React from "react";
import ReactModal from "react-modal";

import CloseIcon from "./close.svg";
import LeftIcon from "./left.svg";

import { PAGE_TRANSITION_DURATION_RAW } from "./MultiPageModal.scss";

const PAGE_TRANSITION_DURATION = parseInt(PAGE_TRANSITION_DURATION_RAW, 10);

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
  displaySubpage: boolean;
  isTransitioning: boolean;
  subpageData: TSubpageData | null;
}

export default class MultiPageModal<TSubpageData> extends React.Component<
  ComponentProps<TSubpageData>,
  ComponentState<TSubpageData>
> {
  public state: ComponentState<TSubpageData> = {
    displaySubpage: false,
    isTransitioning: false,
    subpageData: null,
  };
  private transitionTimeout = 0;
  private contentRef = React.createRef<HTMLDivElement>();
  private mainPageScrollTop = 0;

  public componentWillUnmount(): void {
    clearTimeout(this.transitionTimeout);
  }

  public render(): React.ReactNode {
    const {
      getSubpageHeader,
      isOpen,
      mainPageHeader,
      mainPageRenderer,
      subpageRenderer,
    } = this.props;
    const { displaySubpage, isTransitioning, subpageData } = this.state;
    return (
      <ReactModal
        className={classnames(
          "MultiPageModal",
          displaySubpage && subpageData && "subpage-open",
          isTransitioning && "transitioning"
        )}
        isOpen={isOpen}
        onRequestClose={this.onRequestClose}
      >
        <header>
          <div className="main-page">
            <div
              className={classnames(
                "button left",
                isTransitioning && "disabled"
              )}
              onClick={isTransitioning ? undefined : this.onRequestClose}
            >
              <CloseIcon />
            </div>
            {mainPageHeader}
          </div>
          <div className="sub-page">
            <div
              className={classnames(
                "button right",
                isTransitioning && "disabled"
              )}
              onClick={isTransitioning ? undefined : this.onLeaveSubpage}
            >
              <LeftIcon />
            </div>
            {subpageData ? getSubpageHeader(subpageData) : "-"}
            <div
              className={classnames(
                "button left",
                isTransitioning && "disabled"
              )}
              onClick={isTransitioning ? undefined : this.onRequestClose}
            >
              <CloseIcon />
            </div>
          </div>
        </header>
        <div ref={this.contentRef} className="content">
          <div className="main-page">
            {mainPageRenderer(
              !isTransitioning && !subpageData,
              this.openSubpage
            )}
          </div>
          <div className="sub-page">
            {subpageRenderer(!isTransitioning && !!subpageData, subpageData)}
          </div>
        </div>
      </ReactModal>
    );
  }

  private openSubpage = (data: TSubpageData): void => {
    if (this.contentRef.current) {
      this.mainPageScrollTop = this.contentRef.current.scrollTop;
      this.contentRef.current.scrollTop = 0;
    }

    window.clearTimeout(this.transitionTimeout);
    this.transitionTimeout = 0;
    this.setState({
      displaySubpage: true,
      isTransitioning: true,
      subpageData: data,
    });
    this.transitionTimeout = window.setTimeout(
      this.stopTransitioning,
      PAGE_TRANSITION_DURATION
    );
  };

  private onLeaveSubpage = (): void => {
    if (this.contentRef.current) {
      this.contentRef.current.scrollTop = this.mainPageScrollTop;
    }

    window.clearTimeout(this.transitionTimeout);
    this.transitionTimeout = 0;

    this.setState({ displaySubpage: false, isTransitioning: true });
    this.transitionTimeout = window.setTimeout(
      this.clearSubpageData,
      PAGE_TRANSITION_DURATION
    );
  };

  private stopTransitioning = (): void =>
    this.setState({ isTransitioning: false });

  private clearSubpageData = (): void =>
    this.setState({
      displaySubpage: false,
      isTransitioning: false,
      subpageData: null,
    });

  private onRequestClose = (): void => {
    const { isOpen, onRequestClose } = this.props;
    if (!isOpen) {
      return;
    }

    window.clearTimeout(this.transitionTimeout);
    this.transitionTimeout = 0;

    this.setState({
      displaySubpage: false,
      isTransitioning: false,
      subpageData: null,
    });
    onRequestClose();
  };
}
