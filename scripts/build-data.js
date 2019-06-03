const fs = require("fs");
const path = require("path");
const sqlite = require("sqlite");

const ROOT_DIRECTORY = path.resolve(__dirname, "..");
const DATABASE_FILE = path.resolve(ROOT_DIRECTORY, "jyosuushi.sqlite");
const DATA_DIRECTORY = path.resolve(ROOT_DIRECTORY, "data");
const COUNTERS_FILE = path.resolve(DATA_DIRECTORY, "counters.ts");

function getVariableFromId(prefix, id) {
  return prefix + id.toUpperCase().replace(/[^A-Z0-9]+/g, "_");
}

// Counters
async function writeCounterData(file, counter, irregulars) {
  const variableName = getVariableFromId("COUNTER_", counter.counter_id);
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

  fs.writeSync(file, 'import { Counter } from "../src/redux";');
  for (const counter of counters) {
    writeCounterData(file, counter, irregularsLookup[counter.counter_id]);
  }

  fs.writeSync(file, "\n");
  fs.closeSync(file);
}

async function main() {
  const db = await sqlite.open(DATABASE_FILE, { Promise });
  await writeCountersFile(db);
  await db.close();
}

main();
