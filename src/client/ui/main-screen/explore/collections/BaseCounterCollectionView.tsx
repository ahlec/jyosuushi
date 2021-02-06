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
import styles from "./BaseCounterCollectionView.scss";

interface ComponentProps {
  children: React.ReactNode;
  collection: StandardCounterCollection | UserCounterCollection;
}

function BaseCounterCollectionView({
  children,
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
      <div className={styles.pageArea}>{children}</div>
    </div>
  );
}

export default BaseCounterCollectionView;
