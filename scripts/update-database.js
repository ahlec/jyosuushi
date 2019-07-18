const chalk = require("chalk");
const fs = require("fs");
const { openDatabase, SQL_FILES } = require("./utils");

async function main() {
  const db = await openDatabase();

  for (const { file } of SQL_FILES) {
    const sql = fs.readFileSync(file).toString();
    await db.exec(sql);
  }

  await db.close();
}

main();
