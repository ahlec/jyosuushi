import chalk from "chalk";
import { clamp, repeat } from "lodash";

import Database from "./database/Database";
import {
  ENTRY_IDENTIFIERS_RETRIEVER,
  IdentifierField,
  SchemaEntryTypes,
  Schemas
} from "./database/schemas";
import ValidatedDataSource, {
  InvalidResultEntry
} from "./database/ValidatedDataSource";

const LINE_WIDTH = 80;
const MIN_INDENTATION = 6;
const MAX_INDENTATION = 20;

interface InvalidEntry {
  schema: Schemas;
  id: ReadonlyArray<IdentifierField>;
  reasons: ReadonlyArray<string>;
}

function appendInvalidEntries<TSchema extends Schemas>(
  schema: TSchema,
  dbEntries: ReadonlyArray<InvalidResultEntry<SchemaEntryTypes[TSchema]>>,
  arr: InvalidEntry[]
): void {
  for (const dbEntry of dbEntries) {
    const auditableReasons = dbEntry.reasons.filter(
      ({ showsInAudit }) => showsInAudit
    );
    if (auditableReasons.length) {
      arr.push({
        id: ENTRY_IDENTIFIERS_RETRIEVER[schema](dbEntry.entry as any), // TODO: Better typing
        reasons: auditableReasons.map(({ text }) => text),
        schema
      });
    }
  }
}

function printInvalidEntry(entry: InvalidEntry): void {
  const firstLine = [
    ` * [${chalk.cyan(entry.schema)}]`,
    ...entry.id.map(({ name, value }) => `[${name}: ${chalk.cyan(value)}]`)
  ].join("");
  const isFirstEntryOnSameLine =
    firstLine.length + entry.reasons[0].length <= LINE_WIDTH;
  let indentationLength: number;
  if (isFirstEntryOnSameLine) {
    indentationLength = clamp(
      firstLine.length + 2,
      MIN_INDENTATION,
      MAX_INDENTATION
    );
  } else {
    indentationLength = MIN_INDENTATION;
    console.log(firstLine);
  }

  const indentation = repeat(" ", indentationLength - 1) + "-";
  for (let index = 0; index < entry.reasons.length; ++index) {
    if (index === 0 && isFirstEntryOnSameLine) {
      console.log(firstLine, entry.reasons[index]);
    } else {
      console.log(indentation, entry.reasons[index]);
    }
  }
}

async function main(): Promise<void> {
  const db = await Database.open();
  const validated = await ValidatedDataSource.validate(db);
  await db.close();

  const errors: InvalidEntry[] = [];
  const warnings: InvalidEntry[] = [];
  for (const schema of Object.values(Schemas)) {
    const all = validated.getSchema(schema);
    appendInvalidEntries(schema, all.error, errors);
    appendInvalidEntries(schema, all.ignored, warnings);
  }

  console.log(`[${chalk.red.underline("ERRORS")}] (${errors.length})`);
  if (errors.length) {
    errors.forEach(printInvalidEntry);
  } else {
    console.log("No errors detected");
  }

  console.log();
  console.log(`[${chalk.yellow.underline("WARNINGS")}] (${warnings.length})`);
  if (warnings.length) {
    warnings.forEach(printInvalidEntry);
  } else {
    console.log("No warnings detected");
  }

  process.exit(errors.length);
}

main();
