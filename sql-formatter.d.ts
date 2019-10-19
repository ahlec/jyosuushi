declare module "sql-formatter" {
  export function format(
    query: string,
    cfg?: {
      language?: "db2" | "n1ql" | "pl/sql" | "sql";
      indent?: string;
      params: object;
    }
  ): string;
}
