import * as React from "react";
import { defineMessages } from "react-intl";
import { Redirect, RouteComponentProps } from "react-router-dom";

import { COUNTERS_LOOKUP } from "@data/counters";
import useLocale from "@jyosuushi/i18n/useLocale";

import { getPrimaryJapaneseRepresentation } from "@jyosuushi/utils";

import BreadcrumbBar from "@jyosuushi/ui/main-screen/explore/BreadcrumbBar";

import ConjugationsSection from "./ConjugationsSection";
import DisambiguationSection, {
  hasDisambiguationSection,
} from "./DisambiguationSection";
import FootnotesSection from "./FootnotesSection";
import InfoSection, { hasInfoSectionContents } from "./InfoSection";
import ItemsSection, { hasItemsSectionContents } from "./ItemsSection";
import SectionContainer from "./SectionContainer";

import styles from "./ExploreCounterPage.scss";

type ComponentProps = RouteComponentProps<{ counterId: string }>;

const INTL_MESSAGES = defineMessages({
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
  match: {
    params: { counterId },
  },
}: ComponentProps): React.ReactElement {
  // Find the counter based on the URL
  const counter = COUNTERS_LOOKUP[counterId] || null;

  // Connect to the rest of the app
  const locale = useLocale();

  // Redirect if the counter doesn't exist.
  if (!counter) {
    return <Redirect to="/explore" />;
  }

  // Render the component
  return (
    <div className={styles.exploreCounterPage}>
      <BreadcrumbBar />
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
