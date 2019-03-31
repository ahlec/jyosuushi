import { Counter, Item } from "../redux";
import { COUNTER_DAYS_OF_MONTH } from "./counters";

interface ItemDefinition {
  counters: ReadonlyArray<Counter>;
  singular: string;
  plural: string;
  minQuantity?: number;
  maxQuantity?: number;
}

const ITEM_DEFINITIONS: { [itemId: string]: ItemDefinition } = {
  "days-of-month": {
    counters: [COUNTER_DAYS_OF_MONTH],
    singular: "day of the month",
    plural: "days of the month",
    minQuantity: 1,
    maxQuantity: 31
  }
};

interface ItemsFromCounter {
  [counterId: string]: ReadonlyArray<Item>;
}
export const ITEMS_FROM_COUNTER: ItemsFromCounter = Object.keys(
  ITEM_DEFINITIONS
).reduce((lookup: ItemsFromCounter, itemId) => {
  const itemDef = ITEM_DEFINITIONS[itemId];
  const item: Item = {
    itemId,
    counters: itemDef.counters.map(({ counterId }) => counterId),
    singular: itemDef.singular,
    plural: itemDef.plural,
    minQuantity: itemDef.minQuantity || 1,
    maxQuantity: itemDef.maxQuantity || 1000
  };
  for (const counterId of item.counters) {
    if (lookup[counterId]) {
      lookup[counterId] = [...lookup[counterId], item];
    } else {
      lookup[counterId] = [item];
    }
  }

  return lookup;
}, {});
