import chalk from "chalk";
import fs from "fs";
import { WritableStream } from "memory-streams";
import path from "path";
import prettier from "prettier";

import Database from "../database/Database";
import ValidatedDataSource from "../database/ValidatedDataSource";

import writeCountersFile from "./counters/write-file";
import writeItemsFile from "./items-file";
import writeStudyPacksFile from "./study-packs-file";
import {
  ExportOutputEntry,
  FileExportRequest,
  WriteFileResults,
} from "./types";
import { DATA_DIRECTORY } from "./utils";

const FILE_HEADER_COMMENT = `// DO NOT HAND-MODIFY THIS FILE!!
// This file was built using \`yarn build-data\` from the SQLite database.
// Modifications will be lost if they are made manually and not through the database.\n\n`;

function exportFile(
  file: FileExportRequest,
  dataSource: ValidatedDataSource
): WriteFileResults {
  const stream = new WritableStream();
  const writeResults = file.writeFunction(stream, dataSource);

  const rawJavaScript = `${FILE_HEADER_COMMENT}${stream.toString()}`;
  const javaScript = prettier.format(rawJavaScript, { parser: "typescript" });

  const filename = path.resolve(DATA_DIRECTORY, file.relativeFilepath);
  const directory = path.dirname(filename);
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }

  fs.writeFileSync(filename, javaScript);
  return writeResults;
}

interface ExportFileOutput {
  relativeFilepath: string;
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
  console.log(`[${chalk.greenBright(output.relativeFilepath)}]`);
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
      relativeFilepath: "counters.ts",
      writeFunction: writeCountersFile,
    },
    {
      relativeFilepath: "items.ts",
      writeFunction: writeItemsFile,
    },
    {
      relativeFilepath: "studyPacks.ts",
      writeFunction: writeStudyPacksFile,
    },
  ];

  const output: ExportFileOutput[] = [];
  while (queue.length) {
    const file = queue.pop();
    if (!file) {
      break;
    }

    const result = exportFile(file, dataSource);
    if (result.output.length) {
      output.push({
        outputEntries: result.output,
        relativeFilepath: file.relativeFilepath,
      });
    }

    queue.push(...result.additionalFileRequests);
  }

  output.forEach(printFileOutput);
}

main();
