const path = require("path");
const sqlite = require("sqlite");

const ROOT_DIRECTORY = path.resolve(__dirname, "..");
const SQL_DIRECTORY = path.resolve(ROOT_DIRECTORY, "./sql");
const DATABASE_FILE = path.resolve(ROOT_DIRECTORY, "jyosuushi2.sqlite");

async function openDatabase() {
  return sqlite.open(DATABASE_FILE, { Promise });
}

function makeSqlFile(tableName) {
  return {
    table: tableName,
    file: path.resolve(SQL_DIRECTORY, `./${tableName}.sql`)
  };
}

async function checkTableExists(db, tableName) {
  const results = await sqlite.all(
    `SELECT name FROM sqlite_master WHERE type='table' AND name='${tableName}'`
  );
  return !!results.length;
}

module.exports = {
  checkTableExists,
  DATABASE_FILE,
  ROOT_DIRECTORY,
  SQL_DIRECTORY,
  SQL_FILES: [
    makeSqlFile("counter_additional_readings"),
    makeSqlFile("counter_irregulars"),
    makeSqlFile("counters"),
    makeSqlFile("item_counters"),
    makeSqlFile("items"),
    makeSqlFile("study_pack_contents"),
    makeSqlFile("study_packs")
  ],
  openDatabase
};
