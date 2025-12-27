import classnames from "classnames";
import React from "react";
import { FormattedMessage, MessageDescriptor } from "react-intl";
import { NavLink } from "react-router";

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
  return (
    <NavLink
      to={page ? page.primaryPath : "/"}
      className={({ isActive }) =>
        classnames(
          styles.entry,
          page ? styles.variantLink : styles.variantInert,
          isActive && styles.active
        )
      }
      onClick={page ? undefined : preventDefault}
    >
      <Icon />
      <FormattedMessage {...text} />
    </NavLink>
  );
}

export default SidebarEntry;
