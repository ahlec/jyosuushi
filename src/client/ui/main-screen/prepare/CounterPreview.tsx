import classnames from "classnames";
import { memoize } from "lodash";
import * as React from "react";
import { defineMessages, FormattedMessage } from "react-intl";

import { Counter, StudyPack } from "@jyosuushi/interfaces";
import { getDistinctCounters } from "@jyosuushi/utils";

import CounterTile from "@jyosuushi/ui/main-screen/CounterTile";

import styles from "./CounterPreview.scss";

const getCountersForPacks = memoize(
  (packs: ReadonlyArray<StudyPack>) => getDistinctCounters(packs),
  (packs: ReadonlyArray<StudyPack>) =>
    JSON.stringify(packs.map(({ packId }) => packId))
);

const INTL_MESSAGES = defineMessages({
  header: {
    defaultMessage:
      "{count, plural, one {# Counter} other {# Counters}} included",
    id: "preparePage.CounterPreview.header",
  },
});

interface ComponentProps {
  className?: string;
  packs: ReadonlyArray<StudyPack>;
}

export default class CounterPreview extends React.PureComponent<
  ComponentProps
> {
  public render(): React.ReactNode {
    const { className, packs } = this.props;
    const counters = getCountersForPacks(packs);

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
