import { STUDY_PACKS, StudyPack } from "../../data/study-packs";
import { ActionDisableStudyPack, ActionEnableStudyPack } from "../actions";

interface State {
  [packId: string]: boolean;
}

type ReducerAction = ActionDisableStudyPack | ActionEnableStudyPack;

const DEFAULT_STATE: State = STUDY_PACKS.reduce(
  (state: State, pack: StudyPack) => {
    state[pack.packId] = false;
    return state;
  },
  {}
);

export default function countersReducer(
  state: State | undefined = DEFAULT_STATE,
  action: ReducerAction
): State {
  switch (action.type) {
    case "disable-study-pack": {
      if (!state[action.studyPack.packId]) {
        return state;
      }

      return {
        ...state,
        [action.studyPack.packId]: false
      };
    }
    case "enable-study-pack": {
      if (state[action.studyPack.packId]) {
        return state;
      }

      return {
        ...state,
        [action.studyPack.packId]: true
      };
    }
    default:
      return state;
  }
}
