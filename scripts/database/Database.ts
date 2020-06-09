import { execSync } from "child_process";
import { existsSync, readFileSync, unlinkSync, writeFileSync } from "fs";
import * as path from "path";
import { format as formatSql } from "sql-formatter";
import { Database as SQLiteDatabase, open as openSQLite } from "sqlite";
import sqlite3 from "sqlite3";

import {
  SchemaEntryTypes,
  Schemas,
  DbCounterAdditionalReading,
  DbCounterDisambiguation,
  DbCounterExternalLink,
  DbCounterIrregular,
  DbCounterReading,
  DbCounter,
  DbEnumExternalLinkLanguage,
  DbEnumIrregularType,
  DbEnumWordOrigin,
  DbItemCounter,
  DbItem,
  DbStudyPackContent,
  DbStudyPack,
  EnumSchemas,
  DbCounterAlternativeKanji,
  DbWagoStyle
} from "./schemas";

const ROOT_DIRECTORY = path.resolve(__dirname, "../../");
const RELATIVE_SQL_DIRECTORY = "./sql";
const SQL_DIRECTORY = path.resolve(ROOT_DIRECTORY, RELATIVE_SQL_DIRECTORY);
const DATABASE_FILE = path.resolve(ROOT_DIRECTORY, "jyosuushi.sqlite");

export type DatabaseSnapshot = {
  [schema in Schemas | EnumSchemas]: ReadonlyArray<SchemaEntryTypes[schema]>;
};

type AsyncDatabaseIndexer = {
  [schema in Schemas | EnumSchemas]: Promise<
    ReadonlyArray<SchemaEntryTypes[schema]>
  >;
};

const ALL_SCHEMAS: ReadonlyArray<Schemas | EnumSchemas> = [
  ...Object.values(Schemas),
  ...Object.values(EnumSchemas)
];

function formatSqlValueForDump(value: unknown): string {
  if (value === null) {
    return "NULL";
  }

  if (typeof value === "number") {
    return value.toString();
  }

  if (typeof value === "string") {
    return `'${value.replace(/'/gm, "''")}'`;
  }

  console.log(value);
  throw new Error(`Unrecognized value type: ${typeof value}`);
}

export default class Database implements AsyncDatabaseIndexer {
  public static async create(): Promise<Database> {
    if (existsSync(DATABASE_FILE)) {
      unlinkSync(DATABASE_FILE);
    }

    const db = await openSQLite({
      driver: sqlite3.Database,
      filename: DATABASE_FILE
    });
    for (const schema of ALL_SCHEMAS) {
      const file = path.resolve(SQL_DIRECTORY, `./${schema}.sql`);
      const sql = readFileSync(file);

      await db.exec(sql.toString());
    }

    return new Database(db);
  }

  public static async open(): Promise<Database> {
    const db = await openSQLite({
      driver: sqlite3.Database,
      filename: DATABASE_FILE
    });
    return new Database(db);
  }

  private constructor(private readonly connection: SQLiteDatabase) {}

  public get counter_additional_readings(): Promise<
    ReadonlyArray<DbCounterAdditionalReading>
  > {
    return this.retrieve(Schemas.CounterAdditionalReadings);
  }

  public get counter_alternative_kanji(): Promise<
    ReadonlyArray<DbCounterAlternativeKanji>
  > {
    return this.retrieve(Schemas.CounterAlternativeKanji);
  }

  public get counter_disambiguations(): Promise<
    ReadonlyArray<DbCounterDisambiguation>
  > {
    return this.retrieve(Schemas.CounterDisambiguations);
  }

  public get counter_external_links(): Promise<
    ReadonlyArray<DbCounterExternalLink>
  > {
    return this.retrieve(Schemas.CounterExternalLinks);
  }

  public get counter_irregulars(): Promise<ReadonlyArray<DbCounterIrregular>> {
    return this.retrieve(Schemas.CounterIrregulars);
  }

  public get counter_readings(): Promise<ReadonlyArray<DbCounterReading>> {
    return this.retrieve(Schemas.CounterReadings);
  }

  public get counters(): Promise<ReadonlyArray<DbCounter>> {
    return this.retrieve(Schemas.Counters);
  }

  public get enum_external_link_language(): Promise<
    ReadonlyArray<DbEnumExternalLinkLanguage>
  > {
    return this.retrieve(EnumSchemas.EnumExternalLinkLanguage);
  }

  public get enum_irregular_type(): Promise<
    ReadonlyArray<DbEnumIrregularType>
  > {
    return this.retrieve(EnumSchemas.EnumIrregularType);
  }

  public get enum_word_origin(): Promise<ReadonlyArray<DbEnumWordOrigin>> {
    return this.retrieve(EnumSchemas.EnumWordOrigin);
  }

  public get item_counters(): Promise<ReadonlyArray<DbItemCounter>> {
    return this.retrieve(Schemas.ItemCounters);
  }

  public get items(): Promise<ReadonlyArray<DbItem>> {
    return this.retrieve(Schemas.Items);
  }

  public get study_pack_contents(): Promise<ReadonlyArray<DbStudyPackContent>> {
    return this.retrieve(Schemas.StudyPackContents);
  }

  public get study_packs(): Promise<ReadonlyArray<DbStudyPack>> {
    return this.retrieve(Schemas.StudyPacks);
  }

  public get wago_style(): Promise<ReadonlyArray<DbWagoStyle>> {
    return this.retrieve(Schemas.WagoStyle);
  }

  public async getSnapshot(): Promise<DatabaseSnapshot> {
    const snapshot: any = {};

    const asyncTasks = Object.values(Schemas).map(async schema => {
      const rows = await this.retrieve(schema);
      snapshot[schema] = rows;
    });
    await Promise.all(asyncTasks);

    return snapshot as DatabaseSnapshot;
  }

  public async hasUncommittedChanges(): Promise<boolean> {
    for (const schema of Object.values(Schemas)) {
      // Get the .sql file at HEAD
      const headSql = execSync(
        `git show HEAD:${RELATIVE_SQL_DIRECTORY}/${schema}.sql`
      ).toString();

      // Get the current SQLite DDL
      const sqliteSql = await this.dumpTable(schema);

      // Compare
      if (headSql !== sqliteSql) {
        console.log("different:", schema);
      }
    }

    return false;
  }

  public async dump(): Promise<void> {
    for (const schema of ALL_SCHEMAS) {
      const file = path.resolve(SQL_DIRECTORY, `./${schema}.sql`);
      const sql = await this.dumpTable(schema);
      writeFileSync(file, sql);
    }
  }

  public async close(): Promise<void> {
    await this.connection.close();
  }

  private retrieve<
    TSchema extends Schemas | EnumSchemas,
    TEntry = SchemaEntryTypes[TSchema]
  >(schema: TSchema): Promise<ReadonlyArray<TEntry>> {
    return this.connection.all(`SELECT * FROM ${schema}`);
  }

  private async dumpTable(schema: Schemas | EnumSchemas): Promise<string> {
    const creation = await this.connection.get<{ sql: string }>(
      `SELECT sql FROM sqlite_master WHERE name = '${schema}'`
    );
    if (!creation) {
      throw new Error(`Could not find \`${schema}\` in sqlite_master.`);
    }

    const columns = await this.connection.all<readonly { name: string }[]>(
      `PRAGMA table_info('${schema}')`
    );
    const insertColumnsList = columns
      .map(({ name }): string => name)
      .join(", ");

    const rows = await this.connection.all<
      readonly {
        [columnName: string]: string | number;
      }[]
    >(`SELECT * FROM ${schema}`);
    const insertStatements = rows.map(
      (values): string =>
        `INSERT INTO "${schema}" (${insertColumnsList}) VALUES(${columns
          .map(({ name }): string => formatSqlValueForDump(values[name]))
          .join(", ")});`
    );

    return formatSql(
      [
        "PRAGMA foreign_keys = OFF;",
        "BEGIN TRANSACTION;",
        creation.sql.endsWith(";") ? creation.sql : `${creation.sql};`,
        ...insertStatements,
        "COMMIT;"
      ].join("\n")
    );
  }
}
