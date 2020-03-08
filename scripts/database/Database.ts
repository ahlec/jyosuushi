import { execSync } from "child_process";
import { existsSync, readFileSync, unlinkSync, writeFileSync } from "fs";
import * as path from "path";
import { format as formatSql } from "sql-formatter";
import { Database as SQLiteDatabase, open as openSQLite } from "sqlite";

import {
  SchemaEntryTypes,
  Schemas,
  DbCounterAdditionalReading,
  DbCounterDisambiguation,
  DbCounterExternalLink,
  DbCounterIrregular,
  DbCounterReading,
  DbCounter,
  DbEnumWagoRange,
  DbEnumWordOrigin,
  DbItemCounter,
  DbItem,
  DbStudyPackContent,
  DbStudyPack,
  EnumSchemas,
  DbCounterAlternativeKanji
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

export default class Database implements AsyncDatabaseIndexer {
  public static async create(): Promise<Database> {
    if (existsSync(DATABASE_FILE)) {
      unlinkSync(DATABASE_FILE);
    }

    const db = await openSQLite(DATABASE_FILE, { promise: Promise });
    for (const schema of ALL_SCHEMAS) {
      const file = path.resolve(SQL_DIRECTORY, `./${schema}.sql`);
      const sql = readFileSync(file);

      await db.exec(sql.toString());
    }

    return new Database(db);
  }

  public static async open(): Promise<Database> {
    const db = await openSQLite(DATABASE_FILE, { promise: Promise });
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

  public get enum_wago_range(): Promise<ReadonlyArray<DbEnumWagoRange>> {
    return this.retrieve(EnumSchemas.EnumWagoRange);
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
      const sqliteSql = this.dumpTable(schema);

      // Compare
      if (headSql !== sqliteSql) {
        console.log("different:", schema);
      }
    }

    return false;
  }

  public dump(): void {
    for (const schema of ALL_SCHEMAS) {
      const file = path.resolve(SQL_DIRECTORY, `./${schema}.sql`);
      const sql = this.dumpTable(schema);
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

  private dumpTable(schema: Schemas | EnumSchemas): string {
    const rawSql = execSync(`sqlite3 ${DATABASE_FILE} ".dump '${schema}'"`);
    return formatSql(rawSql.toString());
  }
}
