const chalk = require("chalk");
const { execSync } = require("child_process");
const { DATABASE_FILE, SQL_FILES } = require("./utils");

for (const { table, file } of SQL_FILES) {
  execSync(`sqlite3 ${DATABASE_FILE} ".dump '${table}'" > ${file}`);
}
