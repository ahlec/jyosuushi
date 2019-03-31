import { without } from "lodash";
import { ActionDisableStudyPack, ActionEnableStudyPack } from "../actions";
import { CountersStateItem } from "../index";

interface State {
  [counterId: string]: CountersStateItem;
}

type ReducerAction = ActionDisableStudyPack | ActionEnableStudyPack;

export default function countersReducer(
  state: State | undefined = {},
  action: ReducerAction
): State {
  switch (action.type) {
    case "disable-study-pack": {
      const next: State = {};
      for (const counterId of Object.keys(state)) {
        const current = state[counterId];
        if (
          current.studyPacks.length === 0 ||
          (current.studyPacks.length === 1 &&
            current.studyPacks[0] === action.studyPack.packId)
        ) {
          continue;
        }

        if (current.studyPacks.indexOf(action.studyPack.packId) < 0) {
          next[counterId] = current;
          continue;
        }

        next[counterId] = {
          studyPacks: without(current.studyPacks, action.studyPack.packId),
          counter: current.counter
        };
      }

      return next;
    }
    case "enable-study-pack": {
      const next = { ...state };
      for (const counter of action.studyPack.counters) {
        const current = next[counter.counterId];
        if (
          current &&
          current.studyPacks.indexOf(action.studyPack.packId) >= 0
        ) {
          continue;
        }

        next[counter.counterId] = {
          studyPacks: current
            ? [...current.studyPacks, action.studyPack.packId]
            : [action.studyPack.packId],
          counter
        };
      }

      return next;
    }
    default:
      return state;
  }
}
