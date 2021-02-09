import React, { useCallback, useMemo, useState } from "react";
import { defineMessages } from "react-intl";
import { Redirect } from "react-router-dom";

import { UserCounterCollection } from "@jyosuushi/graphql/types.generated";

import ActionBar, {
  ActionBarItemDefinition,
} from "@jyosuushi/ui/main-screen/explore/components/action-bar/ActionBar";

import PencilIcon from "@jyosuushi/ui/main-screen/explore/pencil.svg";
import useAddCounterToCollection from "@jyosuushi/ui/main-screen/explore/hooks/useAddCounterToCollection";
import useRemoveCounterFromCollection from "@jyosuushi/ui/main-screen/explore/hooks/useRemoveCounterFromCollection";

import BaseCounterCollectionView from "./BaseCounterCollectionView";
import LinkedCollectionContentsTable from "./counters-table/LinkedCollectionContentsTable";
import DeleteCollectionConfirmationModal from "./DeleteCollectionConfirmationModal";
import EntriesCountIntro from "./EntriesCountIntro";
import ManageCountersTable from "./counters-table/ManageCountersTable";
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
  const {
    callback: addCounterToCollection,
    redirectRequest: addCounterRedirectRequest,
  } = useAddCounterToCollection();
  const deleteCollection = useDeleteCollection(collection.id);
  const {
    callback: removeCounterFromCollection,
    redirectRequest: removeCounterRedirectRequest,
  } = useRemoveCounterFromCollection();

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

  const handleAddCounter = useCallback(
    (counterId: string) => addCounterToCollection(counterId, collection.id),
    [addCounterToCollection, collection.id]
  );

  const handleRemoveCounter = useCallback(
    (counterId: string) =>
      removeCounterFromCollection(counterId, collection.id),
    [removeCounterFromCollection, collection.id]
  );

  // Handle redirecting to a different location, if one of our API requests
  // indicates we should redirect
  const redirectRequest =
    addCounterRedirectRequest || removeCounterRedirectRequest;
  if (redirectRequest) {
    let to: string;
    switch (redirectRequest) {
      case "explore-landing-page": {
        to = "/explore";
        break;
      }
      case "profile": {
        to = "/profile";
        break;
      }
    }

    return <Redirect to={to} />;
  }

  // Render the component
  return (
    <BaseCounterCollectionView collection={collection}>
      <ActionBar items={actionBarItems} />
      <EntriesCountIntro numCounters={collection.counterIds.length} />
      {isEditingContents ? (
        <ManageCountersTable
          collectionCounters={collection.counterIds}
          onAddCounter={handleAddCounter}
          onRemoveCounter={handleRemoveCounter}
        />
      ) : (
        <LinkedCollectionContentsTable collection={collection} />
      )}
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
