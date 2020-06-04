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
  InvalidResultEntry,
  Warning
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

function getHashKeyFromIdentifierFields(
  fields: ReadonlyArray<IdentifierField>
): string {
  return fields.map(({ value }): string => value).join("|");
}

function groupAndAppendWarnings<TSchema extends Schemas>(
  schema: TSchema,
  warnings: ReadonlyArray<Warning<SchemaEntryTypes[TSchema]>>,
  arr: InvalidEntry[]
): void {
  const lookup: {
    [key: string]: {
      readonly id: ReadonlyArray<IdentifierField>;
      warnings: string[];
    };
  } = {};

  for (const warning of warnings) {
    const id = ENTRY_IDENTIFIERS_RETRIEVER[schema](warning.entry as any);
    const lookupKey = getHashKeyFromIdentifierFields(id);
    if (!lookup[lookupKey]) {
      lookup[lookupKey] = {
        id,
        warnings: []
      };
    }

    lookup[lookupKey].warnings.push(warning.text);
  }

  const grouped = Object.values(lookup);
  for (const group of grouped) {
    arr.push({
      id: group.id,
      reasons: group.warnings,
      schema
    });
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
  const ignored: InvalidEntry[] = [];
  const warnings: InvalidEntry[] = [];
  for (const schema of Object.values(Schemas)) {
    const all = validated.getSchema(schema);
    appendInvalidEntries(schema, all.error, errors);
    appendInvalidEntries(schema, all.ignored, ignored);
    groupAndAppendWarnings(schema, all.warnings, warnings);
  }

  console.log(`[${chalk.red.underline("ERRORS")}] (${errors.length})`);
  console.log(chalk.gray("Export will fail until these are fixed."));
  if (errors.length) {
    errors.forEach(printInvalidEntry);
  } else {
    console.log("No errors detected");
  }

  console.log();
  console.log(
    `[${chalk.rgb(238, 64, 0).underline("IGNORED")}] (${ignored.length})`
  );
  console.log(chalk.gray("These items won't be included in the export."));
  if (ignored.length) {
    ignored.forEach(printInvalidEntry);
  } else {
    console.log("No ignored entries");
  }

  console.log();
  console.log(`[${chalk.yellow.underline("WARNINGS")}] (${warnings.length})`);
  console.log(
    chalk.gray("These items are still exported, but should be investigated.")
  );
  if (warnings.length) {
    warnings.forEach(printInvalidEntry);
  } else {
    console.log("No warnings detected");
  }

  process.exit(errors.length);
}

main();
