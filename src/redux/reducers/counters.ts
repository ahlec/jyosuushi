import { ActionChangeStudyPacks } from "../actions";
import { CountersStateItem } from "../index";

interface State {
  [counterId: string]: CountersStateItem;
}

type ReducerAction = ActionChangeStudyPacks;

export default function countersReducer(
  state: State | undefined = {},
  action: ReducerAction
): State {
  switch (action.type) {
    case "change-study-packs": {
      const next: State = {};
      for (const { counters, packId } of action.enabledPacks) {
        for (const counter of counters) {
          if (next[counter.counterId]) {
            next[counter.counterId] = {
              studyPacks: [...next[counter.counterId].studyPacks, packId],
              counter
            };
          } else {
            next[counter.counterId] = {
              studyPacks: [packId],
              counter
            };
          }
        }
      }

      return next;
    }
    default:
      return state;
  }
}
