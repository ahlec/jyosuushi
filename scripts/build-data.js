const fs = require("fs");
const path = require("path");
const sqlite = require("sqlite");

const ROOT_DIRECTORY = path.resolve(__dirname, "..");
const DATABASE_FILE = path.resolve(ROOT_DIRECTORY, "jyosuushi.sqlite");
const DATA_DIRECTORY = path.resolve(ROOT_DIRECTORY, "data");
const COUNTERS_FILE = path.resolve(DATA_DIRECTORY, "counters.ts");
const ITEMS_FILE = path.resolve(DATA_DIRECTORY, "items.ts");
const STUDY_PACKS_FILE = path.resolve(DATA_DIRECTORY, "studyPacks.ts");

const FILE_HEADER_COMMENT = `// DO NOT HAND-MODIFY THIS FILE!!
// This file was built using \`yarn build-data\` from the SQLite database.
// Modifications will be lost if they are made manually and not through the database.\n\n`;

function getVariableFromId(prefix, id) {
  return prefix + id.toUpperCase().replace(/[^A-Z0-9]+/g, "_");
}

function getCounterId(id) {
  return getVariableFromId("COUNTER_", id);
}

function getItemId(id) {
  return getVariableFromId("ITEM_", id);
}

function getStudyPackId(id) {
  return getVariableFromId("STUDY_PACK_", id);
}

// Counters
async function writeCounterData(file, counter, irregulars) {
  const variableName = getCounterId(counter.counter_id);
  let irregularsStr;
  if (irregulars && Object.keys(irregulars).length) {
    irregularsStr = "{\n";
    const amounts = Object.keys(irregulars);
    for (let index = 0; index < amounts.length; ++index) {
      const amount = amounts[index];
      const kana = irregulars[amount];
      irregularsStr += `    ${amount}: "${kana}"`;
      if (index < amounts.length - 1) {
        irregularsStr += ",\n";
      }
    }

    irregularsStr += "\n  }";
  } else {
    irregularsStr = "{}";
  }

  fs.writeSync(
    file,
    `\n\nexport const ${variableName}: Counter = {
  counterId: "${counter.counter_id}",
  englishName: "${counter.english_name}",
  irregulars: ${irregularsStr},
  kana: "${counter.kana}",
  kanji: "${counter.kanji}"
};`
  );
}

async function writeCountersFile(db) {
  const counters = await db.all(
    "SELECT * FROM counters ORDER BY counter_id ASC"
  );
  const irregulars = await db.all("SELECT * FROM counter_irregulars");

  const irregularsLookup = {};
  for (const irregular of irregulars) {
    if (!irregularsLookup[irregular.counter_id]) {
      irregularsLookup[irregular.counter_id] = {};
    }

    irregularsLookup[irregular.counter_id][parseInt(irregular.number)] =
      irregular.kana;
  }

  const file = fs.openSync(COUNTERS_FILE, "w");
  fs.writeSync(file, FILE_HEADER_COMMENT);

  fs.writeSync(file, 'import { Counter } from "../src/redux";');
  for (const counter of counters) {
    writeCounterData(file, counter, irregularsLookup[counter.counter_id]);
  }

  fs.writeSync(file, "\n");
  fs.closeSync(file);
}

// Items
function writeItemData(file, item, counters) {
  const variableName = getItemId(item.item_id);
  let countersStr = "[\n";
  for (let index = 0; index < counters.length; ++index) {
    countersStr += `  "${counters[index]}"`;

    if (index < counters.length - 1) {
      countersStr += ",\n";
    }
  }

  countersStr += "\n  ]";

  fs.writeSync(
    file,
    `\n\nconst ${variableName}: Item = {
  counters: ${JSON.stringify(counters)},
  englishPlural: "${item.english_plural}",
  englishSingular: "${item.english_singular}",
  itemId: "${item.item_id}",
  maxQuantity: ${item.custom_max_amount || 100},
  minQuantity: ${item.custom_min_amount || 1}
};`
  );
}

async function writeItemsFile(db) {
  const items = await db.all("SELECT * FROM items ORDER BY item_id ASC");
  const itemCounters = await db.all("SELECT * FROM item_counters");
  const itemsToCounters = {};
  const countersToItems = {};
  for (const itemCounter of itemCounters) {
    if (!itemsToCounters[itemCounter.item_id]) {
      itemsToCounters[itemCounter.item_id] = [];
    }

    itemsToCounters[itemCounter.item_id].push(itemCounter.counter_id);

    if (!countersToItems[itemCounter.counter_id]) {
      countersToItems[itemCounter.counter_id] = [];
    }

    countersToItems[itemCounter.counter_id].push(itemCounter.item_id);
  }

  const file = fs.openSync(ITEMS_FILE, "w");
  fs.writeSync(file, FILE_HEADER_COMMENT);

  fs.writeSync(file, 'import { Item } from "../src/redux";');

  for (const item of items) {
    if (!itemsToCounters[item.item_id]) {
      continue;
    }

    writeItemData(file, item, itemsToCounters[item.item_id]);
  }

  fs.writeSync(file, "\n\nexport const ITEMS_FROM_COUNTER: {\n");
  fs.writeSync(file, "  [counterId: string]: ReadonlyArray<Item>;\n");
  fs.writeSync(file, "} = {\n");
  let hasWrittenFirst = false;
  const orderedCounters = Object.keys(countersToItems);
  orderedCounters.sort();
  for (const counterId of orderedCounters) {
    if (hasWrittenFirst) {
      fs.writeSync(file, ",\n");
    } else {
      hasWrittenFirst = true;
    }

    let entryKey;
    if (/^[a-zA-Z0-9]*$/.test(counterId)) {
      entryKey = counterId;
    } else {
      entryKey = `"${counterId}"`;
    }

    fs.writeSync(
      file,
      `  ${entryKey}: [${countersToItems[counterId]
        .map(itemId => getItemId(itemId))
        .join(", ")}]`
    );
  }

  fs.writeSync(file, "\n};\n");
  fs.closeSync(file);
}

// study packs
function writeStudyPackData(file, studyPack, counters) {
  counters.sort();

  const variableName = getStudyPackId(studyPack.pack_id);
  let countersStr = "[\n";
  for (let index = 0; index < counters.length; ++index) {
    countersStr += `    COUNTERS.${getCounterId(counters[index])}`;
    if (index < counters.length - 1) {
      countersStr += ",\n";
    }
  }

  countersStr += "\n  ]";

  fs.writeSync(
    file,
    `\n\nconst ${variableName}: StudyPack = {
  counters: ${countersStr},
  englishName: "${studyPack.english_name}",
  packId: "${studyPack.pack_id}"
};`
  );
}

async function writeStudyPacksFile(db) {
  const studyPacks = await db.all(
    "SELECT * FROM study_packs ORDER BY pack_id ASC"
  );
  const contents = await db.all("SELECT * FROM study_pack_contents");
  const itemCounters = await db.all("SELECT * FROM item_counters");

  const hasItem = new Set();
  for (const itemCounter of itemCounters) {
    hasItem.add(itemCounter.counter_id);
  }

  const countersLookup = {};
  for (const content of contents) {
    if (!hasItem.has(content.counter_id)) {
      continue;
    }

    if (!countersLookup[content.pack_id]) {
      countersLookup[content.pack_id] = [];
    }

    countersLookup[content.pack_id].push(content.counter_id);
  }

  const file = fs.openSync(STUDY_PACKS_FILE, "w");
  fs.writeSync(file, FILE_HEADER_COMMENT);

  fs.writeSync(file, 'import { StudyPack } from "../src/redux";\n');
  fs.writeSync(file, 'import * as COUNTERS from "./counters";');
  for (const studyPack of studyPacks) {
    if (!countersLookup[studyPack.pack_id]) {
      continue;
    }

    writeStudyPackData(file, studyPack, countersLookup[studyPack.pack_id]);
  }

  fs.writeSync(
    file,
    "\n\nexport const STUDY_PACKS: ReadonlyArray<StudyPack> = [\n"
  );
  let hasWrittenFirst = false;
  for (const studyPack of studyPacks) {
    if (!countersLookup[studyPack.pack_id]) {
      continue;
    }

    if (hasWrittenFirst) {
      fs.writeSync(file, ",\n");
    } else {
      hasWrittenFirst = true;
    }

    fs.writeSync(file, `  ${getStudyPackId(studyPack.pack_id)}`);
  }
  fs.writeSync(file, "\n];");

  fs.writeSync(file, "\n\nexport const STUDY_PACK_LOOKUP: {\n");
  fs.writeSync(file, "  [packId: string]: StudyPack;\n");
  fs.writeSync(file, "} = {\n");
  hasWrittenFirst = false;
  for (const studyPack of studyPacks) {
    if (!countersLookup[studyPack.pack_id]) {
      continue;
    }

    if (hasWrittenFirst) {
      fs.writeSync(file, ",\n");
    } else {
      hasWrittenFirst = true;
    }

    let entryKey;
    if (/^[a-zA-Z0-9]*$/.test(studyPack.pack_id)) {
      entryKey = studyPack.pack_id;
    } else {
      entryKey = `"${studyPack.pack_id}"`;
    }

    fs.writeSync(file, `  ${entryKey}: ${getStudyPackId(studyPack.pack_id)}`);
  }

  fs.writeSync(file, "\n};\n");
  fs.closeSync(file);
}

async function main() {
  const db = await sqlite.open(DATABASE_FILE, { Promise });
  await writeCountersFile(db);
  await writeItemsFile(db);
  await writeStudyPacksFile(db);
  await db.close();
}

main();
