import classnames from "classnames";
import * as React from "react";

import Localization from "../../localization";

import Modal from "../Modal";

import LeftIcon from "../left.svg";
import RightIcon from "../right.svg";

import KyotoJpg from "./tutorial/kyoto.jpg";

import "./TutorialWrapper.scss";

const KEYCODE_LEFT_ARROW = 37;
const KEYCODE_RIGHT_ARROW = 39;

interface TutorialPage {
  image: string;
  text: string;
}

const PAGES: ReadonlyArray<TutorialPage> = [
  {
    image: KyotoJpg,
    text: "hello world"
  },
  {
    image: KyotoJpg,
    text: "then some more"
  },
  {
    image: KyotoJpg,
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

  public componentDidMount() {
    window.addEventListener("keydown", this.onKeyDown);
  }

  public componentWillUnmount() {
    window.removeEventListener("keydown", this.onKeyDown);
  }

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
          <LeftIcon />
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
          <div className="current" onAnimationEnd={this.onAnimationEnd}>
            {this.renderPage(currentPage)}
          </div>
        </div>
        <div
          className={classnames(
            "right",
            !isChangingPage && currentPage < PAGES.length - 1 && "enabled"
          )}
          onClick={this.onClickRight}
        >
          <RightIcon />
        </div>
      </Modal>
    );
  }

  private renderPage = (pageNumber: number) => {
    const { image, text } = PAGES[pageNumber];
    return (
      <React.Fragment>
        <div className="picture">
          <img src={image} />
        </div>
        <div className="text">{text}</div>
      </React.Fragment>
    );
  };

  private onKeyDown = (event: KeyboardEvent) => {
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

  private onAnimationEnd = ({ animationName }: React.AnimationEvent) => {
    const { transitionDirection } = this.state;
    let finishesTransition = false;
    switch (animationName) {
      case "transition-left-current": {
        finishesTransition = transitionDirection === "left";
        break;
      }
      case "transition-right-current": {
        finishesTransition = transitionDirection === "right";
        break;
      }
    }

    if (finishesTransition) {
      this.setState({
        transitionDirection: null
      });
    }
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
