import React, { useCallback, useMemo, useState } from "react";
import { defineMessages } from "react-intl";
import { useLocation } from "react-router-dom";

import {
  StandardCounterCollection,
  UserCounterCollection,
} from "@jyosuushi/graphql/types.generated";
import useLocale from "@jyosuushi/i18n/useLocale";

import { Counter } from "@jyosuushi/interfaces";
import { getPrimaryJapaneseRepresentation } from "@jyosuushi/utils";

import BreadcrumbBar, {
  BreadcrumbBarLinkDefinition,
} from "@jyosuushi/ui/main-screen/explore/BreadcrumbBar";
import {
  getCounterLink,
  getCounterCollectionPath,
} from "@jyosuushi/ui/main-screen/explore/pathing";
import { isExploreLocationState } from "@jyosuushi/ui/main-screen/explore/types";

import CollectionSection from "./collection-membership/CollectionSection";
import EditMembershipDialog from "./collection-membership/edit-membership-dialog/EditMembershipDialog";

import ConjugationsSection from "./ConjugationsSection";
import DisambiguationSection, {
  hasDisambiguationSection,
} from "./DisambiguationSection";
import FootnotesSection from "./FootnotesSection";
import InfoSection, { hasInfoSectionContents } from "./InfoSection";
import ItemsSection, { hasItemsSectionContents } from "./ItemsSection";
import SectionContainer, { SectionActionDefinition } from "./SectionContainer";

import PencilIcon from "./pencil.svg";

import styles from "./ExploreCounterPage.scss";

interface ComponentProps {
  counter: Counter;
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
  standardCollections,
  userCollections,
}: ComponentProps): React.ReactElement {
  // Connect to the rest of the app
  const locale = useLocale();
  const location = useLocation();

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
    (): void => setIsEditMembershipDialogOpen(false),
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

  // Render the component
  return (
    <div className={styles.exploreCounterPage}>
      <BreadcrumbBar links={breadcrumbLinks} />
      <div className={styles.contents}>
        <h3>{locale.dataLocalizers.getCounterName(counter)}</h3>
        <div className={styles.kanji}>
          {getPrimaryJapaneseRepresentation(counter)}
        </div>
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
          actions={membershipSectionActions}
          header={INTL_MESSAGES.headerCollections}
        >
          <CollectionSection
            counterId={counter.counterId}
            standardCollections={standardCollections}
            userCollections={userCollections}
          />
          <EditMembershipDialog
            counterId={counter.counterId}
            isOpen={isEditMembershipDialogOpen}
            onRequestClose={handleRequestEditMembershipDialogClose}
            userCollections={userCollections}
          />
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
