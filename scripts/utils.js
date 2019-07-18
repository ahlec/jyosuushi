const path = require("path");
const sqlite = require("sqlite");

const ROOT_DIRECTORY = path.resolve(__dirname, "..");
const SQL_DIRECTORY = path.resolve(ROOT_DIRECTORY, "./sql");
const DATABASE_FILE = path.resolve(ROOT_DIRECTORY, "jyosuushi.sqlite");

async function openDatabase() {
  return sqlite.open(DATABASE_FILE, { Promise });
}

function makeSqlFile(tableName) {
  return {
    table: tableName,
    file: path.resolve(SQL_DIRECTORY, `./${tableName}.sql`)
  };
}

module.exports = {
  DATABASE_FILE,
  ROOT_DIRECTORY,
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
