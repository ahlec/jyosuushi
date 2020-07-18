import { sortBy } from "lodash";
import { Writable } from "stream";

import { DbStudyPackContent } from "../database/schemas";
import ValidatedDataSource from "../database/ValidatedDataSource";

import { StudyPack } from "../../src/client/interfaces";

import { WriteFileResults } from "./types";
import {
  getCounterId,
  getStudyPackId,
  productionStringify,
  ProductionVariable,
} from "./utils";

type ProtoStudyPack = Omit<StudyPack, "counters"> & {
  counters: ReadonlyArray<ProductionVariable>;
};

function convertToCounterVariable(db: DbStudyPackContent): ProductionVariable {
  return new ProductionVariable(`COUNTERS.${getCounterId(db.counter_id)}`);
}

export default function writeStudyPacksFile(
  stream: Writable,
  dataSource: ValidatedDataSource
): WriteFileResults {
  stream.write('import { StudyPack } from "@jyosuushi/interfaces";\n');
  stream.write('import * as COUNTERS from "./counters";');

  const countersLookup: { [packId: string]: DbStudyPackContent[] } = {};
  for (const studyPackContent of dataSource.study_pack_contents.valid) {
    if (!countersLookup[studyPackContent.pack_id]) {
      countersLookup[studyPackContent.pack_id] = [];
    }

    countersLookup[studyPackContent.pack_id].push(studyPackContent);
  }

  const sortedStudyPacks = sortBy(dataSource.study_packs.valid, ["pack_id"]);
  for (const dbStudyPack of sortedStudyPacks) {
    const variableName = getStudyPackId(dbStudyPack.pack_id);

    const studyPack: ProtoStudyPack = {
      counters: sortBy(countersLookup[dbStudyPack.pack_id] || [], [
        "counter_id",
      ]).map(convertToCounterVariable),
      englishName: dbStudyPack.english_name,
      packId: dbStudyPack.pack_id,
    };

    stream.write(
      `\n\nconst ${variableName}: StudyPack = ${productionStringify(
        studyPack
      )};`
    );
  }

  stream.write("\n\n");

  stream.write(
    `\n\nexport const STUDY_PACKS: ReadonlyArray<StudyPack> = ${productionStringify(
      sortedStudyPacks.map(
        ({ pack_id }) => new ProductionVariable(getStudyPackId(pack_id))
      )
    )}`
  );

  const lookup = sortedStudyPacks.reduce(
    (obj: { [packId: string]: ProductionVariable }, { pack_id }) => {
      obj[pack_id] = new ProductionVariable(getStudyPackId(pack_id));
      return obj;
    },
    {}
  );
  stream.write(
    `\n\nexport const STUDY_PACK_LOOKUP: { [packId: string]: StudyPack; } = ${productionStringify(
      lookup
    )};`
  );

  return {
    additionalFileRequests: [],
    output: [],
  };
}
