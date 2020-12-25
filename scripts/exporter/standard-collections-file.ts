import { sortBy } from "lodash";
import { Writable } from "stream";

import { DbStudyPackContent } from "../database/schemas";
import ValidatedDataSource from "../database/ValidatedDataSource";

import { WriteFileResults } from "./types";
import {
  getStudyPackId,
  productionStringify,
  ProductionVariable,
} from "./utils";

interface StandardCounterCollection {
  id: string;
  name: string;
  counterIds: readonly string[];
  dateLastUpdated: number;
}

function writeStandardCollectionsFile(
  stream: Writable,
  dataSource: ValidatedDataSource
): WriteFileResults {
  stream.write("interface StandardCounterCollection {\n");
  stream.write("  id: string;\n");
  stream.write("  name: string;\n");
  stream.write("  counterIds: readonly string[];\n");
  stream.write("  dateLastUpdated: number;\n");
  stream.write("}\n\n");

  const sortedCollections = sortBy(dataSource.study_packs.valid, ["pack_id"]);
  sortedCollections.forEach((studyPack): void => {
    const variableName = getStudyPackId(studyPack.pack_id);

    const countersLookup: { [packId: string]: DbStudyPackContent[] } = {};
    dataSource.study_pack_contents.valid.forEach((content): void => {
      if (!countersLookup[content.pack_id]) {
        countersLookup[content.pack_id] = [];
      }

      countersLookup[content.pack_id].push(content);
    });

    const collection: StandardCounterCollection = {
      counterIds: sortBy(countersLookup[studyPack.pack_id] || [], [
        "counter_id",
      ]).map(({ counter_id }): string => counter_id),
      dateLastUpdated: Date.now(), // TODO
      id: studyPack.pack_id,
      name: studyPack.english_name,
    };

    stream.write(
      `\n\nconst ${variableName}: StandardCounterCollection = ${productionStringify(
        collection
      )};`
    );
  });

  stream.write("\n\n");

  stream.write(
    `\n\nexport const STANDARD_COLLECTIONS: readonly StandardCounterCollection[] = ${productionStringify(
      sortedCollections.map(
        ({ pack_id }) => new ProductionVariable(getStudyPackId(pack_id))
      )
    )}`
  );

  return {
    additionalFileRequests: [],
    output: [],
  };
}

export default writeStandardCollectionsFile;
