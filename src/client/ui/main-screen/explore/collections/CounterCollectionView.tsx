import React, { useMemo } from "react";

import {
  StandardCounterCollection,
  UserCounterCollection,
} from "@jyosuushi/graphql/types.generated";

import BreadcrumbBar, {
  BreadcrumbBarLinkDefinition,
} from "@jyosuushi/ui/main-screen/explore/BreadcrumbBar";
import { getCounterCollectionPath } from "@jyosuushi/ui/main-screen/explore/pathing";

import CollectionHeader from "./CollectionHeader";
import EntriesSection from "./entries-section/EntriesSection";
import StandardCollectionContent from "./StandardCollectionContent";
import UserCollectionContent from "./UserCollectionContent";

import styles from "./CounterCollectionView.scss";

function isUserCollection(
  collection: StandardCounterCollection | UserCounterCollection
): collection is UserCounterCollection {
  return "dateCreated" in collection;
}

interface ComponentProps {
  collection: StandardCounterCollection | UserCounterCollection;
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
        {isUserCollection(collection) ? (
          <UserCollectionContent
            className={styles.collectionContent}
            collection={collection}
          />
        ) : (
          <StandardCollectionContent
            className={styles.collectionContent}
            collection={collection}
          />
        )}
        <EntriesSection collection={collection} />
      </div>
    </div>
  );
}

export default CounterCollectionView;
