import React from "react";
import { defineMessages, FormattedMessage } from "react-intl";

import styles from "./CreateCollectionTile.scss";

const INTL_MESSAGES = defineMessages({
  buttonText: {
    defaultMessage: "New Custom Collection",
    id: "explore.landing.CreateCollectionTile.buttonText",
  },
});

interface ComponentProps {
  onClick: () => void;
}

function CreateCollectionTile({ onClick }: ComponentProps): React.ReactElement {
  return (
    <button className={styles.tile} onClick={onClick}>
      <FormattedMessage {...INTL_MESSAGES.buttonText} />
    </button>
  );
}

export default CreateCollectionTile;
