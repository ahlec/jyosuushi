import { ActionStartQuiz } from "../actions";
import { CountersState } from "../index";

type ReducerAction = ActionStartQuiz;

export default function countersReducer(
  state: CountersState | undefined = {},
  action: ReducerAction
): CountersState {
  switch (action.type) {
    case "start-quiz": {
      const next: CountersState = {};
      for (const { counters, packId } of action.enabledPacks) {
        for (const counter of counters) {
          if (next[counter.counterId]) {
            next[counter.counterId] = {
              counter,
              studyPacks: [...next[counter.counterId].studyPacks, packId]
            };
          } else {
            next[counter.counterId] = {
              counter,
              studyPacks: [packId]
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
