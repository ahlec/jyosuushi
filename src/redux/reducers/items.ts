import { ITEMS_FROM_COUNTER } from "../../../data/items";
import { ActionStartQuiz } from "../actions";
import { ItemsState } from "../index";

type ReducerAction = ActionStartQuiz;

export default function itemsReducer(
  state: ItemsState | undefined = {},
  action: ReducerAction
): ItemsState {
  switch (action.type) {
    case "start-quiz": {
      const next: ItemsState = {};
      for (const { counters } of action.enabledPacks) {
        for (const { counterId } of counters) {
          const items = ITEMS_FROM_COUNTER[counterId];
          for (const item of items) {
            next[item.itemId] = item;
          }
        }
      }

      return next;
    }
    default:
      return state;
  }
}
