import React, { useMemo } from "react";

import {
  CounterCollection,
  StandardCounterCollection,
  UserCounterCollection,
} from "@jyosuushi/graphql/types.generated";

import useAuthenticationStatus, {
  AuthenticationStatus,
} from "@jyosuushi/hooks/useAuthenticationStatus";

import AllCollections from "./AllCollections";
import AllCounters from "./AllCounters";
import BreadcrumbBar, {
  BreadcrumbBarLinkDefinition,
} from "@jyosuushi/ui/main-screen/explore/BreadcrumbBar";

import styles from "./LandingView.scss";

interface ComponentProps {
  standardCollections: readonly StandardCounterCollection[];
  userCollections: readonly UserCounterCollection[];
}

const BREADCRUMB_BAR_LINKS: readonly BreadcrumbBarLinkDefinition[] = [];

function LandingView({
  standardCollections,
  userCollections,
}: ComponentProps): React.ReactElement {
  // Connect with the rest of the app
  const authStatus = useAuthenticationStatus();

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
      <BreadcrumbBar links={BREADCRUMB_BAR_LINKS} />
      <div>
        <AllCollections
          canCreateCollections={
            authStatus === AuthenticationStatus.Authenticated
          }
          collections={collections}
          headerClassName={styles.header}
        />
        <AllCounters headerClassName={styles.header} />
      </div>
    </div>
  );
}

export default LandingView;
