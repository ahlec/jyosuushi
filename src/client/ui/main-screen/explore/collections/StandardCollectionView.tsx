import React from "react";

import { StandardCounterCollection } from "@jyosuushi/graphql/types.generated";

import BaseCounterCollectionView from "./BaseCounterCollectionView";
import EntriesSection from "./entries-section/EntriesSection";

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
      <EntriesSection collection={collection} />
    </BaseCounterCollectionView>
  );
}

export default StandardCollectionView;
