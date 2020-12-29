import React, { useCallback, useState } from "react";
import { defineMessages, FormattedMessage } from "react-intl";

import { CounterCollection } from "@jyosuushi/graphql/types.generated";

import CollectionLink from "./CollectionLink";
import CreateCollectionModal from "./create-collection-modal/CreateCollectionModal";
import CreateCollectionTile from "./CreateCollectionTile";

import styles from "./AllCollections.scss";

const INTL_MESSAGES = defineMessages({
  pageHeader: {
    defaultMessage: "Collections",
    id: "explorePage.landing.AllCollections.pageHeader",
  },
});

interface ComponentProps {
  canCreateCollections: boolean;
  collections: readonly CounterCollection[];
  headerClassName: string;
}

function AllCollections({
  canCreateCollections,
  collections,
  headerClassName,
}: ComponentProps): React.ReactElement {
  // Define component state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);

  // Handle events
  const handleCreateClick = useCallback((): void => {
    setIsCreateModalOpen(true);
  }, []);

  const handleRequestModalClose = useCallback((): void => {
    setIsCreateModalOpen(false);
  }, []);

  // Render the component
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
        {canCreateCollections && (
          <CreateCollectionTile onClick={handleCreateClick} />
        )}
      </div>
      {canCreateCollections && isCreateModalOpen && (
        <CreateCollectionModal onRequestClose={handleRequestModalClose} />
      )}
    </div>
  );
}

export default AllCollections;
