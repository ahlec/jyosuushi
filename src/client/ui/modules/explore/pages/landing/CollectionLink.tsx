import React from "react";
import { defineMessages, FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

import {
  StandardCounterCollection,
  UserCounterCollection,
} from "@jyosuushi/graphql/types.generated";

import { getCounterCollectionPath } from "@jyosuushi/ui/modules/explore/pathing";

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

type ComponentProps =
  | {
      collection: StandardCounterCollection;
      variant: "standard";
    }
  | {
      collection: UserCounterCollection;
      variant: "user";
    };

function CollectionLink({
  collection: { counterIds, id, name },
  variant,
}: ComponentProps): React.ReactElement {
  return (
    <Link className={styles.collectionLink} to={getCounterCollectionPath(id)}>
      <ContentTile
        color={variant === "user" ? "green" : "blue"}
        primaryText={name}
      >
        <div className={styles.subcontent}>
          <div>
            {variant === "user" ? (
              <FormattedMessage {...INTL_MESSAGES.typeUser} />
            ) : (
              <FormattedMessage {...INTL_MESSAGES.typeStandard} />
            )}
          </div>
          <div>
            <FormattedMessage
              {...INTL_MESSAGES.collectionSize}
              values={{
                size: counterIds.length,
              }}
            />
          </div>
        </div>
      </ContentTile>
    </Link>
  );
}

export default CollectionLink;
