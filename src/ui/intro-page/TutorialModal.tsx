import classnames from "classnames";
import * as React from "react";

import Localization from "../../localization";

import Modal from "../Modal";

import "./TutorialWrapper.scss";

interface TutorialPage {
  text: string;
}

const PAGES: ReadonlyArray<TutorialPage> = [
  {
    text: "hello world"
  },
  {
    text: "then some more"
  },
  {
    text: "thanks for reading!"
  }
];

interface ComponentProps {
  isOpen: boolean;
  localization: Localization;
  onRequestClose: () => void;
}

interface ComponentState {
  currentPage: number;
  transitionDirection: "left" | "right" | null;
}

export default class TutorialWrapper extends React.PureComponent<
  ComponentProps,
  ComponentState
> {
  public state: ComponentState = {
    currentPage: 0,
    transitionDirection: null
  };

  public render() {
    const { isOpen, localization } = this.props;
    const { currentPage, transitionDirection } = this.state;
    const isChangingPage = transitionDirection !== null;

    return (
      <Modal
        className={classnames(
          "TutorialWrapper",
          transitionDirection && `transitioning-${transitionDirection}`
        )}
        header={localization.tutorial}
        isOpen={isOpen}
        onRequestClose={this.onRequestClose}
      >
        <div
          className={classnames(
            "left",
            !isChangingPage && currentPage > 0 && "enabled"
          )}
          onClick={this.onClickLeft}
        >
          {!isChangingPage && currentPage > 0 && "<"}
        </div>
        <div className="viewport">
          {transitionDirection && (
            <div className="previous">
              {this.renderPage(
                transitionDirection === "left"
                  ? currentPage + 1
                  : currentPage - 1
              )}
            </div>
          )}
          <div className="current">{this.renderPage(currentPage)}</div>
        </div>
        <div
          className={classnames(
            "right",
            !isChangingPage && currentPage < PAGES.length - 1 && "enabled"
          )}
          onClick={this.onClickRight}
        >
          {!isChangingPage && currentPage < PAGES.length - 1 && ">"}
        </div>
      </Modal>
    );
  }

  private renderPage = (pageNumber: number) => {
    return pageNumber;
  };

  private onClickLeft = () => {
    const { currentPage, transitionDirection } = this.state;
    if (transitionDirection !== null || currentPage <= 0) {
      return;
    }

    this.setState({
      currentPage: currentPage - 1,
      transitionDirection: "left"
    });
  };

  private onRequestClose = () => {
    const { onRequestClose } = this.props;
    this.setState({ currentPage: 0, transitionDirection: null });
    onRequestClose();
  };

  private onClickRight = () => {
    const { currentPage, transitionDirection } = this.state;
    if (transitionDirection !== null || currentPage >= PAGES.length - 1) {
      return;
    }

    this.setState({
      currentPage: currentPage + 1,
      transitionDirection: "right"
    });
  };
}
