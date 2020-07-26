import * as React from "react";
import { defineMessages, FormattedMessage } from "react-intl";
import { NavLink, RouteComponentProps, withRouter } from "react-router-dom";

import { COUNTERS_LOOKUP } from "@data/counters";
import { STUDY_PACK_LOOKUP } from "@data/studyPacks";

import { Locale } from "@jyosuushi/i18n/types";
import useLocale from "@jyosuushi/i18n/useLocale";

import { getPrimaryJapaneseRepresentation, interleave } from "@jyosuushi/utils";

import {
  EXPLORE_COUNTER_PATH,
  EXPLORE_PAGE_PATH,
  EXPLORE_STUDY_PACK_PATH,
  getStudyPackLink,
} from "./pathing";

import styles from "./BreadcrumbBar.scss";

type ComponentProps = RouteComponentProps<{
  counterId?: string;
  packId?: string;
}>;

const INTL_MESSAGES = defineMessages({
  categoryPrefixCounter: {
    defaultMessage: "Counter:",
    id: "explorePage.BreadcrumbBar.counter.prefix",
  },
  categoryPrefixStudyPack: {
    defaultMessage: "Study Pack:",
    id: "explorePage.BreadcrumbBar.studyPack.prefix",
  },
  explorePageName: {
    defaultMessage: "Explore",
    id: "explorePage.BreadcrumbBar.explorePageName",
  },
});

function makeStudyPackDomLink(locale: Locale, packId: string): React.ReactNode {
  const studyPack = STUDY_PACK_LOOKUP[packId];
  return (
    <NavLink
      key={EXPLORE_STUDY_PACK_PATH}
      exact={true}
      to={getStudyPackLink(studyPack)}
      activeClassName={styles.active}
    >
      <FormattedMessage {...INTL_MESSAGES.categoryPrefixStudyPack} />{" "}
      {locale.dataLocalizers.getStudyPackName(studyPack)}
    </NavLink>
  );
}

function assertParamDefined<
  TKey extends keyof ComponentProps["match"]["params"],
  TType extends ComponentProps["match"]["params"][TKey]
>(key: TKey, param: TType): asserts param is Exclude<TType, undefined> {
  if (!param) {
    throw new Error(`Param '${key}' is required.`);
  }
}

function BreadcrumbBar({
  location,
  match,
}: ComponentProps): React.ReactElement {
  // Connect to the rest of the app
  const locale = useLocale();

  // Determine which links should appear on the bar
  const links: React.ReactNode[] = [
    <NavLink
      key={EXPLORE_PAGE_PATH}
      exact={true}
      to={EXPLORE_PAGE_PATH}
      activeClassName={styles.active}
    >
      <FormattedMessage {...INTL_MESSAGES.explorePageName} />
    </NavLink>,
  ];

  switch (match.path) {
    case EXPLORE_STUDY_PACK_PATH: {
      assertParamDefined("packId", match.params.packId);
      links.push(makeStudyPackDomLink(locale, match.params.packId));
      break;
    }
    case EXPLORE_COUNTER_PATH: {
      if (location.state && location.state.fromStudyPack) {
        links.push(makeStudyPackDomLink(locale, location.state.fromStudyPack));
      }

      assertParamDefined("counterId", match.params.counterId);
      const counter = COUNTERS_LOOKUP[match.params.counterId];
      links.push(
        <NavLink
          key={EXPLORE_COUNTER_PATH}
          exact={true}
          to={location}
          activeClassName={styles.active}
        >
          <FormattedMessage {...INTL_MESSAGES.categoryPrefixCounter} />{" "}
          {locale.dataLocalizers.getCounterName(counter)}【
          {getPrimaryJapaneseRepresentation(counter)}】
        </NavLink>
      );

      break;
    }
  }

  // Render the component
  return (
    <div className={styles.breadcrumbBar}>
      <span className={styles.flourish}>⁜</span> {interleave(links, " » ")}
    </div>
  );
}

export default withRouter(BreadcrumbBar);
