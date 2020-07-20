import classnames from "classnames";
import { memoize } from "lodash";
import * as React from "react";

import { Counter, StudyPack } from "@jyosuushi/interfaces";
import Localization from "@jyosuushi/localization";
import { getDistinctCounters } from "@jyosuushi/utils";

import CounterTile from "@jyosuushi/ui/main-screen/CounterTile";

import styles from "./CounterPreview.scss";

const getCountersForPacks = memoize(
  (packs: ReadonlyArray<StudyPack>) => getDistinctCounters(packs),
  (packs: ReadonlyArray<StudyPack>) =>
    JSON.stringify(packs.map(({ packId }) => packId))
);

interface ComponentProps {
  className?: string;
  localization: Localization;
  packs: ReadonlyArray<StudyPack>;
}

export default class CounterPreview extends React.PureComponent<
  ComponentProps
> {
  public render(): React.ReactNode {
    const { className, localization, packs } = this.props;
    const counters = getCountersForPacks(packs);

    if (!counters.length) {
      return null;
    }

    return (
      <div className={classnames(styles.counterPreview, className)}>
        <h3>{localization.countersDisplayHeader(counters.length)}</h3>
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
