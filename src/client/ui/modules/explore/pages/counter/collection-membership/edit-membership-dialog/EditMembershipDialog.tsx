import React, { useCallback, useEffect } from "react";
import { defineMessages } from "react-intl";

import { UserCounterCollection } from "@jyosuushi/graphql/types.generated";

import BaseDialog from "@jyosuushi/ui/components/popups/BaseDialog";

import useAddCounterToCollection from "@jyosuushi/ui/modules/explore/hooks/useAddCounterToCollection";
import useRemoveCounterFromCollection from "@jyosuushi/ui/modules/explore/hooks/useRemoveCounterFromCollection";
import { RedirectLocation } from "@jyosuushi/ui/modules/explore/pages/counter/types";

import CollectionRow from "./CollectionRow";

import styles from "./EditMembershipDialog.scss";

const INTL_MESSAGES = defineMessages({
  dialogHeader: {
    defaultMessage: "Add to Collections",
    id: "explorePage.counter.collections.edit-membership-dialog.dialogHeader",
  },
});

interface ComponentProps {
  /**
   * The ID of the counter that this edit dialog was opened for.
   */
  counterId: string;

  /**
   * A boolean which indicates whether this dialog is currently open or not.
   */
  isOpen: boolean;

  /**
   * A callback that can be invoked to request that the dialog be closed. This
   * will not be called if {@link ComponentProps.isOpen} is false.
   *
   * If this modal is closing with the recommendation to redirect elsewhere,
   * the requested redirect will be included as the first parameter. If this
   * modal is closing with normal behavior, the first parameter will be null.
   */
  onRequestClose: (redirectLocation: RedirectLocation | null) => void;

  /**
   * The array of custom collections that the currently authenticated user has
   * already created.
   */
  userCollections: readonly UserCounterCollection[];
}

function EditMembershipDialog({
  counterId,
  isOpen,
  onRequestClose,
  userCollections,
}: ComponentProps): React.ReactElement {
  // Connect with the server
  const {
    callback: addCounterToCollection,
    redirectRequest: addRedirectRequest,
  } = useAddCounterToCollection();
  const {
    callback: removeCounterFromCollection,
    redirectRequest: removeRedirectRequest,
  } = useRemoveCounterFromCollection();

  // Current the normal `onRequestClose` callback
  const handleRequestClose = useCallback((): void => onRequestClose(null), [
    onRequestClose,
  ]);

  // If one of the callbacks has requested a redirect, bubble that up
  const redirectRequest = addRedirectRequest || removeRedirectRequest;
  useEffect((): void => {
    if (!redirectRequest) {
      return;
    }

    onRequestClose(redirectRequest);
  }, [onRequestClose, redirectRequest]);

  // Handle events
  const handleAddToCollection = useCallback(
    (collectionId: string): Promise<void> =>
      addCounterToCollection(counterId, collectionId),
    [addCounterToCollection, counterId]
  );

  const handleRemoveFromCollection = useCallback(
    (collectionId: string): Promise<void> =>
      removeCounterFromCollection(counterId, collectionId),
    [removeCounterFromCollection, counterId]
  );

  // Render the component
  return (
    <BaseDialog
      canClose={true}
      className={styles.dialog}
      closeButtonSize={24}
      contentClassName={styles.content}
      header={INTL_MESSAGES.dialogHeader}
      isOpen={isOpen}
      onRequestClose={handleRequestClose}
    >
      <div className={styles.collections}>
        {userCollections.map(
          (collection): React.ReactElement => (
            <CollectionRow
              key={collection.id}
              collection={collection}
              isCounterInCollection={
                collection.counterIds.indexOf(counterId) >= 0
              }
              onAddToCollection={handleAddToCollection}
              onRemoveFromCollection={handleRemoveFromCollection}
            />
          )
        )}
      </div>
    </BaseDialog>
  );
}

export default EditMembershipDialog;
