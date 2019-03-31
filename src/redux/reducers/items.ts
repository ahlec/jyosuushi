import { ITEMS_FROM_COUNTER } from "../../data/items";
import { ActionChangeStudyPacks } from "../actions";
import { Item } from "../index";

type ReducerAction = ActionChangeStudyPacks;

export default function itemsReducer(
  state: ReadonlyArray<Item> | undefined = [],
  action: ReducerAction
): ReadonlyArray<Item> {
  switch (action.type) {
    case "change-study-packs": {
      const next = new Set<Item>();
      for (const { counters } of action.enabledPacks) {
        for (const { counterId } of counters) {
          const items = ITEMS_FROM_COUNTER[counterId];
          for (const item of items) {
            next.add(item);
          }
        }
      }

      return Array.from(next);
    }
    default:
      return state;
  }
}
