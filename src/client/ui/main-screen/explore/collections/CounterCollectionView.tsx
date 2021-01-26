import React, { useCallback, useMemo, useState } from "react";
import { defineMessages } from "react-intl";

import { CounterCollection } from "@jyosuushi/graphql/types.generated";

import BreadcrumbBar, {
  BreadcrumbBarLinkDefinition,
} from "@jyosuushi/ui/main-screen/explore/BreadcrumbBar";
import ActionBar, {
  ActionBarItemDefinition,
} from "@jyosuushi/ui/main-screen/explore/components/action-bar/ActionBar";
import { getCounterCollectionPath } from "@jyosuushi/ui/main-screen/explore/pathing";

import PencilIcon from "@jyosuushi/ui/main-screen/explore/pencil.svg";

import CollectionHeader from "./CollectionHeader";
import EntriesSection from "./entries-section/EntriesSection";
import RenameCollectionModal from "./rename-collection-modal/RenameCollectionModal";

import styles from "./CounterCollectionView.scss";

const INTL_MESSAGES = defineMessages({
  renameActionButtonItem: {
    defaultMessage: "Rename",
    id: "explorePage.collections.CounterCollectionView.actionBar.rename",
  },
});

interface ComponentProps {
  collection: CounterCollection;
}

function CounterCollectionView({
  collection,
}: ComponentProps): React.ReactElement {
  const isUserCollection = "dateCreated" in collection;

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
  const actionBarItems = useMemo(
    (): readonly ActionBarItemDefinition[] => [
      {
        icon: PencilIcon,
        onClick: (): void => setIsRenameModalOpen(true),
        text: INTL_MESSAGES.renameActionButtonItem,
      },
    ],
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
      <div className={styles.pageArea}>
        {isUserCollection && (
          <ActionBar className={styles.actionBar} items={actionBarItems} />
        )}
        <EntriesSection collection={collection} />
      </div>
      {isUserCollection && isRenameModalOpen && (
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
