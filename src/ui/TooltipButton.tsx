import * as React from "react";
import ReactTooltip from "react-tooltip";

import "./TooltipButton.scss";

interface ComponentProps {
  enabled: boolean;
  icon: React.ComponentClass<React.SVGProps<SVGSVGElement>>;
  onClick: (event: React.MouseEvent) => void;
  text: string;
}

interface ComponentState {
  tooltipVisible: boolean;
}

export default class TooltipButton extends React.PureComponent<
  ComponentProps,
  ComponentState
> {
  public state: ComponentState = {
    tooltipVisible: false
  };

  public render() {
    const { icon: Icon, text } = this.props;
    const id = `tb-${text}`;
    return (
      <div
        className="TooltipButton"
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
        onClick={this.onClick}
      >
        <Icon data-tip data-for={id} />
        <ReactTooltip id={id} place="bottom" type="dark" effect="solid">
          {text}
        </ReactTooltip>
      </div>
    );
  }

  private onMouseOver = () => {
    const { enabled } = this.props;
    if (!enabled) {
      return;
    }

    this.setState({ tooltipVisible: true });
  };
  private onMouseOut = () => this.setState({ tooltipVisible: false });
  private onClick = (event: React.MouseEvent) => {
    const { onClick } = this.props;
    this.setState({ tooltipVisible: false });
    onClick(event);
  };
}
