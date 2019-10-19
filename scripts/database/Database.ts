import { execSync } from "child_process";
import { writeFileSync } from "fs";
import * as path from "path";
import { format as formatSql } from "sql-formatter";
import { Database as SQLiteDatabase, open as openSQLite } from "sqlite";

import { SchemaEntryTypes, Schemas } from "./schemas";

const ROOT_DIRECTORY = path.resolve(__dirname, "../../");
const RELATIVE_SQL_DIRECTORY = "./sql";
const SQL_DIRECTORY = path.resolve(ROOT_DIRECTORY, RELATIVE_SQL_DIRECTORY);
const DATABASE_FILE = path.resolve(ROOT_DIRECTORY, "jyosuushi.sqlite");

export type DatabaseSnapshot = {
  [schema in Schemas]: ReadonlyArray<SchemaEntryTypes[schema]>;
};

type AsyncDatabaseIndexer = {
  [schema in Schemas]: Promise<ReadonlyArray<SchemaEntryTypes[schema]>>;
};

export default class Database implements AsyncDatabaseIndexer {
  public static async open(): Promise<Database> {
    const db = await openSQLite(DATABASE_FILE, { promise: Promise });
    return new Database(db);
  }

  private constructor(private readonly connection: SQLiteDatabase) {}

  public get counter_additional_readings() {
    return this.retrieve(Schemas.CounterAdditionalReadings);
  }

  public get counter_disambiguations() {
    return this.retrieve(Schemas.CounterDisambiguations);
  }

  public get counter_external_links() {
    return this.retrieve(Schemas.CounterExternalLinks);
  }

  public get counter_irregulars() {
    return this.retrieve(Schemas.CounterIrregulars);
  }

  public get counters() {
    return this.retrieve(Schemas.Counters);
  }

  public get item_counters() {
    return this.retrieve(Schemas.ItemCounters);
  }

  public get items() {
    return this.retrieve(Schemas.Items);
  }

  public get study_pack_contents() {
    return this.retrieve(Schemas.StudyPackContents);
  }

  public get study_packs() {
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

  public dump() {
    for (const schema of Object.values(Schemas)) {
      const file = path.resolve(SQL_DIRECTORY, `./${schema}.sql`);
      const sql = this.dumpTable(schema);
      writeFileSync(file, sql);
    }
  }

  public async close() {
    await this.connection.close();
  }

  private retrieve<TSchema extends Schemas, TEntry = SchemaEntryTypes[TSchema]>(
    schema: TSchema
  ): Promise<ReadonlyArray<TEntry>> {
    return this.connection.all(`SELECT * FROM ${schema}`);
  }

  private dumpTable(schema: Schemas): string {
    const rawSql = execSync(`sqlite3 ${DATABASE_FILE} ".dump '${schema}'"`);
    return formatSql(rawSql.toString());
  }
}
