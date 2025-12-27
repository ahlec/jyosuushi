import React from "react";
import {
  defineMessages,
  FormattedMessage,
  MessageDescriptor,
} from "react-intl";
import { NavLink } from "react-router-dom";

import { EXPLORE_PAGE_PATH } from "@jyosuushi/ui/modules/explore/pathing";
import { interleave } from "@jyosuushi/utils";

import * as styles from "./BreadcrumbBar.scss";

const INTL_MESSAGES = defineMessages({
  categoryPrefixCollection: {
    defaultMessage: "Collection:",
    id: "explorePage.BreadcrumbBar.collection.prefix",
  },
  categoryPrefixCounter: {
    defaultMessage: "Counter:",
    id: "explorePage.BreadcrumbBar.counter.prefix",
  },
  explorePageName: {
    defaultMessage: "Explore",
    id: "explorePage.BreadcrumbBar.explorePageName",
  },
});

type BreadcrumbBarEntityType = "counter" | "collection";

export interface BreadcrumbBarLinkDefinition {
  entityName: string;
  entityType: "counter" | "collection";
  link: string;
}

interface ComponentProps {
  links: readonly BreadcrumbBarLinkDefinition[];
}

const BREADCRUMB_BAR_ENTITY_TYPE_PREFIX_MESSAGE: {
  [type in BreadcrumbBarEntityType]: MessageDescriptor;
} = {
  collection: INTL_MESSAGES.categoryPrefixCollection,
  counter: INTL_MESSAGES.categoryPrefixCounter,
};

function BreadcrumbBar({ links }: ComponentProps): React.ReactElement {
  // Prepare the link elements to appear in the bar
  const linkElements: React.ReactElement[] = [
    <NavLink
      key={EXPLORE_PAGE_PATH}
      exact={true}
      to={EXPLORE_PAGE_PATH}
      activeClassName={styles.active}
    >
      <FormattedMessage {...INTL_MESSAGES.explorePageName} />
    </NavLink>,
    ...links.map(
      (definition): React.ReactElement => (
        <NavLink
          key={definition.link}
          exact={true}
          to={definition.link}
          activeClassName={styles.active}
        >
          <FormattedMessage
            {...BREADCRUMB_BAR_ENTITY_TYPE_PREFIX_MESSAGE[
              definition.entityType
            ]}
          />{" "}
          {definition.entityName}
        </NavLink>
      )
    ),
  ];

  // Render the component
  return (
    <div className={styles.breadcrumbBar}>
      <span className={styles.flourish}>⁜</span>{" "}
      {interleave(linkElements, " » ")}
    </div>
  );
}

export default BreadcrumbBar;
