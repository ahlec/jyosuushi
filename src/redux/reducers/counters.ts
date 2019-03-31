import { ActionChangeStudyPacks } from "../actions";
import { CountersState } from "../index";

type ReducerAction = ActionChangeStudyPacks;

export default function countersReducer(
  state: CountersState | undefined = {},
  action: ReducerAction
): CountersState {
  switch (action.type) {
    case "change-study-packs": {
      const next: CountersState = {};
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
