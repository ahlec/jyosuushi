import React, { useMemo } from "react";
import { defineMessages, FormattedMessage } from "react-intl";

import BreadcrumbBar, {
  BreadcrumbBarLinkDefinition,
} from "@jyosuushi/ui/main-screen/explore/BreadcrumbBar";
import { getCounterCollectionPath } from "@jyosuushi/ui/main-screen/explore/pathing";

import EntriesSection from "./entries-section/EntriesSection";

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
  // Prepare the links to appear in the breadcrumb bar
  const breadcrumbLinks = useMemo(
    (): readonly BreadcrumbBarLinkDefinition[] => [
      {
        entityName: collection.name,
        entityType: "collection",
        link: getCounterCollectionPath(collection.id),
      },
    ],
    [collection.id, collection.name]
  );

  // Render the component
  return (
    <div className={styles.counterCollectionView}>
      <div className={styles.breadcrumbContainer}>
        <BreadcrumbBar links={breadcrumbLinks} />
      </div>
      <h3 className={styles.collectionName}>{collection.name}</h3>
      <div className={styles.pageArea}>
        <p className={styles.contentsIntro}>
          <FormattedMessage
            {...INTL_MESSAGES.contentsIntro}
            values={{
              bold: FormattedMessageBold,
              numCounters: collection.counterIds.length,
            }}
          />
        </p>
        <EntriesSection collection={collection} />
      </div>
    </div>
  );
}

export default CounterCollectionView;
