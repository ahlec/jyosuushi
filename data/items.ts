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

const ITEM_MINUTE: Item = {
  counters: ["minute"],
  englishPlural: "minutes",
  englishSingular: "minute",
  itemId: "minute",
  maxQuantity: 100,
  minQuantity: 1
};

export const ITEMS_FROM_COUNTER: {
  [counterId: string]: ReadonlyArray<Item>;
} = {
  "days of the month": [ITEM_DAY_OF_THE_MONTH],
  minute: [ITEM_MINUTE]
};
