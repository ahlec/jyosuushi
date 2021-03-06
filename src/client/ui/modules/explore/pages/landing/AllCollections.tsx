import { orderBy } from "lodash";
import React, { useCallback, useMemo, useState } from "react";
import { defineMessages, FormattedMessage } from "react-intl";
import { useHistory } from "react-router";

import {
  CounterCollection,
  StandardCounterCollection,
  UserCounterCollection,
} from "@jyosuushi/graphql/types.generated";

import { getCounterCollectionPath } from "@jyosuushi/ui/modules/explore/pathing";

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
  headerClassName: string;
  standardCollections: readonly StandardCounterCollection[];
  userCollections: readonly UserCounterCollection[];
}

function useOrderedCollection<T extends CounterCollection>(
  collections: readonly T[]
): readonly T[] {
  return useMemo(
    (): readonly T[] =>
      orderBy(collections, (collection): string => collection.name),
    [collections]
  );
}

function AllCollections({
  canCreateCollections,
  headerClassName,
  standardCollections,
  userCollections,
}: ComponentProps): React.ReactElement {
  // Connect with the rest of the app
  const history = useHistory();

  // Define component state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);

  // Handle events
  const handleCreateClick = useCallback((): void => {
    setIsCreateModalOpen(true);
  }, []);

  const handleCreateCollectionCancelled = useCallback((): void => {
    setIsCreateModalOpen(false);
  }, []);

  const handleCollectionCreatedSuccessfully = useCallback(
    (collection: UserCounterCollection): void => {
      history.push(getCounterCollectionPath(collection.id));
    },
    [history]
  );

  // Enforce a consistent ordering scheme
  const orderedStandardCollections = useOrderedCollection(standardCollections);
  const orderedUserCollections = useOrderedCollection(userCollections);

  // Render the component
  return (
    <div>
      <h3 className={headerClassName}>
        <FormattedMessage {...INTL_MESSAGES.pageHeader} />
      </h3>
      <div className={styles.list}>
        {orderedStandardCollections.map(
          (collection): React.ReactElement => (
            <CollectionLink
              key={collection.id}
              collection={collection}
              variant="standard"
            />
          )
        )}
        {orderedUserCollections.map(
          (collection): React.ReactElement => (
            <CollectionLink
              key={collection.id}
              collection={collection}
              variant="user"
            />
          )
        )}

        {canCreateCollections && (
          <CreateCollectionTile
            isModalOpen={isCreateModalOpen}
            onClick={handleCreateClick}
          />
        )}
      </div>
      {canCreateCollections && isCreateModalOpen && (
        <CreateCollectionModal
          onCancel={handleCreateCollectionCancelled}
          onSuccess={handleCollectionCreatedSuccessfully}
        />
      )}
    </div>
  );
}

export default AllCollections;
