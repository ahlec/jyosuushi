import * as React from "react";
import CSSTransition, {
  CSSTransitionClassNames
} from "react-transition-group/CSSTransition";

import IconCollapse from "./collapse.svg";
import IconExpand from "./expand.svg";

import "./CollapsibleSection.scss";

// Not having any of these classes should be the same as "expanded"
// because `appear` will only be applied if the `in` prop is true,
// and during initial mount if we're not collapsed, no class gets
// added.
const CLASS_NAMES: CSSTransitionClassNames = {
  appearDone: "collapsed",
  enterActive: "collapsing",
  enterDone: "collapsed",
  exitActive: "expanding",
  exitDone: "expanded"
};

interface ComponentProps {
  children?: React.ReactNode;
  header: string;
  isInitiallyCollapsed?: boolean;
}

interface ComponentState {
  isCollapsed: boolean;
  contentsHeightTransition: number | null;
}

export default class CollapsibleSection extends React.PureComponent<
  ComponentProps,
  ComponentState
> {
  private readonly contentsRef = React.createRef<HTMLDivElement>();

  public constructor(props: ComponentProps) {
    super(props);

    this.state = {
      contentsHeightTransition: null,
      isCollapsed: !!props.isInitiallyCollapsed
    };
  }

  public render() {
    const { children, header } = this.props;
    const { contentsHeightTransition, isCollapsed } = this.state;
    return (
      <CSSTransition
        classNames={CLASS_NAMES}
        timeout={200}
        appear={true}
        in={isCollapsed}
        onEnter={this.transitionToScrollHeight}
        onEntering={this.transitionToZero}
        onEntered={this.clearTransitionHeight}
        onExit={this.transitionToZero}
        onExiting={this.transitionToScrollHeight}
        onExited={this.clearTransitionHeight}
      >
        <div className="CollapsibleSection">
          <div className="header">
            <div className="toggle-button" onClick={this.onClickToggle}>
              <IconExpand className="expand" />
              <IconCollapse className="collapse" />
            </div>
            {header}
          </div>
          <div
            ref={this.contentsRef}
            className="contents"
            style={
              contentsHeightTransition !== null
                ? {
                    height: contentsHeightTransition
                  }
                : undefined
            }
          >
            {children}
          </div>
        </div>
      </CSSTransition>
    );
  }

  private transitionToScrollHeight = () => {
    const { current: contentsDiv } = this.contentsRef;
    if (!contentsDiv) {
      return;
    }

    const paddingTop = parseFloat(
      window.getComputedStyle(contentsDiv, null).getPropertyValue("padding-top")
    );
    const paddingBottom = parseFloat(
      window
        .getComputedStyle(contentsDiv, null)
        .getPropertyValue("padding-bottom")
    );

    this.setState({
      contentsHeightTransition: Math.max(
        0,
        contentsDiv.scrollHeight - paddingTop - paddingBottom
      )
    });
  };

  private transitionToZero = () =>
    this.setState({ contentsHeightTransition: 0 });

  private clearTransitionHeight = () =>
    this.setState({ contentsHeightTransition: null });

  private onClickToggle = () =>
    this.setState({ isCollapsed: !this.state.isCollapsed });
}
