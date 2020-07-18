import { sortBy } from "lodash";
import { Writable } from "stream";

import { DbItemCounter } from "../database/schemas";
import ValidatedDataSource from "../database/ValidatedDataSource";

import { Item, ItemCounter } from "../../src/client/interfaces";

import { WriteFileResults } from "./types";
import { getItemId, productionStringify, ProductionVariable } from "./utils";

function getProductionRelevance(db: DbItemCounter): string {
  switch (db.relevance) {
    case null:
    case "unknown": {
      return "CounterItemRelevance.Unknown";
    }
    case "rare": {
      return "CounterItemRelevance.RarelyUsed";
    }
    case "situational": {
      return "CounterItemRelevance.Situational";
    }
    case "common": {
      return "CounterItemRelevance.Common";
    }
    case "best": {
      return "CounterItemRelevance.Best";
    }
  }
}

type ProtoItemCounter = Omit<ItemCounter, "relevance"> & {
  relevance: ProductionVariable;
};

type ProtoItem = Omit<Item, "counters"> & {
  counters: ReadonlyArray<ProtoItemCounter>;
};

function convertToProductionCounterLink(db: DbItemCounter): ProtoItemCounter {
  return {
    counterId: db.counter_id,
    relevance: new ProductionVariable(getProductionRelevance(db)),
  };
}

function convertToItemVariable(db: DbItemCounter): ProductionVariable {
  return new ProductionVariable(getItemId(db.item_id));
}

export default function writeItemsFile(
  stream: Writable,
  dataSource: ValidatedDataSource
): WriteFileResults {
  stream.write(
    'import { CounterItemRelevance, Item } from "@jyosuushi/interfaces";'
  );

  const countersLookup: { [itemId: string]: DbItemCounter[] } = {};
  const itemsFromCounterLookup: { [counterId: string]: DbItemCounter[] } = {};
  for (const itemCounter of dataSource.item_counters.valid) {
    if (!countersLookup[itemCounter.item_id]) {
      countersLookup[itemCounter.item_id] = [];
    }

    countersLookup[itemCounter.item_id].push(itemCounter);

    if (!itemsFromCounterLookup[itemCounter.counter_id]) {
      itemsFromCounterLookup[itemCounter.counter_id] = [];
    }

    itemsFromCounterLookup[itemCounter.counter_id].push(itemCounter);
  }

  const sortedItems = sortBy(dataSource.items.valid, ["item_id"]);
  for (const dbItem of sortedItems) {
    const variableName = getItemId(dbItem.item_id);

    const item: ProtoItem = {
      counters: (countersLookup[dbItem.item_id] || []).map(
        convertToProductionCounterLink
      ),
      englishPlural: dbItem.english_plural,
      englishSingular: dbItem.english_singular,
      itemId: dbItem.item_id,
      maxQuantity: dbItem.custom_max_amount || 100,
      minQuantity: dbItem.custom_min_amount || 1,
    };

    stream.write(
      `\n\nconst ${variableName}: Item = ${productionStringify(item)};`
    );
  }

  stream.write("\n\n");

  const lookup = sortedItems.reduce(
    (obj: { [itemId: string]: ProductionVariable }, { item_id }) => {
      obj[item_id] = new ProductionVariable(getItemId(item_id));
      return obj;
    },
    {}
  );
  stream.write(
    `export const ITEMS_LOOKUP: { [itemId: string]: Item; } = ${productionStringify(
      lookup
    )};`
  );

  const itemsFromCounter = sortBy(Object.keys(itemsFromCounterLookup)).reduce(
    (
      obj: { [counterId: string]: ReadonlyArray<ProductionVariable> },
      counterId
    ) => {
      obj[counterId] = itemsFromCounterLookup[counterId].map(
        convertToItemVariable
      );
      return obj;
    },
    {}
  );
  stream.write(
    `\nexport const ITEMS_FROM_COUNTER: { [counterId: string]: ReadonlyArray<Item>; } = ${productionStringify(
      itemsFromCounter
    )};`
  );

  return {
    additionalFileRequests: [],
    output: [],
  };
}
