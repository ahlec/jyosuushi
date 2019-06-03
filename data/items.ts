// DO NOT HAND-MODIFY THIS FILE!!
// This file was built using `yarn build-data` from the SQLite database.
// Modifications will be lost if they are made manually and not through the database.

import { Item } from "../src/redux";

const ITEM_DAY_OF_THE_MONTH: Item = {
  counters: ["days of the month"],
  englishPlural: "days of the month",
  englishSingular: "day of the month",
  itemId: "day of the month",
  maxQuantity: 31,
  minQuantity: 1
};

const ITEM_HOUR: Item = {
  counters: ["hour"],
  englishPlural: "hours",
  englishSingular: "hour",
  itemId: "hour",
  maxQuantity: 100,
  minQuantity: 1
};

const ITEM_LINE: Item = {
  counters: ["long, thin object"],
  englishPlural: "lines",
  englishSingular: "line",
  itemId: "line",
  maxQuantity: 100,
  minQuantity: 1
};

const ITEM_MINUTE: Item = {
  counters: ["minute"],
  englishPlural: "minutes",
  englishSingular: "minute",
  itemId: "minute",
  maxQuantity: 100,
  minQuantity: 1
};

const ITEM_PEN: Item = {
  counters: ["long, thin object"],
  englishPlural: "pens",
  englishSingular: "pen",
  itemId: "pen",
  maxQuantity: 100,
  minQuantity: 1
};

const ITEM_PENCIL: Item = {
  counters: ["long, thin object"],
  englishPlural: "pencils",
  englishSingular: "pencil",
  itemId: "pencil",
  maxQuantity: 100,
  minQuantity: 1
};

const ITEM_PERSON: Item = {
  counters: ["people-mei","people-nin"],
  englishPlural: "people",
  englishSingular: "person",
  itemId: "person",
  maxQuantity: 100,
  minQuantity: 1
};

const ITEM_RIVER: Item = {
  counters: ["long, thin object"],
  englishPlural: "rivers",
  englishSingular: "river",
  itemId: "river",
  maxQuantity: 100,
  minQuantity: 1
};

const ITEM_ROAD: Item = {
  counters: ["long, thin object"],
  englishPlural: "roads",
  englishSingular: "road",
  itemId: "road",
  maxQuantity: 100,
  minQuantity: 1
};

const ITEM_ROD: Item = {
  counters: ["long, thin object"],
  englishPlural: "rods",
  englishSingular: "rod",
  itemId: "rod",
  maxQuantity: 100,
  minQuantity: 1
};

export const ITEMS_FROM_COUNTER: {
  [counterId: string]: ReadonlyArray<Item>;
} = {
  "days of the month": [ITEM_DAY_OF_THE_MONTH],
  hour: [ITEM_HOUR],
  "long, thin object": [ITEM_LINE, ITEM_PEN, ITEM_PENCIL, ITEM_RIVER, ITEM_ROAD, ITEM_ROD],
  minute: [ITEM_MINUTE],
  "people-mei": [ITEM_PERSON],
  "people-nin": [ITEM_PERSON]
};
