import React from "react";
import { defineMessages, FormattedMessage } from "react-intl";

import BreadcrumbBar from "@jyosuushi/ui/main-screen/explore/BreadcrumbBar";

import CounterRow from "./CounterRow";

import styles from "./CounterCollectionView.scss";

const INTL_MESSAGES = defineMessages({
  contentsIntro: {
    defaultMessage:
      "This collection contains <bold>{numCounters, plural, one {# counter} other {# counters}}</bold>:",
    id: "explorePage.collections.CounterCollectionView.contentsIntro",
  },
});

function FormattedMessageBold(
  chunks: readonly React.ReactNode[]
): React.ReactElement {
  return <strong className={styles.bold}>{chunks}</strong>;
}

import { CounterCollection } from "@jyosuushi/graphql/types.generated";

interface ComponentProps {
  collection: CounterCollection;
}

function CounterCollectionView({
  collection,
}: ComponentProps): React.ReactElement {
  return (
    <div className={styles.counterCollectionView}>
      <BreadcrumbBar />
      <h3 className={styles.collectionName}>{collection.name}</h3>
      <p className={styles.contentsIntro}>
        <FormattedMessage
          {...INTL_MESSAGES.contentsIntro}
          values={{
            bold: FormattedMessageBold,
            numCounters: collection.counterIds.length,
          }}
        />
      </p>
      <table className={styles.countersTable}>
        <tbody>
          {collection.counterIds.map(
            (counterId): React.ReactElement => (
              <CounterRow
                key={counterId}
                collectionId={collection.id}
                counterId={counterId}
              />
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CounterCollectionView;
