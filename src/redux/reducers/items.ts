import { ActionDefineSet } from "../actions";
import { Item } from "../index";

interface State {
  [itemId: string]: Item;
}

type ReducerAction = ActionDefineSet;

export default function itemsReducer(
  state: State | undefined = {},
  action: ReducerAction
): State {
  switch (action.type) {
    case "define-set": {
      const next: State = { ...state };
      let madeChange = false;
      for (const item of action.items) {
        if (next.hasOwnProperty(item.itemId)) {
          continue;
        }

        next[item.itemId] = item;
        madeChange = true;
      }

      if (!madeChange) {
        return state;
      }

      return next;
    }
    default:
      return state;
  }
}
