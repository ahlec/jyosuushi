import {
  Counter,
  ExternalLink,
  CounterReading,
  CounterAnnotationIrregular,
  CounterKanjiInfo,
  CounterDisambiguation,
  CounterAnnotationFrequency,
} from "@jyosuushi/interfaces";

import {
  DbCounter,
  DbCounterAlternativeKanji,
  DbCounterIrregular,
  DbCounterReading,
  DbExternalLinkLanguage,
  DbIrregularType,
  DbWagoStyle,
  DbCounterDisambiguation,
  DbCounterReadingFrequency,
  DbCounterReadingFrequencyEnum,
} from "../../database/schemas";

import { getWordOrigin, ProductionVariable } from "../utils";

import { CounterJoinData } from "./CounterDataLookup";
import { CounterComponentsLookup, PreparedCounterExternalLink } from "./types";
import { getOtherCounterId } from "./utils";

type ProtoCounterReading = Omit<CounterReading, "wordOrigin"> & {
  wordOrigin: ProductionVariable;
};

type ProtoCounterAnnotationIrregular = Omit<
  CounterAnnotationIrregular,
  "countingSystem" | "type"
> & {
  countingSystem: ProductionVariable | null;
  type: ProductionVariable;
};

type ProtoCounterAnnotationFrequency = Omit<
  CounterAnnotationFrequency,
  "frequency"
> & {
  frequency: ProductionVariable;
};

type ProtoCounterAnnotation =
  | ProtoCounterAnnotationIrregular
  | ProtoCounterAnnotationFrequency;

type ProtoExternalLink = Omit<ExternalLink, "description" | "language"> & {
  description: ProductionVariable;
  language: ProductionVariable;
};

type ProtoDisambiguation = Omit<CounterDisambiguation, "distinction"> & {
  distinction: ProductionVariable;
};

type ProtoCounter = Omit<
  Counter,
  | "disambiguations"
  | "externalLinks"
  | "footnotes"
  | "annotations"
  | "notes"
  | "readings"
> & {
  disambiguations: ReadonlyArray<ProtoDisambiguation>;
  externalLinks: ReadonlyArray<ProtoExternalLink>;
  footnotes: ReadonlyArray<ProductionVariable>;
  annotations: {
    [amount: number]: ReadonlyArray<ProtoCounterAnnotation> | undefined;
  };
  notes: ProductionVariable | null;
  readings: ReadonlyArray<ProtoCounterReading>;
};

function convertToProductionExternalLink(
  db: PreparedCounterExternalLink,
): ProtoExternalLink {
  let externalLinkLanguageEnumField: string;
  switch (db.language) {
    case DbExternalLinkLanguage.English: {
      externalLinkLanguageEnumField = "English";
      break;
    }
    case DbExternalLinkLanguage.Japanese: {
      externalLinkLanguageEnumField = "Japanese";
      break;
    }
  }

  return {
    description: db.description,
    displayText: db.link_text,
    language: new ProductionVariable(
      `ExternalLinkLanguage.${externalLinkLanguageEnumField}`,
    ),
    siteName: db.site_name,
    url: db.url,
  };
}

function convertToProductionDisambiguation(
  counterId: string,
  disambiguation: DbCounterDisambiguation,
  nestedComponents: CounterComponentsLookup,
): ProtoDisambiguation {
  const otherCounterId = getOtherCounterId(counterId, disambiguation);
  const component = nestedComponents.disambiguationComponents[otherCounterId];
  if (!component) {
    throw new Error("Could not find disambiguation component");
  }

  return {
    distinction: component,
    otherCounterId,
  };
}

export function convertToProductionIrregularType(
  dbType: DbIrregularType,
): ProductionVariable {
  switch (dbType) {
    case DbIrregularType.ArbitraryReading: {
      return new ProductionVariable("CounterIrregularType.ArbitraryReading");
    }
    case DbIrregularType.StandardWagoRangeSoundChange: {
      return new ProductionVariable("CounterIrregularType.SoundChange");
    }
  }
}

const FREQUENCY_ENUM_PRODUCTION_VARIABLE: Record<
  DbCounterReadingFrequencyEnum,
  ProductionVariable
> = {
  [DbCounterReadingFrequencyEnum.Uncommon]: new ProductionVariable(
    "CounterReadingFrequency.Uncommon",
  ),
  [DbCounterReadingFrequencyEnum.Archaic]: new ProductionVariable(
    "CounterReadingFrequency.Archaic",
  ),
};

function getIrregularCountingSystem(
  type: DbIrregularType,
): ProductionVariable | null {
  switch (type) {
    case DbIrregularType.ArbitraryReading: {
      return null;
    }
    case DbIrregularType.StandardWagoRangeSoundChange: {
      return new ProductionVariable("CountingSystem.Wago");
    }
  }
}

function convertToProductionReading(
  counterId: string,
  dbReading: DbCounterReading,
  dbWagoStyle: DbWagoStyle | undefined,
): ProtoCounterReading {
  return {
    counterId,
    kana: dbReading.kana,
    kangoConjugationOptions: {
      allowsKuFor9: !!dbReading.kango_uses_ku,
      allowsKyuuFor9: !!dbReading.kango_uses_kyuu,
      allowsNanaFor7: !!dbReading.kango_uses_nana,
      allowsShiFor4: !!dbReading.kango_uses_shi,
      allowsShichiFor7: !!dbReading.kango_uses_shichi,
      allowsYoFor4: !!dbReading.kango_uses_yo,
      allowsYonFor4: !!dbReading.kango_uses_yon,
    },
    readingId: dbReading.reading_id,
    wagoStyle: dbWagoStyle
      ? {
          alsoUsesKangoIchi:
            dbWagoStyle.range_end_inclusive >= 1 &&
            !!dbWagoStyle.also_uses_kango_one,
          alsoUsesKangoNi:
            dbWagoStyle.range_end_inclusive >= 2 &&
            !!dbWagoStyle.also_uses_kango_two,
          alsoUsesKangoSan:
            dbWagoStyle.range_end_inclusive >= 3 &&
            !!dbWagoStyle.also_uses_kango_three,
          kana: dbReading.wago_custom_base || dbReading.kana,
          rangeEndInclusive: dbWagoStyle.range_end_inclusive,
        }
      : null,
    wordOrigin: getWordOrigin(dbReading.word_origin),
  };
}

function convertToProductionKanji(
  primaryKanji: string,
  alternativeKanji: ReadonlyArray<DbCounterAlternativeKanji>,
): CounterKanjiInfo {
  return {
    additionalKanji: alternativeKanji.map(({ kanji }) => kanji),
    primaryKanji,
  };
}

function convertToProductionAnnotationsMap(
  dbIrregulars: ReadonlyArray<DbCounterIrregular>,
  dbReadingFrequencies: ReadonlyArray<DbCounterReadingFrequency>,
): ProtoCounter["annotations"] {
  const result: ProtoCounter["annotations"] = {};

  const addAnnotation = <T extends ProtoCounterAnnotation["kind"]>(
    amount: number,
    annotation: ProtoCounterAnnotation & { kind: T },
  ): void => {
    result[amount] = [...(result[amount] || []), annotation];
  };

  dbIrregulars.forEach((record): void => {
    addAnnotation<"irregular">(record.number, {
      amount: record.number,
      countingSystem: getIrregularCountingSystem(record.irregular_type),
      doesPresenceEraseRegularConjugations:
        !!record.does_presence_erase_regular_conjugations,
      kind: "irregular",
      reading: record.kana,
      type: convertToProductionIrregularType(record.irregular_type),
    });
  });

  dbReadingFrequencies.forEach((record): void => {
    addAnnotation<"frequency">(record.amount, {
      frequency: FREQUENCY_ENUM_PRODUCTION_VARIABLE[record.frequency],
      kind: "frequency",
      reading: record.kana,
    });
  });

  return Object.fromEntries(
    Object.entries(result).sort(([amountAStr], [amountBStr]): number => {
      const amountA = parseInt(amountAStr, 10);
      const amountB = parseInt(amountBStr, 10);
      return amountA - amountB;
    }),
  );
}

export function convertToProtoCounter(
  counter: DbCounter,
  joinData: CounterJoinData,
  nestedComponents: CounterComponentsLookup,
  externalLinks: readonly PreparedCounterExternalLink[],
  footnoteComponents: ReadonlyArray<ProductionVariable>,
): ProtoCounter {
  return {
    annotations: convertToProductionAnnotationsMap(
      joinData.irregulars,
      joinData.readingFrequency,
    ),
    counterId: counter.counter_id,
    disambiguations: joinData.disambiguations.map(
      (disambiguation): ProtoDisambiguation =>
        convertToProductionDisambiguation(
          counter.counter_id,
          disambiguation,
          nestedComponents,
        ),
    ),
    englishName: counter.english_name,
    externalLinks: externalLinks.map(convertToProductionExternalLink),
    footnotes: footnoteComponents,
    kanji: counter.primary_kanji
      ? convertToProductionKanji(
          counter.primary_kanji,
          joinData.alternativeKanji,
        )
      : null,
    leadIn: counter.lead_in ? counter.lead_in : null,
    notes: nestedComponents.notesComponent,
    readings: joinData.readings.map((reading) =>
      convertToProductionReading(
        counter.counter_id,
        reading,
        reading.wago_style
          ? joinData.allDefinedWagoStyles[reading.wago_style]
          : undefined,
      ),
    ),
  };
}
