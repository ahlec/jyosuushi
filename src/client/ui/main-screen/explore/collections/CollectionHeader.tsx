import React, { useMemo } from "react";
import { defineMessages } from "react-intl";

import {
  StandardCounterCollection,
  UserCounterCollection,
} from "@jyosuushi/graphql/types.generated";

import PageHeader from "@jyosuushi/ui/main-screen/explore/components/page-header/PageHeader";
import { HeaderSubtitleEntryDefinition } from "@jyosuushi/ui/main-screen/explore/components/page-header/types";

const INTL_MESSAGES = defineMessages({
  dateCreated: {
    defaultMessage: "Created <bold>{value}</bold>",
    id: "explorePage.collections.CollectionHeader.subtitle.dateCreated",
  },
  dateLastUpdated: {
    defaultMessage: "Last updated <bold>{value}</bold>",
    id: "explorePage.collections.CollectionHeader.subtitle.dateLastUpdated",
  },
});

interface ComponentProps {
  collection: StandardCounterCollection | UserCounterCollection;
}

function isUserCollection(
  collection: StandardCounterCollection | UserCounterCollection
): collection is UserCounterCollection {
  return "dateCreated" in collection;
}

function CollectionHeader({ collection }: ComponentProps): React.ReactElement {
  // Determine the subtitle entries
  const subtitleEntries = useMemo((): readonly HeaderSubtitleEntryDefinition[] => {
    const entries: HeaderSubtitleEntryDefinition[] = [];

    if (isUserCollection(collection)) {
      entries.push({
        text: INTL_MESSAGES.dateCreated,
        uniqueId: "created",
        value: collection.dateCreated,
      });
    }

    entries.push({
      text: INTL_MESSAGES.dateLastUpdated,
      uniqueId: "last-updated",
      value: collection.dateLastUpdated,
    });

    return entries;
  }, [collection]);

  // Render the component
  return (
    <PageHeader
      colorTheme={isUserCollection(collection) ? "green" : "blue"}
      subtitleEntries={subtitleEntries}
      title={collection.name}
    />
  );
}

export default CollectionHeader;
