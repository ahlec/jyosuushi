import * as React from "react";

import { Counter } from "../../../../interfaces";
import Localization from "../../../../localization";

import "./InfoSection.scss";

interface ComponentProps {
  counter: Counter;
  localization: Localization;
}

export default class InfoSection extends React.PureComponent<ComponentProps> {
  public render() {
    const { counter } = this.props;

    if (!counter.notes) {
      return null;
    }

    return (
      <section className="InfoSection">
        <p
          className="notes"
          dangerouslySetInnerHTML={{ __html: counter.notes }}
        />
      </section>
    );
  }
}
