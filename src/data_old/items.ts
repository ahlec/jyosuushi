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
  englishPlural: string;
  englishSingular: string;
  minQuantity?: number;
  maxQuantity?: number;
}

const ITEM_DEFINITIONS: { [itemId: string]: ItemDefinition } = {
  "day of the month": {
    counters: [COUNTER_DAYS_OF_MONTH],
    englishSingular: "day of the month",
    englishPlural: "days of the month",
    minQuantity: 1,
    maxQuantity: 31
  },
  hour: {
    counters: [COUNTER_HOURS],
    englishSingular: "hour",
    englishPlural: "hours"
  },
  line: {
    counters: [COUNTER_LONG_THIN],
    englishSingular: "line",
    englishPlural: "lines"
  },
  minute: {
    counters: [COUNTER_MINUTES],
    englishSingular: "minute",
    englishPlural: "minutes"
  },
  pen: {
    counters: [COUNTER_LONG_THIN],
    englishSingular: "pen",
    englishPlural: "pens"
  },
  pencil: {
    counters: [COUNTER_LONG_THIN],
    englishSingular: "pencil",
    englishPlural: "pencils"
  },
  person: {
    counters: [COUNTER_PEOPLE_MEI, COUNTER_PEOPLE_NIN],
    englishSingular: "person",
    englishPlural: "people"
  },
  river: {
    counters: [COUNTER_LONG_THIN],
    englishSingular: "river",
    englishPlural: "rivers"
  },
  road: {
    counters: [COUNTER_LONG_THIN],
    englishSingular: "road",
    englishPlural: "roads"
  },
  rod: {
    counters: [COUNTER_LONG_THIN],
    englishSingular: "rod",
    englishPlural: "rods"
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
    englishSingular: itemDef.englishSingular,
    englishPlural: itemDef.englishPlural,
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
