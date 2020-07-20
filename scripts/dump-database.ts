import chalk from "chalk";

import Database from "./database/Database";

async function main(): Promise<void> {
  try {
    const db = await Database.open();
    await db.dump();
    await db.close();
  } catch (err) {
    console.error(
      chalk.red.bold("ERROR."),
      err instanceof Error ? err.message : JSON.stringify(err)
    );
    if (err instanceof Error && err.stack) {
      console.error(err.stack);
    }
    process.exit(1);
  }
}

main();
