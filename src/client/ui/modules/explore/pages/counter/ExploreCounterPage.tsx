import React, { useCallback, useMemo, useState } from "react";
import { defineMessages } from "react-intl";
import { Redirect, useLocation } from "react-router-dom";

import {
  StandardCounterCollection,
  UserCounterCollection,
} from "@jyosuushi/graphql/types.generated";
import useLocale from "@jyosuushi/i18n/useLocale";

import { Counter } from "@jyosuushi/interfaces";

import BreadcrumbBar, {
  BreadcrumbBarLinkDefinition,
} from "@jyosuushi/ui/modules/explore/components/breadcrumb-bar/BreadcrumbBar";
import {
  getCounterLink,
  getCounterCollectionPath,
} from "@jyosuushi/ui/modules/explore/pathing";
import { isExploreLocationState } from "@jyosuushi/ui/modules/explore/types";

import CollectionSection from "./collection-membership/CollectionSection";
import EditMembershipDialog from "./collection-membership/edit-membership-dialog/EditMembershipDialog";

import ConjugationsSection from "./ConjugationsSection";
import CounterHeader from "./CounterHeader";
import DisambiguationSection, {
  hasDisambiguationSection,
} from "./DisambiguationSection";
import FootnotesSection from "./FootnotesSection";
import InfoSection, { hasInfoSectionContents } from "./InfoSection";
import ItemsSection, { hasItemsSectionContents } from "./ItemsSection";
import SectionContainer, { SectionActionDefinition } from "./SectionContainer";
import { RedirectLocation } from "./types";

import PencilIcon from "@jyosuushi/ui/modules/explore/pencil.svg";

import styles from "./ExploreCounterPage.scss";

interface ComponentProps {
  counter: Counter;
  isLoggedIn: boolean;
  standardCollections: readonly StandardCounterCollection[];
  userCollections: readonly UserCounterCollection[];
}

const INTL_MESSAGES = defineMessages({
  headerCollections: {
    defaultMessage: "Collections",
    id: "explorePage.counter.collections.header",
  },
  headerConjugations: {
    defaultMessage: "Conjugations",
    id: "explorePage.counter.conjugations.header",
  },
  headerDisambiguation: {
    defaultMessage: "Similar Counters",
    id: "explorePage.counter.disambiguation.header",
  },
  headerFootnotes: {
    defaultMessage: "References",
    id: "explorePage.counter.footnotes.header",
  },
  headerInfo: {
    defaultMessage: "Details",
    id: "explorePage.counter.info.header",
  },
  headerItems: {
    defaultMessage: "Items",
    id: "explorePage.counter.items.header",
  },
  tooltipsEditMembershipAction: {
    defaultMessage: "Add or remove this counter from a custom collection.",
    id: "explorePage.counter.collections.actions.editMembershipTooltip",
  },
});

const NO_SECTION_ACTIONS: readonly SectionActionDefinition[] = [];

function ExploreCounterPage({
  counter,
  isLoggedIn,
  standardCollections,
  userCollections,
}: ComponentProps): React.ReactElement {
  // Connect to the rest of the app
  const locale = useLocale();
  const location = useLocation();

  // Define component state
  const [
    redirectRequest,
    setRedirectRequest,
  ] = useState<RedirectLocation | null>(null);

  // Handle editing collection membership
  const [isEditMembershipDialogOpen, setIsEditMembershipDialogOpen] = useState<
    boolean
  >(false);
  const membershipSectionActions = useMemo(
    (): readonly SectionActionDefinition[] => [
      {
        icon: PencilIcon,
        onClick: (): void => setIsEditMembershipDialogOpen(true),
        tooltip: INTL_MESSAGES.tooltipsEditMembershipAction,
        uniqueId: "edit",
      },
    ],
    []
  );

  const handleRequestEditMembershipDialogClose = useCallback(
    (redirectTo: RedirectLocation | null): void => {
      setIsEditMembershipDialogOpen(false);
      setRedirectRequest(redirectTo);
    },
    []
  );

  // Determine the links that should apear in the breadcrumb bar
  const breadcrumbLinks = useMemo((): readonly BreadcrumbBarLinkDefinition[] => {
    if (!counter) {
      return [];
    }

    const links: BreadcrumbBarLinkDefinition[] = [
      {
        entityName: locale.dataLocalizers.getCounterName(counter),
        entityType: "counter",
        link: getCounterLink(counter.counterId),
      },
    ];

    if (
      isExploreLocationState(location.state) &&
      location.state.fromCollection
    ) {
      links.unshift({
        entityName: location.state.fromCollection.name,
        entityType: "collection",
        link: getCounterCollectionPath(location.state.fromCollection.id),
      });
    }

    return links;
  }, [counter, locale, location.state]);

  // If we should be redirecting to another location, do so here.
  if (redirectRequest) {
    switch (redirectRequest) {
      case "explore-landing-page": {
        return <Redirect to="/explore" />;
      }
      case "profile": {
        return <Redirect to="/profile" />;
      }
      default: {
        return redirectRequest;
      }
    }
  }

  // Render the component
  return (
    <div className={styles.exploreCounterPage}>
      <div className={styles.breadcrumbContainer}>
        <BreadcrumbBar links={breadcrumbLinks} />
      </div>
      <CounterHeader counter={counter} />
      <div className={styles.contents}>
        {counter.leadIn && (
          <div className={styles.leadIn}>{counter.leadIn}</div>
        )}
        {hasInfoSectionContents(counter) && (
          <SectionContainer
            actions={NO_SECTION_ACTIONS}
            header={INTL_MESSAGES.headerInfo}
          >
            <InfoSection counter={counter} />
          </SectionContainer>
        )}
        <SectionContainer
          actions={NO_SECTION_ACTIONS}
          header={INTL_MESSAGES.headerConjugations}
        >
          <ConjugationsSection counter={counter} />
        </SectionContainer>
        {hasItemsSectionContents(counter) && (
          <SectionContainer
            actions={NO_SECTION_ACTIONS}
            header={INTL_MESSAGES.headerItems}
          >
            <ItemsSection counter={counter} />
          </SectionContainer>
        )}
        {hasDisambiguationSection(counter) && (
          <SectionContainer
            actions={NO_SECTION_ACTIONS}
            header={INTL_MESSAGES.headerDisambiguation}
          >
            <DisambiguationSection counter={counter} />
          </SectionContainer>
        )}
        <SectionContainer
          actions={isLoggedIn ? membershipSectionActions : NO_SECTION_ACTIONS}
          header={INTL_MESSAGES.headerCollections}
        >
          <CollectionSection
            counterId={counter.counterId}
            standardCollections={standardCollections}
            userCollections={userCollections}
          />
          {isLoggedIn && (
            <EditMembershipDialog
              counterId={counter.counterId}
              isOpen={isEditMembershipDialogOpen}
              onRequestClose={handleRequestEditMembershipDialogClose}
              userCollections={userCollections}
            />
          )}
        </SectionContainer>
        {counter.footnotes.length > 0 && (
          <SectionContainer
            actions={NO_SECTION_ACTIONS}
            header={INTL_MESSAGES.headerFootnotes}
          >
            <FootnotesSection footnotes={counter.footnotes} />
          </SectionContainer>
        )}
      </div>
    </div>
  );
}

export default ExploreCounterPage;
