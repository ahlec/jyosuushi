import React, { useMemo } from "react";
import { defineMessages } from "react-intl";

import type {
  StandardCounterCollection,
  UserCounterCollection,
} from "@jyosuushi/interfaces";
import { isUserCollection } from "@jyosuushi/utils/typeguards";

import PageHeader from "@jyosuushi/ui/modules/explore/components/page-header/PageHeader";
import { HeaderSubtitleEntryDefinition } from "@jyosuushi/ui/modules/explore/components/page-header/types";

const INTL_MESSAGES = defineMessages({
  dateCreated: {
    defaultMessage: "Created <bold>{value}</bold>",
    id: "explorePage.collections.CollectionHeader.subtitle.dateCreated",
  },
  dateLastUpdated: {
    defaultMessage: "Last updated <bold>{value}</bold>",
    id: "explorePage.collections.CollectionHeader.subtitle.dateLastUpdated",
  },
  standardCollectionLabel: {
    defaultMessage: "Standard Collection",
    id: "explorePage.collections.CollectionHeader.subtitle.label.standardCollection",
  },
  userCollectionLabel: {
    defaultMessage: "Custom Collection",
    id: "explorePage.collections.CollectionHeader.subtitle.label.userCollection",
  },
});

interface ComponentProps {
  collection: StandardCounterCollection | UserCounterCollection;
}

function CollectionHeader({ collection }: ComponentProps): React.ReactElement {
  // Determine the subtitle entries
  const subtitleEntries =
    useMemo((): readonly HeaderSubtitleEntryDefinition[] => {
      const entries: HeaderSubtitleEntryDefinition[] = [
        {
          text: isUserCollection(collection)
            ? INTL_MESSAGES.userCollectionLabel
            : INTL_MESSAGES.standardCollectionLabel,
          uniqueId: "label",
          value: "",
        },
      ];

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
    >
      {collection.name}
    </PageHeader>
  );
}

export default CollectionHeader;
