import React from "react";

import { CounterCollection } from "@jyosuushi/graphql/types.generated";

interface ComponentProps {
  collection: CounterCollection;
}

function CounterCollectionView({
  collection,
}: ComponentProps): React.ReactElement {
  return <div>You're learning about {collection.id}.</div>;
}

export default CounterCollectionView;
