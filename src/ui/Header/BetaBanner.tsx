import * as React from "react";

import Localization from "../../localization";

import "./BetaBanner.scss";

interface ComponentProps {
  localization: Localization;
}

export default class BetaBanner extends React.PureComponent<ComponentProps> {
  public render() {
    const { localization } = this.props;
    return <div className="BetaBanner">{localization.beta}</div>;
  }
}
