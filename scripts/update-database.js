const chalk = require("chalk");
const fs = require("fs");
const logSymbols = require("log-symbols");
const path = require("path");
const {
  checkTableExists,
  openDatabase,
  SQL_DIRECTORY,
  SQL_FILES
} = require("./utils");

async function ensureMetaTables(db) {
  let exists = await checkTableExists(db, "sql_content_file_hashes");
  if (exists) {
    console.log(
      logSymbols.success,
      chalk.bold("sql_content_file_hashes"),
      "exists"
    );
    return;
  }

  console.log(
    logSymbols.info,
    "creating",
    chalk.bold("sql_content_file_hashes")
  );

  const file = path.resolve(SQL_DIRECTORY, "./sql_content_file_hashes.sql");
  const sql = fs.readFileSync(file).toString();
  await db.exec(sql);
  exists = await checkTableExists(db, "sql_content_file_hashes");
  if (!exists) {
    console.log(
      logSymbols.error,
      "could not create",
      chalk.bold("sql_content_file_hashes")
    );
    throw new Error();
  }

  console.log(
    logSymbols.success,
    "created",
    chalk.bold("sql_content_file_hashes")
  );
}

async function updateTable(db, sqlFile) {
  const sql = fs.readFileSync(file).toString();
  await db.exec(sql);
}

async function main() {
  const db = await openDatabase();

  await ensureMetaTables(db);

  // const fileUpdates = SQL_FILES.map(sqlFile => updateTable(db, sqlFile));
  // await Promise.all(fileUpdates);

  await db.close();
}

main();
