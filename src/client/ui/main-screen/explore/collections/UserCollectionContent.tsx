import React, { useCallback, useMemo, useState } from "react";
import { defineMessages } from "react-intl";

import { UserCounterCollection } from "@jyosuushi/graphql/types.generated";

import ActionBar, {
  ActionBarItemDefinition,
} from "@jyosuushi/ui/main-screen/explore/components/action-bar/ActionBar";

import PencilIcon from "@jyosuushi/ui/main-screen/explore/pencil.svg";

import DeleteCollectionConfirmationModal from "./DeleteCollectionConfirmationModal";
import RenameCollectionModal from "./rename-collection-modal/RenameCollectionModal";
import useDeleteCollection from "./useDeleteCollection";

import TrashIcon from "./trash.svg";

const INTL_MESSAGES = defineMessages({
  deleteActionButtonItem: {
    defaultMessage: "Delete",
    id: "explorePage.collections.UserCollectionContent.actionBar.delete",
  },
  renameActionButtonItem: {
    defaultMessage: "Rename",
    id: "explorePage.collections.UserCollectionContent.actionBar.rename",
  },
});

interface ComponentProps {
  className: string;
  collection: UserCounterCollection;
}

function UserCollectionContent({
  className,
  collection,
}: ComponentProps): React.ReactElement {
  // Define component state
  const [isRenameModalOpen, setIsRenameModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  // Connect with the backend
  const deleteCollection = useDeleteCollection(collection.id);

  // Prepare the action bar
  const actionBarItems = useMemo(
    (): readonly ActionBarItemDefinition[] => [
      {
        icon: PencilIcon,
        onClick: (): void => setIsRenameModalOpen(true),
        text: INTL_MESSAGES.renameActionButtonItem,
      },
      {
        icon: TrashIcon,
        onClick: (): void => setIsDeleteModalOpen(true),
        text: INTL_MESSAGES.deleteActionButtonItem,
      },
    ],
    []
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
    <>
      <ActionBar className={className} items={actionBarItems} />
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
    </>
  );
}

export default UserCollectionContent;
