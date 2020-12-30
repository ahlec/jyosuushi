import React from "react";
import { defineMessages, FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

import {
  StandardCounterCollection,
  UserCounterCollection,
} from "@jyosuushi/graphql/types.generated";

import { getCounterCollectionPath } from "@jyosuushi/ui/main-screen/explore/pathing";

import ContentTile from "./content-tile/ContentTile";

import styles from "./CollectionLink.scss";

const INTL_MESSAGES = defineMessages({
  collectionSize: {
    defaultMessage: "{size, plural, one {# counter} other {# counters}}",
    id: "explorePage.landing.CollectionLink.collectionSize",
  },
});

interface ComponentProps {
  collection: StandardCounterCollection | UserCounterCollection;
}

function CollectionLink({ collection }: ComponentProps): React.ReactElement {
  return (
    <Link
      className={styles.collectionLink}
      to={getCounterCollectionPath(collection.id)}
    >
      <ContentTile
        color={"dateCreated" in collection ? "blue" : "green"}
        primaryText={collection.name}
      >
        <FormattedMessage
          {...INTL_MESSAGES.collectionSize}
          values={{
            size: collection.counterIds.length,
          }}
        />
      </ContentTile>
    </Link>
  );
}

export default CollectionLink;
