import React, { useMemo } from "react";

import { CounterCollection } from "@jyosuushi/graphql/types.generated";

import BreadcrumbBar, {
  BreadcrumbBarLinkDefinition,
} from "@jyosuushi/ui/main-screen/explore/BreadcrumbBar";
import { getCounterCollectionPath } from "@jyosuushi/ui/main-screen/explore/pathing";

import CollectionHeader from "./CollectionHeader";
import EntriesSection from "./entries-section/EntriesSection";

import styles from "./CounterCollectionView.scss";

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
      <CollectionHeader collection={collection} />
      <div className={styles.pageArea}>
        <EntriesSection collection={collection} />
      </div>
    </div>
  );
}

export default CounterCollectionView;
