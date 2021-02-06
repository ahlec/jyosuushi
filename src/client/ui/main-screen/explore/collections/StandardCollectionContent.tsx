import classnames from "classnames";
import React from "react";

import { StandardCounterCollection } from "@jyosuushi/graphql/types.generated";

import styles from "./StandardCollectionContent.scss";

interface ComponentProps {
  className: string;
  collection: StandardCounterCollection;
}

function StandardCollectionContent({
  className,
  collection,
}: ComponentProps): React.ReactElement {
  return (
    <div className={classnames(styles.container, className)}>
      {collection.description}
    </div>
  );
}

export default StandardCollectionContent;
