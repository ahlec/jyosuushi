import React, { useCallback, useMemo, useState } from "react";
import { defineMessages } from "react-intl";
import { useNavigate } from "react-router";

import { UserCounterCollection } from "@jyosuushi/interfaces";

import ActionBar, {
  ActionBarItemDefinition,
} from "@jyosuushi/ui/modules/explore/components/action-bar/ActionBar";

import PencilIcon from "@jyosuushi/ui/modules/explore/pencil.svg";
import { EXPLORE_PAGE_PATH } from "@jyosuushi/ui/modules/explore/pathing";

import BaseCounterCollectionView from "./BaseCounterCollectionView";
import LinkedCollectionContentsTable from "./counters-table/LinkedCollectionContentsTable";
import DeleteCollectionConfirmationModal from "./DeleteCollectionConfirmationModal";
import EntriesCountIntro from "./EntriesCountIntro";
import ManageCountersTable from "./counters-table/ManageCountersTable";
import RenameCollectionModal from "./RenameCollectionModal";

import AddIcon from "./add.svg";
import TrashIcon from "./trash.svg";

const INTL_MESSAGES = defineMessages({
  addRemoveCountersActionButtonItem: {
    defaultMessage: "Add/Remove Counters",
    id: "explorePage.collections.UserCollectionView.actionBar.addRemoveCounters",
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
  const navigate = useNavigate();

  // Define component state
  const [isEditingContents, setIsEditingContents] = useState<boolean>(false);
  const [isRenameModalOpen, setIsRenameModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

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
    [isEditingContents],
  );

  // Handle events
  const handleRequestCloseRenameModal = useCallback(
    (): void => setIsRenameModalOpen(false),
    [],
  );

  const handleRequestCloseDeleteModal = useCallback(
    (): void => setIsDeleteModalOpen(false),
    [],
  );

  const handleDeleteConfirmed = useCallback((): void => {
    collection.delete().then((): void => {
      navigate(EXPLORE_PAGE_PATH, { replace: true });
    });
  }, [collection, navigate]);

  const handleAddCounter = useCallback(
    (counterId: string) => collection.addCounter(counterId),
    [collection],
  );

  const handleRemoveCounter = useCallback(
    (counterId: string) => collection.removeCounter(counterId),
    [collection],
  );

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
          collection={collection}
          onRequestClose={handleRequestCloseRenameModal}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteCollectionConfirmationModal
          onConfirm={handleDeleteConfirmed}
          onRequestClose={handleRequestCloseDeleteModal}
        />
      )}
    </BaseCounterCollectionView>
  );
}

export default UserCollectionView;
