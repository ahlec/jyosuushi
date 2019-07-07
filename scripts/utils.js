const path = require("path");
const sqlite = require("sqlite");

const ROOT_DIRECTORY = path.resolve(__dirname, "..");
const DATABASE_FILE = path.resolve(ROOT_DIRECTORY, "jyosuushi.sqlite");

async function openDatabase() {
  return sqlite.open(DATABASE_FILE, { Promise });
}

module.exports = {
  ROOT_DIRECTORY,
  openDatabase
};
