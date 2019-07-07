const chalk = require("chalk");
const { openDatabase } = require("./utils");

const AUDITORS = [
  require("./auditors/counters-in-packs-without-items"),
  require("./auditors/counters-without-packs")
];

async function runAuditor(auditor, db) {
  const results = await auditor.run(db);
  console.log(`[${chalk.green(auditor.name)}]`);
  let fatalError = false;
  for (const { id, message, type } of results) {
    let styledId;
    switch (type) {
      case "error": {
        fatalError = true;
        styledId = chalk.red(id);
        break;
      }
      case "warning": {
        styledId = chalk.yellow(id);
        break;
      }
      default: {
        throw new Error(`Unrecognized result type: '${type}'`);
      }
    }

    console.log(`  > [${styledId}] ${message}`);
  }

  if (!results.length) {
    console.log("No results");
  }

  console.log();

  return fatalError;
}

async function main() {
  const db = await openDatabase();

  let fatalError = false;
  for (const auditor of AUDITORS) {
    const encounteredFatalError = await runAuditor(auditor, db);
    fatalError |= encounteredFatalError;
  }

  await db.close();

  if (fatalError) {
    process.exit(1);
  }
}

main();
