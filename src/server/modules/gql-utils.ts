import { gql } from "apollo-server";
import { readFileSync } from "fs";
import { DocumentNode } from "graphql";

export function loadGraphQlFile(filename: string): DocumentNode {
  return gql(readFileSync(filename, "utf8"));
}
