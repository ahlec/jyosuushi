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
  typeStandard: {
    defaultMessage: "Standard",
    id: "explorePage.landing.CollectionLink.typeStandard",
  },
  typeUser: {
    defaultMessage: "Custom",
    id: "explorePage.landing.CollectionLink.typeUser",
  },
});

interface ComponentProps {
  collection: StandardCounterCollection | UserCounterCollection;
}

function CollectionLink({ collection }: ComponentProps): React.ReactElement {
  const isUserCollection = "dateCreated" in collection;

  return (
    <Link
      className={styles.collectionLink}
      to={getCounterCollectionPath(collection.id)}
    >
      <ContentTile
        color={isUserCollection ? "green" : "blue"}
        primaryText={collection.name}
      >
        <div className={styles.subcontent}>
          <div>
            {isUserCollection ? (
              <FormattedMessage {...INTL_MESSAGES.typeUser} />
            ) : (
              <FormattedMessage {...INTL_MESSAGES.typeStandard} />
            )}
          </div>
          <div>
            <FormattedMessage
              {...INTL_MESSAGES.collectionSize}
              values={{
                size: collection.counterIds.length,
              }}
            />
          </div>
        </div>
      </ContentTile>
    </Link>
  );
}

export default CollectionLink;
