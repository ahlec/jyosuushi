import React from "react";
import { defineMessages, FormattedMessage } from "react-intl";

import { CounterCollection } from "@jyosuushi/graphql/types.generated";

import CollectionLink from "./CollectionLink";

import styles from "./AllCollections.scss";

const INTL_MESSAGES = defineMessages({
  pageHeader: {
    defaultMessage: "Collections",
    id: "explorePage.landing.AllCollections.pageHeader",
  },
});

interface ComponentProps {
  collections: readonly CounterCollection[];
  headerClassName: string;
}

function AllCollections({
  collections,
  headerClassName,
}: ComponentProps): React.ReactElement {
  return (
    <div>
      <h3 className={headerClassName}>
        <FormattedMessage {...INTL_MESSAGES.pageHeader} />
      </h3>
      <div className={styles.list}>
        {collections.map(
          (collection): React.ReactElement => {
            return (
              <CollectionLink
                key={collection.id}
                id={collection.id}
                name={collection.name}
                numCounters={collection.counterIds.length}
              />
            );
          }
        )}
      </div>
    </div>
  );
}

export default AllCollections;
