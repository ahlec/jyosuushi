import classnames from "classnames";
import { Location } from "history";
import React, { useCallback } from "react";
import { FormattedMessage, MessageDescriptor } from "react-intl";
import { match as Match, NavLink } from "react-router-dom";

import { PageDefinition } from "@jyosuushi/ui/types";

import * as styles from "./SidebarEntry.scss";

interface ComponentProps {
  icon: React.ComponentClass<React.SVGProps<SVGSVGElement>>;
  page: PageDefinition | null;
  text: MessageDescriptor;
}

const preventDefault = (e: React.MouseEvent<HTMLAnchorElement>): void => {
  e.preventDefault();
};

function SidebarEntry({
  icon: Icon,
  page,
  text,
}: ComponentProps): React.ReactElement {
  // Determine if this link should be active or not
  const isActive = useCallback(
    (match: Match | null, { pathname }: Location): boolean => {
      if (!page) {
        // We're not active, so nothing should match
        return false;
      }

      if (match && match.url) {
        // We have a match for the `to` specified on the NavLink itself
        return true;
      }

      // Check if any of our alias paths match
      if (page.aliasPaths.includes(pathname)) {
        return true;
      }

      return false;
    },
    [page]
  );

  // Render the component
  return (
    <NavLink
      to={page ? page.primaryPath : ""}
      className={classnames(
        styles.entry,
        page ? styles.variantLink : styles.variantInert
      )}
      activeClassName={styles.active}
      isActive={isActive}
      onClick={page ? undefined : preventDefault}
    >
      <Icon />
      <FormattedMessage {...text} />
    </NavLink>
  );
}

export default SidebarEntry;
