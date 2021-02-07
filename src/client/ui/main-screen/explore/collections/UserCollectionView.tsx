import React, { useCallback, useMemo, useState } from "react";
import { defineMessages } from "react-intl";

import { UserCounterCollection } from "@jyosuushi/graphql/types.generated";

import ActionBar, {
  ActionBarItemDefinition,
} from "@jyosuushi/ui/main-screen/explore/components/action-bar/ActionBar";

import PencilIcon from "@jyosuushi/ui/main-screen/explore/pencil.svg";

import BaseCounterCollectionView from "./BaseCounterCollectionView";
import CountersTable from "./counters-table/CountersTable";
import DeleteCollectionConfirmationModal from "./DeleteCollectionConfirmationModal";
import EntriesCountIntro from "./EntriesCountIntro";
import RenameCollectionModal from "./rename-collection-modal/RenameCollectionModal";
import useDeleteCollection from "./useDeleteCollection";

import AddIcon from "./add.svg";
import TrashIcon from "./trash.svg";

const INTL_MESSAGES = defineMessages({
  addRemoveCountersActionButtonItem: {
    defaultMessage: "Add/Remove Counters",
    id:
      "explorePage.collections.UserCollectionView.actionBar.addRemoveCounters",
  },
  deleteActionButtonItem: {
    defaultMessage: "Delete",
    id: "explorePage.collections.UserCollectionView.actionBar.delete",
  },
  renameActionButtonItem: {
    defaultMessage: "Rename",
    id: "explorePage.collections.UserCollectionView.actionBar.rename",
  },
});

interface ComponentProps {
  collection: UserCounterCollection;
}

function UserCollectionView({
  collection,
}: ComponentProps): React.ReactElement {
  // Define component state
  const [isEditingContents, setIsEditingContents] = useState<boolean>(false);
  const [isRenameModalOpen, setIsRenameModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  // Connect with the backend
  const deleteCollection = useDeleteCollection(collection.id);

  // Prepare the action bar
  const actionBarItems = useMemo(
    (): readonly ActionBarItemDefinition[] => [
      {
        icon: AddIcon,
        isActive: isEditingContents,
        isDisabled: false,
        onClick: (): void => setIsEditingContents(!isEditingContents),
        text: INTL_MESSAGES.addRemoveCountersActionButtonItem,
      },
      {
        icon: PencilIcon,
        isActive: false,
        isDisabled: isEditingContents,
        onClick: (): void => setIsRenameModalOpen(true),
        text: INTL_MESSAGES.renameActionButtonItem,
      },
      {
        icon: TrashIcon,
        isActive: false,
        isDisabled: isEditingContents,
        onClick: (): void => setIsDeleteModalOpen(true),
        text: INTL_MESSAGES.deleteActionButtonItem,
      },
    ],
    [isEditingContents]
  );

  // Handle events
  const handleRequestCloseRenameModal = useCallback(
    (): void => setIsRenameModalOpen(false),
    []
  );

  const handleRequestCloseDeleteModal = useCallback(
    (): void => setIsDeleteModalOpen(false),
    []
  );

  // Render the component
  return (
    <BaseCounterCollectionView collection={collection}>
      <ActionBar items={actionBarItems} />
      <EntriesCountIntro numCounters={collection.counterIds.length} />
      {isEditingContents ? null : <CountersTable collection={collection} />}
      {isRenameModalOpen && (
        <RenameCollectionModal
          collectionId={collection.id}
          currentName={collection.name}
          onRequestClose={handleRequestCloseRenameModal}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteCollectionConfirmationModal
          onConfirm={deleteCollection}
          onRequestClose={handleRequestCloseDeleteModal}
        />
      )}
    </BaseCounterCollectionView>
  );
}

export default UserCollectionView;
