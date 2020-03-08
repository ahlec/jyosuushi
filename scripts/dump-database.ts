import Database from "./database/Database";

async function main(): Promise<void> {
  const db = await Database.open();
  db.dump();
  await db.close();
}

main();
