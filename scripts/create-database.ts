import Database from "./database/Database";

async function main(): Promise<void> {
  const db = await Database.create();
  await db.close();
}

main();
