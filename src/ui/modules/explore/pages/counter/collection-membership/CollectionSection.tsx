import React, { useMemo } from "react";
import { defineMessages, FormattedMessage } from "react-intl";

import { STANDARD_COLLECTIONS } from "@data/standard-collections";
import { UserCounterCollection } from "@jyosuushi/interfaces";

import MembershipCell from "./MembershipCell";
import { CollectionMembershipEntry } from "./types";
import useCollectionMembership from "./useCollectionMembership";

import * as styles from "./CollectionSection.scss";

interface ComponentProps {
  counterId: string;
  userCollections: readonly UserCounterCollection[];
}

const INTL_MESSAGES = defineMessages({
  introText: {
    defaultMessage:
      "This counter is found in the following {count, plural, one {collection} other {collections}}:",
    id: "explorePage.counter.collection.introText",
  },
  notInAnyCollectionsText: {
    defaultMessage: "This counter is not found in any collections.",
    id: "explorePage.counter.collection.notInAnyCollectionsText",
  },
});

function CollectionSection({
  counterId,
  userCollections,
}: ComponentProps): React.ReactElement {
  // Determine collection membership for this counter
  const standardCollectionMembership = useCollectionMembership(
    "standard",
    counterId,
    STANDARD_COLLECTIONS
  );
  const userCollectionMembership = useCollectionMembership(
    "user",
    counterId,
    userCollections
  );
  const membershipEntries = useMemo(
    (): readonly CollectionMembershipEntry[] => [
      ...standardCollectionMembership,
      ...userCollectionMembership,
    ],
    [standardCollectionMembership, userCollectionMembership]
  );

  // Render the component
  if (!membershipEntries.length) {
    return (
      <div className={styles.introText}>
        <FormattedMessage {...INTL_MESSAGES.notInAnyCollectionsText} />
      </div>
    );
  }

  return (
    <div>
      <div className={styles.introText}>
        <FormattedMessage
          {...INTL_MESSAGES.introText}
          values={{ count: membershipEntries.length }}
        />
      </div>
      <div className={styles.grid}>
        {membershipEntries.map(
          (entry, index): React.ReactElement => {
            const isLeftColumn = index % 2 === 0;
            let className: string;
            if (index === membershipEntries.length - 1 && isLeftColumn) {
              className = styles.middleColumn;
            } else if (isLeftColumn) {
              className = styles.leftColumn;
            } else {
              className = styles.rightColumn;
            }

            return (
              <MembershipCell
                key={entry.collectionId}
                className={className}
                entry={entry}
              />
            );
          }
        )}
      </div>
    </div>
  );
}

export default CollectionSection;
