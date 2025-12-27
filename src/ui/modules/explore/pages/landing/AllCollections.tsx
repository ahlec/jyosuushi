import { orderBy } from "lodash";
import React, { useCallback, useMemo, useState } from "react";
import { defineMessages, FormattedMessage } from "react-intl";
import { useNavigate } from "react-router";

import { STANDARD_COLLECTIONS } from "@data/standard-collections";
import {
  CounterCollection,
  CreateUserCounterCollectionFn,
  UserCounterCollection,
} from "@jyosuushi/interfaces";

import { getCounterCollectionPath } from "@jyosuushi/ui/modules/explore/pathing";

import CollectionLink from "./CollectionLink";
import CreateCollectionModal from "./CreateCollectionModal";
import CreateCollectionTile from "./CreateCollectionTile";

import * as styles from "./AllCollections.scss";

const INTL_MESSAGES = defineMessages({
  pageHeader: {
    defaultMessage: "Collections",
    id: "explorePage.landing.AllCollections.pageHeader",
  },
});

interface ComponentProps {
  createUserCollection: CreateUserCounterCollectionFn;
  headerClassName: string;
  userCollections: readonly UserCounterCollection[];
}

function useOrderedCollection<T extends CounterCollection>(
  collections: readonly T[],
): readonly T[] {
  return useMemo(
    (): readonly T[] =>
      orderBy(collections, (collection): string => collection.name),
    [collections],
  );
}

function AllCollections({
  createUserCollection,
  headerClassName,
  userCollections,
}: ComponentProps): React.ReactElement {
  // Connect with the rest of the app
  const navigate = useNavigate();

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
    (collectionId: string): void => {
      navigate(getCounterCollectionPath(collectionId));
    },
    [navigate],
  );

  // Enforce a consistent ordering scheme
  const orderedStandardCollections = useOrderedCollection(STANDARD_COLLECTIONS);
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
          ),
        )}
        {orderedUserCollections.map(
          (collection): React.ReactElement => (
            <CollectionLink
              key={collection.id}
              collection={collection}
              variant="user"
            />
          ),
        )}

        <CreateCollectionTile
          isModalOpen={isCreateModalOpen}
          onClick={handleCreateClick}
        />
      </div>
      {isCreateModalOpen && (
        <CreateCollectionModal
          createUserCollection={createUserCollection}
          onCancel={handleCreateCollectionCancelled}
          onSuccess={handleCollectionCreatedSuccessfully}
        />
      )}
    </div>
  );
}

export default AllCollections;
