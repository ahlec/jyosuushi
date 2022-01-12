import chalk from "chalk";
import fs from "fs";
import { WritableStream } from "memory-streams";
import path from "path";
import prettier from "prettier";

import { DATA_DIRECTORY, SERVER_SRC_DIRECTORY } from "../constants";
import Database from "../database/Database";
import ValidatedDataSource from "../database/ValidatedDataSource";

import writeCounterIdsFile from "./counter-ids-file";
import writeCountersFile from "./counters/write-file";
import writeItemsFile from "./items-file";
import writeStandardCollectionsFile from "./standard-collections-file";
import {
  ExportOutputEntry,
  FileExportRequest,
  WriteFileResults,
} from "./types";

const FILE_HEADER_COMMENT = `// DO NOT HAND-MODIFY THIS FILE!!
// This file was built using \`yarn db:export\` from the SQLite database.
// Modifications will be lost if they are made manually and not through the database.\n\n`;

function exportFile(
  file: FileExportRequest,
  dataSource: ValidatedDataSource
): WriteFileResults {
  const stream = new WritableStream();
  const writeResults = file.writeFunction(stream, dataSource);

  const rawJavaScript = `${FILE_HEADER_COMMENT}${stream.toString()}`;
  const javaScript = prettier.format(rawJavaScript, { parser: "typescript" });

  let filename: string;
  switch (file.directory) {
    case "client-data": {
      filename = path.resolve(DATA_DIRECTORY, file.relativeFilename);
      break;
    }
    case "server-src": {
      filename = path.resolve(SERVER_SRC_DIRECTORY, file.relativeFilename);
      break;
    }
  }

  const directory = path.dirname(filename);
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }

  fs.writeFileSync(filename, javaScript);
  return writeResults;
}

interface ExportFileOutput {
  filename: string;
  outputEntries: ReadonlyArray<ExportOutputEntry>;
}

function printExportOutputEntry(
  output: ExportOutputEntry,
  indentationLevel: number,
  bullet: string
): void {
  const indentation = "  ".repeat(indentationLevel);
  if (typeof output === "string") {
    console.log(`${indentation}${bullet}${output}`);
    return;
  }

  switch (output.type) {
    case "warning": {
      console.log(`${indentation}${bullet}${chalk.yellow(output.message)}`);
      break;
    }
    case "error": {
      console.log(`${indentation}${bullet}${chalk.red(output.message)}`);
      break;
    }
    case "group": {
      console.log(`${indentation}${chalk.blueBright(output.header)}`);
      for (const child of output.contents) {
        printExportOutputEntry(child, indentationLevel + 1, "•");
      }

      break;
    }
  }
}

function printFileOutput(output: ExportFileOutput): void {
  console.log(`[${chalk.greenBright(output.filename)}]`);
  for (const entry of output.outputEntries) {
    printExportOutputEntry(entry, 1, "");
  }
}

async function main(): Promise<void> {
  const db = await Database.open();
  const dataSource = await ValidatedDataSource.validate(db);
  await db.close();

  if (dataSource.hasErrors) {
    console.error(
      chalk.redBright("Database is in an invalid state and cannot be exported.")
    );
    console.error(
      "Use",
      chalk.cyan("yarn db:audit"),
      "to identify the problem spots."
    );

    process.exit(1);
    return;
  }

  const queue: FileExportRequest[] = [
    {
      directory: "client-data",
      relativeFilename: "counters.ts",
      writeFunction: writeCountersFile,
    },
    {
      directory: "client-data",
      relativeFilename: "items.ts",
      writeFunction: writeItemsFile,
    },
    {
      directory: "client-data",
      relativeFilename: "standard-collections.ts",
      writeFunction: writeStandardCollectionsFile,
    },
    {
      directory: "server-src",
      relativeFilename: "modules/counter-collections/counter-ids.data.ts",
      writeFunction: writeCounterIdsFile,
    },
  ];

  try {
    const output: ExportFileOutput[] = [];
    while (queue.length) {
      const file = queue.pop();
      if (!file) {
        break;
      }

      const result = exportFile(file, dataSource);
      if (result.output.length) {
        output.push({
          filename: file.relativeFilename,
          outputEntries: result.output,
        });
      }

      queue.push(...result.additionalFileRequests);
    }

    output.forEach(printFileOutput);
  } catch (err) {
    console.log(
      `${chalk.red("FATAL ERROR")}.`,
      err instanceof Error ? err.message : err
    );
    if (err instanceof Error && err.stack) {
      console.log(chalk.gray(err.stack));
    }
  }
}

main();
