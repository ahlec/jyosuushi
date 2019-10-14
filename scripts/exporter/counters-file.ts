import { sortBy } from "lodash";
import { Writable } from "stream";

import {
  DbCounterDisambiguation,
  DbCounterExternalLink,
  DbCounterIrregular
} from "../database/schemas";
import ValidatedDataSource from "../database/ValidatedDataSource";

import {
  Counter,
  CounterDisambiguation,
  ExternalLink
} from "../../src/interfaces";

import {
  getCounterId,
  getDisambiguationId,
  productionStringify,
  ProductionVariable
} from "./utils";

function convertToProductionExternalLink(
  db: DbCounterExternalLink
): ExternalLink {
  return {
    additionalDescription: db.additional_description
      ? db.additional_description
      : null,
    displayText: db.link_text,
    siteName: db.site_name,
    url: db.url
  };
}

function convertToProductionDisambiguations(
  counterId: string,
  disambiguations: ReadonlyArray<DbCounterDisambiguation>
): { [counterId: string]: CounterDisambiguation } {
  const lookup: { [counterId: string]: any } = {};

  for (const disambiguation of disambiguations) {
    lookup[
      counterId === disambiguation.counter1_id
        ? disambiguation.counter2_id
        : disambiguation.counter1_id
    ] = new ProductionVariable(
      `DISAMBIGUATIONS.${getDisambiguationId(
        disambiguation.counter1_id,
        disambiguation.counter2_id
      )}`
    );
  }

  return lookup;
}

function convertToProductionIrregulars(irregulars: {
  [amount: number]: DbCounterIrregular[] | undefined;
}): { [amount: number]: ReadonlyArray<string> } {
  const production: { [amount: number]: string[] } = {};

  for (const amountStr of Object.keys(irregulars)) {
    const amount = parseInt(amountStr, 10);
    production[amount] = irregulars[amount]!.map(({ kana }) => kana);
  }

  return production;
}

export default function writeCountersFile(
  stream: Writable,
  dataSource: ValidatedDataSource
) {
  stream.write('import { Counter } from "../src/interfaces";\n');
  stream.write('import * as DISAMBIGUATIONS from "./disambiguations";');

  const externalLinksLookup: {
    [counterId: string]: DbCounterExternalLink[] | undefined;
  } = {};
  for (const externalLink of dataSource.counter_external_links.valid) {
    if (!externalLinksLookup[externalLink.counter_id]) {
      externalLinksLookup[externalLink.counter_id] = [];
    }

    externalLinksLookup[externalLink.counter_id]!.push(externalLink);
  }

  const disambiguationsLookup: {
    [counterId: string]: DbCounterDisambiguation[] | undefined;
  } = {};
  for (const disambiguation of dataSource.counter_disambiguations.valid) {
    if (!disambiguationsLookup[disambiguation.counter1_id]) {
      disambiguationsLookup[disambiguation.counter1_id] = [];
    }

    disambiguationsLookup[disambiguation.counter1_id]!.push(disambiguation);

    if (!disambiguationsLookup[disambiguation.counter2_id]) {
      disambiguationsLookup[disambiguation.counter2_id] = [];
    }

    disambiguationsLookup[disambiguation.counter2_id]!.push(disambiguation);
  }

  const irregularsLookup: {
    [counterId: string]:
      | { [amount: number]: DbCounterIrregular[] | undefined }
      | undefined;
  } = {};
  for (const irregular of dataSource.counter_irregulars.valid) {
    if (!irregularsLookup[irregular.counter_id]) {
      irregularsLookup[irregular.counter_id] = {};
    }

    if (!irregularsLookup[irregular.counter_id]![irregular.number]) {
      irregularsLookup[irregular.counter_id]![irregular.number] = [];
    }

    irregularsLookup[irregular.counter_id]![irregular.number]!.push(irregular);
  }

  const sortedCounters = sortBy(dataSource.counters.valid, ["counter_id"]);
  for (const dbCounter of sortedCounters) {
    const variableName = getCounterId(dbCounter.counter_id);

    const counter: Counter = {
      conjugationOptions: {
        allowsKuFor9: !!dbCounter.uses_ku,
        allowsKyuuFor9: !!dbCounter.uses_kyuu,
        allowsNanaFor7: !!dbCounter.uses_nana,
        allowsShiFor4: !!dbCounter.uses_shi,
        allowsShichiFor7: !!dbCounter.uses_shichi,
        allowsYoFor4: !!dbCounter.uses_yo,
        allowsYonFor4: !!dbCounter.uses_yon
      },
      counterId: dbCounter.counter_id,
      disambiguations: convertToProductionDisambiguations(
        dbCounter.counter_id,
        disambiguationsLookup[dbCounter.counter_id] || []
      ),
      englishName: dbCounter.english_name,
      externalLinks: (externalLinksLookup[dbCounter.counter_id] || []).map(
        convertToProductionExternalLink
      ),
      irregulars: convertToProductionIrregulars(
        irregularsLookup[dbCounter.counter_id] || {}
      ),
      kana: dbCounter.kana,
      kanji: dbCounter.kanji ? dbCounter.kanji : null, // Handle empty string
      notes: dbCounter.notes ? dbCounter.notes : null // Handle empty string
    };

    stream.write(
      `\n\nexport const ${variableName}: Counter = ${productionStringify(
        counter
      )};`
    );
  }

  stream.write("\n\n");

  const lookup = sortedCounters.reduce(
    (obj: { [counterId: string]: ProductionVariable }, { counter_id }) => {
      obj[counter_id] = new ProductionVariable(getCounterId(counter_id));
      return obj;
    },
    {}
  );
  stream.write(
    `export const COUNTERS_LOOKUP: { [counterId: string]: Counter; } = ${productionStringify(
      lookup
    )};`
  );
}
