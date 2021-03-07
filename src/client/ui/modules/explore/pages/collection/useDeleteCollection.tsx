import { Reference } from "@apollo/client";
import { useCallback } from "react";
import { useHistory } from "react-router";

import {
  DeleteCollectionResult,
  useDeleteCollectionMutation,
} from "@jyosuushi/graphql/types.generated";

import { EXPLORE_PAGE_PATH } from "@jyosuushi/ui/modules/explore/pathing";

type HookResult = () => Promise<void>;

function useDeleteCollection(collectionId: string): HookResult {
  // Connect with the backend
  const [deleteCollectionMutation] = useDeleteCollectionMutation({
    update: (cache, { data }): void => {
      if (
        !data ||
        data.deleteCollection.result !== DeleteCollectionResult.Success
      ) {
        return;
      }

      cache.modify({
        fields: {
          userCounterCollections: (
            currentRefs: readonly Reference[] = [],
            { readField }
          ): readonly Reference[] => {
            return currentRefs.filter(
              (ref): boolean =>
                readField("id", ref) !== data.deleteCollection.collectionId
            );
          },
        },
      });
    },
  });

  // Connect with the rest of the app
  const history = useHistory();

  // Create the public function that will invoke the backend and process the
  // results.
  return useCallback(async (): Promise<void> => {
    const result = await deleteCollectionMutation({
      variables: {
        collectionId,
      },
    });

    if (
      !result.data ||
      result.data.deleteCollection.result !== DeleteCollectionResult.Success
    ) {
      return;
    }

    history.replace(EXPLORE_PAGE_PATH);
  }, [collectionId, deleteCollectionMutation, history]);
}

export default useDeleteCollection;
