import React from "react";
import { defineMessages, FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

import { getCounterCollectionPath } from "@jyosuushi/ui/main-screen/explore/pathing";

import styles from "./CollectionLink.scss";

const INTL_MESSAGES = defineMessages({
  collectionSize: {
    defaultMessage: "{size, plural, one {# counter} other {# counters}}",
    id: "explorePage.landing.CollectionLink.collectionSize",
  },
});

interface ComponentProps {
  id: string;
  name: string;
  numCounters: number;
}

function CollectionLink({
  id,
  name,
  numCounters,
}: ComponentProps): React.ReactElement {
  return (
    <Link className={styles.collectionLink} to={getCounterCollectionPath(id)}>
      <div className={styles.name}>{name}</div>
      <div className={styles.count}>
        <FormattedMessage
          {...INTL_MESSAGES.collectionSize}
          values={{
            size: numCounters,
          }}
        />
      </div>
    </Link>
  );
}

export default CollectionLink;
