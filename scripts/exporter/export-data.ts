import chalk from "chalk";
import fs from "fs";
import { WritableStream } from "memory-streams";
import path from "path";
import prettier from "prettier";
import { Writable } from "stream";

import Database from "../database/Database";
import ValidatedDataSource from "../database/ValidatedDataSource";

import writeCountersFile from "./counters-file";
import writeDictionaryEntryComponentFile from "./dictionary-entry-component";
import writeDisambiguationsFile from "./disambiguations-file";
import writeItemsFile from "./items-file";
import writeStudyPacksFile from "./study-packs-file";
import { DbCounterDictionaryEntry } from "scripts/database/schemas";

const DATA_DIRECTORY = path.resolve(__dirname, "./../../data");
const DICTIONARY_ENTRY_COMPONENTS_DIRECTORY = path.resolve(
  DATA_DIRECTORY,
  "./dictionary-entries/"
);

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

function createDictionaryEntryComponentFile(
  dictionaryEntry: DbCounterDictionaryEntry,
  side: "japanese" | "translation"
): ExportedFile {
  let componentName: string;
  let markdown: string;
  switch (side) {
    case "japanese": {
      componentName = `DictionaryEntry${dictionaryEntry.entry_id}Jpn`;
      markdown = dictionaryEntry.japanese;
      break;
    }
    case "translation": {
      componentName = `DictionaryEntry${dictionaryEntry.entry_id}Trans`;
      markdown = dictionaryEntry.translation;
      break;
    }
  }

  return {
    filename: path.resolve(
      DICTIONARY_ENTRY_COMPONENTS_DIRECTORY,
      `./${dictionaryEntry.counter_id}/${componentName}.tsx`
    ),
    writeFunction: (stream: Writable): void =>
      writeDictionaryEntryComponentFile(stream, componentName, markdown)
  };
}

function exportFile(file: ExportedFile, dataSource: ValidatedDataSource): void {
  const stream = new WritableStream();
  file.writeFunction(stream, dataSource);

  const rawJavaScript = `${FILE_HEADER_COMMENT}${stream.toString()}`;
  const javaScript = prettier.format(rawJavaScript, { parser: "typescript" });

  const directory = path.dirname(file.filename);
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }

  fs.writeFileSync(file.filename, javaScript);
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

  const files = [...EXPORTED_FILES];
  for (const dictionaryEntry of dataSource.counter_dictionary_entries.valid) {
    files.push(createDictionaryEntryComponentFile(dictionaryEntry, "japanese"));
    files.push(
      createDictionaryEntryComponentFile(dictionaryEntry, "translation")
    );
  }

  for (const file of files) {
    exportFile(file, dataSource);
  }
}

main();
