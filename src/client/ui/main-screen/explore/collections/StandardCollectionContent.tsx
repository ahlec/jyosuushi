import React from "react";

import { StandardCounterCollection } from "@jyosuushi/graphql/types.generated";

interface ComponentProps {
  collection: StandardCounterCollection;
}

function StandardCollectionContent({
  collection,
}: ComponentProps): React.ReactElement | null {
  return null;
}

export default StandardCollectionContent;
