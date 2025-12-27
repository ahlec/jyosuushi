import { max, sortBy } from "lodash";
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
  description: string;
}

function parseDbTimestamp(dateTime: string): number {
  return Date.parse(`${dateTime} UTC`);
}

function writeStandardCollectionsFile(
  stream: Writable,
  dataSource: ValidatedDataSource,
): WriteFileResults {
  stream.write("interface StandardCounterCollection {\n");
  stream.write("  id: string;\n");
  stream.write("  name: string;\n");
  stream.write("  counterIds: readonly string[];\n");
  stream.write("  dateLastUpdated: number;\n");
  stream.write("  description: string;\n");
  stream.write("}\n\n");

  const countersLookup: { [packId: string]: DbStudyPackContent[] } = {};
  dataSource.study_pack_contents.valid.forEach((content): void => {
    if (!countersLookup[content.pack_id]) {
      countersLookup[content.pack_id] = [];
    }

    countersLookup[content.pack_id].push(content);
  });

  const sortedCollections = sortBy(dataSource.study_packs.valid, ["pack_id"]);
  sortedCollections.forEach((studyPack): void => {
    const variableName = getStudyPackId(studyPack.pack_id);

    const counters = sortBy(countersLookup[studyPack.pack_id] || [], [
      "counter_id",
    ]);

    const individualModificationDates = counters.map(({ date_added }): number =>
      parseDbTimestamp(date_added),
    );
    if (studyPack.date_counter_last_removed) {
      individualModificationDates.push(
        parseDbTimestamp(studyPack.date_counter_last_removed),
      );
    }

    const collection: StandardCounterCollection = {
      counterIds: counters.map(({ counter_id }): string => counter_id),
      dateLastUpdated: max(individualModificationDates) || Date.now(),
      description: studyPack.description,
      id: studyPack.pack_id,
      name: studyPack.english_name,
    };

    stream.write(
      `\n\nconst ${variableName}: StandardCounterCollection = ${productionStringify(
        collection,
      )};`,
    );
  });

  stream.write("\n\n");

  stream.write(
    `\n\nexport const STANDARD_COLLECTIONS: readonly StandardCounterCollection[] = ${productionStringify(
      sortedCollections.map(
        ({ pack_id }) => new ProductionVariable(getStudyPackId(pack_id)),
      ),
    )}`,
  );

  return {
    additionalFileRequests: [],
    output: [],
  };
}

export default writeStandardCollectionsFile;
