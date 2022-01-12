import React from "react";

import { StandardCounterCollection } from "@jyosuushi/interfaces";

import BaseCounterCollectionView from "./BaseCounterCollectionView";
import LinkedCollectionContentsTable from "./counters-table/LinkedCollectionContentsTable";
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
      <LinkedCollectionContentsTable collection={collection} />
    </BaseCounterCollectionView>
  );
}

export default StandardCollectionView;
