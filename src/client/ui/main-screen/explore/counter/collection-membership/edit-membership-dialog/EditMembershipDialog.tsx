import { noop } from "lodash";
import React from "react";
import { defineMessages } from "react-intl";

import { UserCounterCollection } from "@jyosuushi/graphql/types.generated";

import BaseDialog from "@jyosuushi/ui/components/popups/BaseDialog";

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
   */
  onRequestClose: () => void;

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
  // Render the component
  return (
    <BaseDialog
      canClose={true}
      className={styles.dialog}
      closeButtonSize={24}
      contentClassName={styles.content}
      header={INTL_MESSAGES.dialogHeader}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
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
              onAddToCollection={noop}
              onRemoveFromCollection={noop}
            />
          )
        )}
      </div>
    </BaseDialog>
  );
}

export default EditMembershipDialog;
