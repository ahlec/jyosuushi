import classnames from "classnames";
import { memoize } from "lodash";
import * as React from "react";

import Localization from "@jyosuushi/localization";

import Modal from "@jyosuushi/ui/Modal";

import LeftIcon from "@jyosuushi/ui/left.svg";
import RightIcon from "@jyosuushi/ui/right.svg";

import { TUTORIAL_PAGES } from "./tutorial";

import "./TutorialModal.scss";

const KEYCODE_LEFT_ARROW = 37;
const KEYCODE_RIGHT_ARROW = 39;

interface ComponentProps {
  isOpen: boolean;
  localization: Localization;
  onRequestClose: () => void;
}

interface ComponentState {
  currentPage: number;
  previousPage: number;
  transition: "left" | "right" | "replace" | null;
}

export default class TutorialModal extends React.PureComponent<
  ComponentProps,
  ComponentState
> {
  public state: ComponentState = {
    currentPage: 0,
    previousPage: 0,
    transition: null,
  };
  private onClickPageLink = memoize((pageNumber) => (): void => {
    const { currentPage, transition } = this.state;
    if (
      transition !== null ||
      pageNumber < 0 ||
      pageNumber >= TUTORIAL_PAGES.length ||
      pageNumber === currentPage
    ) {
      return;
    }

    this.setState({
      currentPage: pageNumber,
      previousPage: currentPage,
      transition: "replace",
    });
  });

  public componentDidMount(): void {
    window.addEventListener("keydown", this.onKeyDown);
  }

  public componentWillUnmount(): void {
    window.removeEventListener("keydown", this.onKeyDown);
  }

  public render(): React.ReactNode {
    const { isOpen, localization } = this.props;
    const { currentPage, previousPage, transition } = this.state;
    const isChangingPage = transition !== null;

    return (
      <Modal
        className={classnames(
          "TutorialModal",
          transition && `transitioning-${transition}`
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
          <LeftIcon />
        </div>
        <div className="viewport">
          {transition && (
            <div className="previous">{this.renderPage(previousPage)}</div>
          )}
          <div className="current" onAnimationEnd={this.onAnimationEnd}>
            {this.renderPage(currentPage)}
          </div>
        </div>
        <div
          className={classnames(
            "right",
            !isChangingPage &&
              currentPage < TUTORIAL_PAGES.length - 1 &&
              "enabled"
          )}
          onClick={this.onClickRight}
        >
          <RightIcon />
        </div>
      </Modal>
    );
  }

  private renderPage = (pageNumber: number): React.ReactNode => {
    const { localization } = this.props;
    const page = TUTORIAL_PAGES[pageNumber];
    return (
      <React.Fragment>
        <div className="picture">
          <img src={page.image} />
        </div>
        <div className="text">{page.getText(localization)}</div>
        <div className="navigation">
          {TUTORIAL_PAGES.map((_, index) =>
            this.renderNavigationLink(pageNumber, index)
          )}
        </div>
      </React.Fragment>
    );
  };

  private renderNavigationLink = (
    onPageNumber: number,
    linkedPageNumber: number
  ): React.ReactNode => {
    return (
      <svg
        key={linkedPageNumber}
        className={classnames(
          "navigation-link",
          linkedPageNumber === onPageNumber && "active"
        )}
        viewBox="0 0 10 10"
        onClick={this.onClickPageLink(linkedPageNumber)}
      >
        <circle cx="5" cy="5" r="5" />{" "}
      </svg>
    );
  };

  private onKeyDown = (event: KeyboardEvent): void => {
    switch (event.keyCode) {
      case KEYCODE_LEFT_ARROW: {
        this.onClickLeft();
        break;
      }
      case KEYCODE_RIGHT_ARROW: {
        this.onClickRight();
        break;
      }
    }
  };

  private onClickLeft = (): void => {
    const { currentPage, transition } = this.state;
    if (transition !== null || currentPage <= 0) {
      return;
    }

    this.setState({
      currentPage: currentPage - 1,
      previousPage: currentPage,
      transition: "right",
    });
  };

  private onAnimationEnd = ({ animationName }: React.AnimationEvent): void => {
    const { transition } = this.state;
    let finishesTransition = false;
    switch (animationName) {
      case "transition-left-current": {
        finishesTransition = transition === "left";
        break;
      }
      case "transition-right-current": {
        finishesTransition = transition === "right";
        break;
      }
      case "transition-replace-current": {
        finishesTransition = transition === "replace";
        break;
      }
    }

    if (finishesTransition) {
      this.setState({
        transition: null,
      });
    }
  };

  private onRequestClose = (): void => {
    const { onRequestClose } = this.props;
    this.setState({ currentPage: 0, previousPage: 0, transition: null });
    onRequestClose();
  };

  private onClickRight = (): void => {
    const { currentPage, transition } = this.state;
    if (transition !== null || currentPage >= TUTORIAL_PAGES.length - 1) {
      return;
    }

    this.setState({
      currentPage: currentPage + 1,
      previousPage: currentPage,
      transition: "left",
    });
  };
}
