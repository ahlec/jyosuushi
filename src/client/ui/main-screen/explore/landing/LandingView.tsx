import React, { useMemo } from "react";

import {
  CounterCollection,
  StandardCounterCollection,
  UserCounterCollection,
} from "@jyosuushi/graphql/types.generated";

import AllCollections from "./AllCollections";
import AllCounters from "./AllCounters";
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
  // Coerce the data as necessary
  const collections = useMemo(
    (): readonly CounterCollection[] => [
      ...standardCollections,
      ...userCollections,
    ],
    [standardCollections, userCollections]
  );

  // Render the component
  return (
    <div>
      <BreadcrumbBar />
      <div>
        <AllCollections
          collections={collections}
          headerClassName={styles.header}
        />
        <AllCounters headerClassName={styles.header} />
      </div>
    </div>
  );
}

export default LandingView;
