import React from "react";

import {
  UserCounterCollection,
  UserCounterCollectionManager,
} from "@jyosuushi/interfaces";

import AllCollections from "./AllCollections";
import AllCounters from "./AllCounters";
import BreadcrumbBar, {
  BreadcrumbBarLinkDefinition,
} from "@jyosuushi/ui/modules/explore/components/breadcrumb-bar/BreadcrumbBar";

import styles from "./LandingView.scss";

interface ComponentProps {
  userCollections: readonly UserCounterCollection[];
  userCollectionsManager: UserCounterCollectionManager;
}

const BREADCRUMB_BAR_LINKS: readonly BreadcrumbBarLinkDefinition[] = [];

function LandingView({
  userCollections,
  userCollectionsManager,
}: ComponentProps): React.ReactElement {
  // Render the component
  return (
    <div className={styles.page}>
      <div className={styles.breadcrumbContainer}>
        <BreadcrumbBar links={BREADCRUMB_BAR_LINKS} />
      </div>
      <div>
        <AllCollections
          headerClassName={styles.header}
          userCollections={userCollections}
          userCollectionsManager={userCollectionsManager}
        />
        <AllCounters headerClassName={styles.header} />
      </div>
    </div>
  );
}

export default LandingView;
