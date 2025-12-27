import React from "react";

import {
  CreateUserCounterCollectionFn,
  UserCounterCollection,
} from "@jyosuushi/interfaces";

import AllCollections from "./AllCollections";
import AllCounters from "./AllCounters";
import BreadcrumbBar, {
  BreadcrumbBarLinkDefinition,
} from "@jyosuushi/ui/modules/explore/components/breadcrumb-bar/BreadcrumbBar";

import * as styles from "./LandingView.scss";

interface ComponentProps {
  createUserCollection: CreateUserCounterCollectionFn;
  userCollections: readonly UserCounterCollection[];
}

const BREADCRUMB_BAR_LINKS: readonly BreadcrumbBarLinkDefinition[] = [];

function LandingView({
  createUserCollection,
  userCollections,
}: ComponentProps): React.ReactElement {
  // Render the component
  return (
    <div className={styles.page}>
      <div className={styles.breadcrumbContainer}>
        <BreadcrumbBar links={BREADCRUMB_BAR_LINKS} />
      </div>
      <div>
        <AllCollections
          createUserCollection={createUserCollection}
          headerClassName={styles.header}
          userCollections={userCollections}
        />
        <AllCounters headerClassName={styles.header} />
      </div>
    </div>
  );
}

export default LandingView;
