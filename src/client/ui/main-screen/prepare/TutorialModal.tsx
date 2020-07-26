import classnames from "classnames";
import { memoize } from "lodash";
import * as React from "react";
import { defineMessages, FormattedMessage } from "react-intl";

import { KeyCode } from "@jyosuushi/constants";

import Modal from "@jyosuushi/ui/Modal";

import LeftIcon from "@jyosuushi/ui/left.svg";
import RightIcon from "@jyosuushi/ui/right.svg";

import { TUTORIAL_PAGES } from "./tutorial";

import styles from "./TutorialModal.scss";

interface ComponentProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

interface ComponentState {
  currentPage: number;
  previousPage: number;
  transition: Transition | null;
}

type Transition = "left" | "right" | "replace";

const TRANSITION_TO_CSS_CLASS_NAMES: { [transition in Transition]: string } = {
  left: styles.transitioningLeft,
  replace: styles.transitioningReplace,
  right: styles.transitioningRight,
};

const INTL_MESSAGES = defineMessages({
  modalHeader: {
    defaultMessage: "Tutorial",
    id: "mainScreen.tutorial.modalHeader",
  },
});

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

  private handleNavigationButtonKeyPress = memoize(
    (direction: "left" | "right") => (
      e: React.KeyboardEvent<HTMLDivElement>
    ): void => {
      if (e.which !== KeyCode.Enter && e.which !== KeyCode.Space) {
        return;
      }

      switch (direction) {
        case "left": {
          this.onClickLeft();
          break;
        }
        case "right": {
          this.onClickRight();
          break;
        }
      }
    }
  );

  public componentDidMount(): void {
    window.addEventListener("keydown", this.onKeyDown);
  }

  public componentWillUnmount(): void {
    window.removeEventListener("keydown", this.onKeyDown);
  }

  public render(): React.ReactNode {
    const { isOpen } = this.props;
    const { currentPage, previousPage, transition } = this.state;
    const isChangingPage = transition !== null;

    const isLeftButtonEnabled = !isChangingPage && currentPage > 0;
    const isRightButtonEnabled =
      !isChangingPage && currentPage < TUTORIAL_PAGES.length - 1;
    return (
      <Modal
        className={classnames(
          styles.tutorialModal,
          transition && TRANSITION_TO_CSS_CLASS_NAMES[transition]
        )}
        contentClassName={styles.content}
        header={INTL_MESSAGES.modalHeader}
        isOpen={isOpen}
        onRequestClose={this.onRequestClose}
      >
        <div
          className={classnames(
            styles.left,
            !isChangingPage && currentPage > 0 && styles.enabled
          )}
          onClick={this.onClickLeft}
          onKeyPress={this.handleNavigationButtonKeyPress("left")}
          role="button"
          tabIndex={isLeftButtonEnabled ? 0 : undefined}
        >
          <LeftIcon />
        </div>
        <div className={styles.viewport}>
          {transition && (
            <div className={styles.previous}>
              {this.renderPage(previousPage)}
            </div>
          )}
          <div className={styles.current} onAnimationEnd={this.onAnimationEnd}>
            {this.renderPage(currentPage)}
          </div>
        </div>
        <div
          className={classnames(
            styles.right,
            isRightButtonEnabled && styles.enabled
          )}
          onClick={this.onClickRight}
          onKeyPress={this.handleNavigationButtonKeyPress("right")}
          role="button"
          tabIndex={isRightButtonEnabled ? 0 : undefined}
        >
          <RightIcon />
        </div>
      </Modal>
    );
  }

  private renderPage = (pageNumber: number): React.ReactNode => {
    const page = TUTORIAL_PAGES[pageNumber];
    return (
      <React.Fragment>
        <div className={styles.picture}>
          <img src={page.image} alt="" />
        </div>
        <div className={styles.text}>
          <FormattedMessage {...page.text} />
        </div>
        <div className={styles.navigation}>
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
          styles.navigationLink,
          linkedPageNumber === onPageNumber && styles.active
        )}
        viewBox="0 0 10 10"
        onClick={this.onClickPageLink(linkedPageNumber)}
      >
        <circle cx="5" cy="5" r="5" />{" "}
      </svg>
    );
  };

  private onKeyDown = (event: KeyboardEvent): void => {
    switch (event.which) {
      case KeyCode.LeftArrow: {
        this.onClickLeft();
        break;
      }
      case KeyCode.RightArrow: {
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
      case styles.transitionLeftCurrent: {
        finishesTransition = transition === "left";
        break;
      }
      case styles.transitionRightCurrent: {
        finishesTransition = transition === "right";
        break;
      }
      case styles.transitionReplaceCurrent: {
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
