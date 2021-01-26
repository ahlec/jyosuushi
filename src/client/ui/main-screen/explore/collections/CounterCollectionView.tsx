import React, { useCallback, useMemo, useState } from "react";

import { CounterCollection } from "@jyosuushi/graphql/types.generated";

import BreadcrumbBar, {
  BreadcrumbBarLinkDefinition,
} from "@jyosuushi/ui/main-screen/explore/BreadcrumbBar";
import { getCounterCollectionPath } from "@jyosuushi/ui/main-screen/explore/pathing";

import CollectionHeader from "./CollectionHeader";
import EntriesSection from "./entries-section/EntriesSection";
import RenameCollectionModal from "./rename-collection-modal/RenameCollectionModal";

import styles from "./CounterCollectionView.scss";

interface ComponentProps {
  collection: CounterCollection;
}

function CounterCollectionView({
  collection,
}: ComponentProps): React.ReactElement {
  // Define component state
  const [isRenameModalOpen, setIsRenameModalOpen] = useState<boolean>(false);

  // Prepare the links to appear in the breadcrumb bar
  const breadcrumbLinks = useMemo(
    (): readonly BreadcrumbBarLinkDefinition[] => [
      {
        entityName: collection.name,
        entityType: "collection",
        link: getCounterCollectionPath(collection.id),
      },
    ],
    [collection.id, collection.name]
  );

  // Handle events
  const handleOpenRenameModal = useCallback(
    (): void => setIsRenameModalOpen(true),
    []
  );

  const handleRequestCloseRenameModal = useCallback(
    (): void => setIsRenameModalOpen(false),
    []
  );

  // Render the component
  return (
    <div className={styles.counterCollectionView}>
      <div className={styles.breadcrumbContainer}>
        <BreadcrumbBar links={breadcrumbLinks} />
      </div>
      <CollectionHeader collection={collection} />
      <button onClick={handleOpenRenameModal}>Rename</button>
      <div className={styles.pageArea}>
        <EntriesSection collection={collection} />
      </div>
      {isRenameModalOpen && (
        <RenameCollectionModal
          collectionId={collection.id}
          currentName={collection.name}
          onRequestClose={handleRequestCloseRenameModal}
        />
      )}
    </div>
  );
}

export default CounterCollectionView;
