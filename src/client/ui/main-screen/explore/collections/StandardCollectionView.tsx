import React from "react";

import { StandardCounterCollection } from "@jyosuushi/graphql/types.generated";

import BaseCounterCollectionView from "./BaseCounterCollectionView";
import CountersTable from "./counters-table/CountersTable";
import EntriesCountIntro from "./EntriesCountIntro";

import styles from "./StandardCollectionView.scss";

interface ComponentProps {
  collection: StandardCounterCollection;
}

function StandardCollectionView({
  collection,
}: ComponentProps): React.ReactElement {
  return (
    <BaseCounterCollectionView collection={collection}>
      <div className={styles.container}>{collection.description}</div>
      <EntriesCountIntro numCounters={collection.counterIds.length} />
      <CountersTable collection={collection} />
    </BaseCounterCollectionView>
  );
}

export default StandardCollectionView;
