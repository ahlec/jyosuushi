import React from "react";

import {
  StandardCounterCollection,
  UserCounterCollection,
} from "@jyosuushi/graphql/types.generated";

import AllCounters from "./AllCounters";
import AllStudyPacks from "./AllStudyPacks";
import BreadcrumbBar from "@jyosuushi/ui/main-screen/explore/BreadcrumbBar";

import styles from "./LandingView.scss";

interface ComponentProps {
  standardCollections: readonly StandardCounterCollection[];
  userCollections: readonly UserCounterCollection[];
}

function LandingView({
  standardCollections,
  userCollections,
}: ComponentProps): React.ReactElement {
  // Render the component
  return (
    <div>
      <BreadcrumbBar />
      <div>
        <AllStudyPacks headerClassName={styles.header} />
        <AllCounters headerClassName={styles.header} />
      </div>
    </div>
  );
}

export default LandingView;
