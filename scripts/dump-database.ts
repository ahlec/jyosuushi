import Database from "./database/Database";

async function main() {
  const db = await Database.open();
  db.dump();
  await db.close();
}

main();
