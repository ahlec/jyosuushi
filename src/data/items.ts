import { Counter, Item } from "../redux";
import {
  COUNTER_DAYS_OF_MONTH,
  COUNTER_HOURS,
  COUNTER_LONG_THIN,
  COUNTER_MINUTES,
  COUNTER_PEOPLE_MEI,
  COUNTER_PEOPLE_NIN
} from "./counters";

interface ItemDefinition {
  counters: ReadonlyArray<Counter>;
  plural?: string;
  minQuantity?: number;
  maxQuantity?: number;
}

const ITEM_DEFINITIONS: { [itemId: string]: ItemDefinition } = {
  "day of the month": {
    counters: [COUNTER_DAYS_OF_MONTH],
    plural: "days of the month",
    minQuantity: 1,
    maxQuantity: 31
  },
  hour: {
    counters: [COUNTER_HOURS]
  },
  line: {
    counters: [COUNTER_LONG_THIN]
  },
  minute: {
    counters: [COUNTER_MINUTES]
  },
  pen: {
    counters: [COUNTER_LONG_THIN]
  },
  pencil: {
    counters: [COUNTER_LONG_THIN]
  },
  person: {
    counters: [COUNTER_PEOPLE_MEI, COUNTER_PEOPLE_NIN],
    plural: "people"
  },
  river: {
    counters: [COUNTER_LONG_THIN]
  },
  road: {
    counters: [COUNTER_LONG_THIN]
  },
  rod: {
    counters: [COUNTER_LONG_THIN]
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
    singular: itemId,
    plural: itemDef.plural ? itemDef.plural : itemId + "s",
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
