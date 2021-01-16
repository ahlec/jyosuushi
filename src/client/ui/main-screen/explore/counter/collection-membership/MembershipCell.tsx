import classnames from "classnames";
import React from "react";
import { Link } from "react-router-dom";

import { getCounterCollectionPath } from "@jyosuushi/ui/main-screen/explore/pathing";

import { CollectionMembershipEntry } from "./types";

import styles from "./MembershipCell.scss";

interface ComponentProps {
  className: string;
  entry: CollectionMembershipEntry;
}

const COLLECTION_TYPE_CSS_CLASS_NAMES = {
  standard: styles.standard,
  user: styles.user,
};

function MembershipCell({
  className,
  entry,
}: ComponentProps): React.ReactElement {
  return (
    <Link
      className={classnames(
        styles.cell,
        COLLECTION_TYPE_CSS_CLASS_NAMES[entry.collectionType],
        className
      )}
      to={getCounterCollectionPath(entry.collectionId)}
    >
      {entry.collectionName}
    </Link>
  );
}

export default MembershipCell;
