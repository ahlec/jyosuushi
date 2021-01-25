import React, { useMemo } from "react";

import { COUNTERS_LOOKUP } from "@data/counters";

import { Counter } from "@jyosuushi/interfaces";
import { CounterCollection } from "@jyosuushi/graphql/types.generated";

import useLocale from "@jyosuushi/i18n/useLocale";

import { orderCounters } from "@jyosuushi/ui/main-screen/explore/utils";

import CountersTable from "./counters-table/CountersTable";
import EntriesCountIntro from "./EntriesCountIntro";

import styles from "./EntriesSection.scss";

interface ComponentProps {
  collection: CounterCollection;
}

function EntriesSection({ collection }: ComponentProps): React.ReactElement {
  // Connect with the rest of the app
  const locale = useLocale();

  // Retrieve the array of counters for this collection
  const counters = useMemo(
    (): readonly Counter[] =>
      orderCounters(
        collection.counterIds.map(
          (counterId): Counter => COUNTERS_LOOKUP[counterId]
        ),
        locale
      ),
    [collection.counterIds, locale]
  );

  // Render the component
  return (
    <div className={styles.container}>
      <EntriesCountIntro numEntries={counters.length} />
      <CountersTable
        collectionId={collection.id}
        collectionName={collection.name}
        counters={counters}
      />
    </div>
  );
}

export default EntriesSection;
