import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { STUDY_PACK_LOOKUP } from "@data/studyPacks";
import { StudyPack } from "@jyosuushi/interfaces";
import { State } from "@jyosuushi/redux";
import { setEnabledPacks } from "@jyosuushi/redux/actions";

function useEnabledPacks(): [
  readonly StudyPack[],
  (next: readonly StudyPack[]) => void
] {
  // Connect with the rest of the app
  const dispatch = useDispatch();

  // Get the current selection from Redux
  const enabledPackIds = useSelector((state: State) => state.enabledPacks);

  // Convert the Redux data into the actual study pack objects
  const enabledPacks = useMemo(
    (): readonly StudyPack[] =>
      enabledPackIds.map((packId): StudyPack => STUDY_PACK_LOOKUP[packId]),
    [enabledPackIds]
  );

  // Create an easy function that can be used to mutate the enabled packs
  const handlePackSelectionChange = useCallback(
    (selection: readonly StudyPack[]): void => {
      dispatch(setEnabledPacks(selection));
    },
    [dispatch]
  );

  // Return the public API
  return [enabledPacks, handlePackSelectionChange];
}

export default useEnabledPacks;
