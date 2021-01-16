import React, { useMemo } from "react";
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

import ConjugationsSection from "./ConjugationsSection";
import DisambiguationSection, {
  hasDisambiguationSection,
} from "./DisambiguationSection";
import FootnotesSection from "./FootnotesSection";
import InfoSection, { hasInfoSectionContents } from "./InfoSection";
import ItemsSection, { hasItemsSectionContents } from "./ItemsSection";
import SectionContainer from "./SectionContainer";

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
});

function ExploreCounterPage({
  counter,
  standardCollections,
  userCollections,
}: ComponentProps): React.ReactElement {
  // Connect to the rest of the app
  const locale = useLocale();
  const location = useLocation();

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
          <SectionContainer header={INTL_MESSAGES.headerInfo}>
            <InfoSection counter={counter} />
          </SectionContainer>
        )}
        <SectionContainer header={INTL_MESSAGES.headerConjugations}>
          <ConjugationsSection counter={counter} />
        </SectionContainer>
        {hasItemsSectionContents(counter) && (
          <SectionContainer header={INTL_MESSAGES.headerItems}>
            <ItemsSection counter={counter} />
          </SectionContainer>
        )}
        {hasDisambiguationSection(counter) && (
          <SectionContainer header={INTL_MESSAGES.headerDisambiguation}>
            <DisambiguationSection counter={counter} />
          </SectionContainer>
        )}
        <SectionContainer header={INTL_MESSAGES.headerCollections}>
          <CollectionSection
            counterId={counter.counterId}
            standardCollections={standardCollections}
            userCollections={userCollections}
          />
        </SectionContainer>
        {counter.footnotes.length > 0 && (
          <SectionContainer header={INTL_MESSAGES.headerFootnotes}>
            <FootnotesSection footnotes={counter.footnotes} />
          </SectionContainer>
        )}
      </div>
    </div>
  );
}

export default ExploreCounterPage;
