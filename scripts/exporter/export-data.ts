/* tslint:disable:no-console */

import chalk from "chalk";
import fs from "fs";
import { WritableStream } from "memory-streams";
import path from "path";
import prettier from "prettier";
import { Writable } from "stream";

import Database from "../database/Database";
import ValidatedDataSource from "../database/ValidatedDataSource";

import writeCountersFile from "./counters-file";
import writeDisambiguationsFile from "./disambiguations-file";
import writeItemsFile from "./items-file";
import writeStudyPacksFile from "./study-packs-file";

const DATA_DIRECTORY = path.resolve(__dirname, "./../../data");

const FILE_HEADER_COMMENT = `// DO NOT HAND-MODIFY THIS FILE!!
// This file was built using \`yarn build-data\` from the SQLite database.
// Modifications will be lost if they are made manually and not through the database.\n\n`;

interface ExportedFile {
  filename: string;
  writeFunction: (stream: Writable, dataSource: ValidatedDataSource) => void;
}

const EXPORTED_FILES: ReadonlyArray<ExportedFile> = [
  {
    filename: path.resolve(DATA_DIRECTORY, "counters.ts"),
    writeFunction: writeCountersFile
  },
  {
    filename: path.resolve(DATA_DIRECTORY, "disambiguations.ts"),
    writeFunction: writeDisambiguationsFile
  },
  {
    filename: path.resolve(DATA_DIRECTORY, "items.ts"),
    writeFunction: writeItemsFile
  },
  {
    filename: path.resolve(DATA_DIRECTORY, "studyPacks.ts"),
    writeFunction: writeStudyPacksFile
  }
];

function exportFile(file: ExportedFile, dataSource: ValidatedDataSource) {
  const stream = new WritableStream();
  file.writeFunction(stream, dataSource);

  const rawJavaScript = `${FILE_HEADER_COMMENT}${stream.toString()}`;
  const javaScript = prettier.format(rawJavaScript, { parser: "typescript" });

  fs.writeFileSync(file.filename, javaScript);
}

async function main() {
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

  for (const file of EXPORTED_FILES) {
    exportFile(file, dataSource);
  }
}

main();
