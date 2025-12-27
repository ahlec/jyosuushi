import classnames from "classnames";
import * as React from "react";
import { defineMessages, FormattedMessage } from "react-intl";

import { Counter } from "@jyosuushi/interfaces";

import CounterTile from "@jyosuushi/ui/components/CounterTile";

import * as styles from "./CounterPreview.scss";

const INTL_MESSAGES = defineMessages({
  header: {
    defaultMessage:
      "{count, plural, one {# Counter} other {# Counters}} included",
    id: "preparePage.CounterPreview.header",
  },
});

interface ComponentProps {
  className: string;
  counters: readonly Counter[];
}

export default class CounterPreview extends React.PureComponent<ComponentProps> {
  public render(): React.ReactNode {
    const { className, counters } = this.props;

    if (!counters.length) {
      return null;
    }

    return (
      <div className={classnames(styles.counterPreview, className)}>
        <FormattedMessage
          {...INTL_MESSAGES.header}
          values={{
            count: counters.length,
          }}
          tagName="h3"
        />
        <div className={styles.counters}>
          {counters.map(this.renderCounter)}
        </div>
      </div>
    );
  }

  private renderCounter = (counter: Counter): React.ReactNode => {
    return <CounterTile key={counter.counterId} counter={counter} />;
  };
}
