// DO NOT HAND-MODIFY THIS FILE!!
// This file was built using `yarn build-data` from the SQLite database.
// Modifications will be lost if they are made manually and not through the database.

import {
  Counter,
  CounterIrregularType,
  CountingSystem,
  ExternalLinkLanguage,
  WordOrigin,
} from "../src/interfaces";

import * as 人Components from "@data/counter-components/人";
import * as 匹Components from "@data/counter-components/匹";
import * as 名Components from "@data/counter-components/名";
import * as 本Components from "@data/counter-components/本";
import * as 缶Components from "@data/counter-components/缶";

export const COUNTER_ヶ国: Counter = {
  counterId: "ヶ国",
  disambiguations: [],
  englishName: "countries",
  externalLinks: [],
  footnotes: [],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "ヶ国",
  },
  leadIn: null,
  notes: null,
  readings: [
    {
      counterId: "ヶ国",
      kana: "かこく",
      kangoConjugationOptions: {
        allowsKuFor9: false,
        allowsKyuuFor9: true,
        allowsNanaFor7: true,
        allowsShiFor4: false,
        allowsShichiFor7: false,
        allowsYoFor4: false,
        allowsYonFor4: true,
      },
      readingId: "かこく",
      wagoStyle: null,
      wordOrigin: WordOrigin.Chinese,
    },
  ],
};

export const COUNTER_ヶ所: Counter = {
  counterId: "ヶ所",
  disambiguations: [],
  englishName: "places",
  externalLinks: [],
  footnotes: [],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "ヶ所",
  },
  leadIn: null,
  notes: null,
  readings: [
    {
      counterId: "ヶ所",
      kana: "かしょ",
      kangoConjugationOptions: {
        allowsKuFor9: false,
        allowsKyuuFor9: true,
        allowsNanaFor7: true,
        allowsShiFor4: false,
        allowsShichiFor7: false,
        allowsYoFor4: false,
        allowsYonFor4: true,
      },
      readingId: "かしょ",
      wagoStyle: null,
      wordOrigin: WordOrigin.Chinese,
    },
  ],
};

export const COUNTER_ヶ月: Counter = {
  counterId: "ヶ月",
  disambiguations: [],
  englishName: "months",
  externalLinks: [
    {
      additionalDescription: null,
      displayText: "月: Counting Months",
      language: ExternalLinkLanguage.English,
      siteName: "Tofugu",
      url:
        "https://www.tofugu.com/japanese/japanese-counter-tsuki-gatsu-getsu/",
    },
  ],
  footnotes: [],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "ヶ月",
  },
  leadIn: null,
  notes: null,
  readings: [
    {
      counterId: "ヶ月",
      kana: "かげつ",
      kangoConjugationOptions: {
        allowsKuFor9: false,
        allowsKyuuFor9: true,
        allowsNanaFor7: true,
        allowsShiFor4: false,
        allowsShichiFor7: false,
        allowsYoFor4: false,
        allowsYonFor4: true,
      },
      readingId: "かげつ",
      wagoStyle: null,
      wordOrigin: WordOrigin.Chinese,
    },
  ],
};

export const COUNTER_人: Counter = {
  counterId: "人",
  disambiguations: [
    {
      distinction: 人Components.Disambiguation名,
      otherCounterId: "名",
    },
    {
      distinction: 人Components.Disambiguation匹,
      otherCounterId: "匹",
    },
  ],
  englishName: "people",
  externalLinks: [
    {
      additionalDescription:
        "Detailed and well-researched article from the kings of Japanese language learning.",
      displayText: "人: Counting People and Smart Animals",
      language: ExternalLinkLanguage.English,
      siteName: "Tofugu",
      url: "https://www.tofugu.com/japanese/japanese-counter-nin/",
    },
    {
      additionalDescription:
        "Japanese dictionary entries, compiled from multiple sources.",
      displayText: "人（読み：ジン）",
      language: ExternalLinkLanguage.Japanese,
      siteName: "コトバンク",
      url: "https://kotobank.jp/word/%E4%BA%BA-536577",
    },
  ],
  footnotes: [
    人Components.Footnote1,
    人Components.Footnote2,
    人Components.Footnote3,
    人Components.Footnote4,
    人Components.Footnote5,
  ],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "人",
  },
  leadIn: "The ubiquitous counter for people and humanoids.",
  notes: 人Components.CounterNotes,
  readings: [
    {
      counterId: "人",
      kana: "にん",
      kangoConjugationOptions: {
        allowsKuFor9: true,
        allowsKyuuFor9: true,
        allowsNanaFor7: true,
        allowsShiFor4: false,
        allowsShichiFor7: true,
        allowsYoFor4: true,
        allowsYonFor4: false,
      },
      readingId: "にん",
      wagoStyle: {
        alsoUsesKangoIchi: false,
        alsoUsesKangoNi: false,
        alsoUsesKangoSan: false,
        kana: "り",
        rangeEndInclusive: 2,
      },
      wordOrigin: WordOrigin.Japanese,
    },
  ],
};

export const COUNTER_件: Counter = {
  counterId: "件",
  disambiguations: [],
  englishName: "matters",
  externalLinks: [],
  footnotes: [],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "件",
  },
  leadIn: null,
  notes: null,
  readings: [
    {
      counterId: "件",
      kana: "けん",
      kangoConjugationOptions: {
        allowsKuFor9: false,
        allowsKyuuFor9: true,
        allowsNanaFor7: true,
        allowsShiFor4: false,
        allowsShichiFor7: false,
        allowsYoFor4: false,
        allowsYonFor4: true,
      },
      readingId: "けん",
      wagoStyle: null,
      wordOrigin: WordOrigin.Chinese,
    },
  ],
};

export const COUNTER_円: Counter = {
  counterId: "円",
  disambiguations: [],
  englishName: "yen",
  externalLinks: [],
  footnotes: [],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "円",
  },
  leadIn: null,
  notes: null,
  readings: [
    {
      counterId: "円",
      kana: "えん",
      kangoConjugationOptions: {
        allowsKuFor9: false,
        allowsKyuuFor9: true,
        allowsNanaFor7: true,
        allowsShiFor4: false,
        allowsShichiFor7: false,
        allowsYoFor4: false,
        allowsYonFor4: true,
      },
      readingId: "えん",
      wagoStyle: null,
      wordOrigin: WordOrigin.Chinese,
    },
  ],
};

export const COUNTER_冊: Counter = {
  counterId: "冊",
  disambiguations: [],
  englishName: "books",
  externalLinks: [
    {
      additionalDescription: null,
      displayText: "冊: Counting Books",
      language: ExternalLinkLanguage.English,
      siteName: "Tofugu",
      url: "https://www.tofugu.com/japanese/japanese-counter-satsu/",
    },
  ],
  footnotes: [],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "冊",
  },
  leadIn: null,
  notes: null,
  readings: [
    {
      counterId: "冊",
      kana: "さつ",
      kangoConjugationOptions: {
        allowsKuFor9: false,
        allowsKyuuFor9: true,
        allowsNanaFor7: true,
        allowsShiFor4: false,
        allowsShichiFor7: true,
        allowsYoFor4: false,
        allowsYonFor4: true,
      },
      readingId: "さつ",
      wagoStyle: null,
      wordOrigin: WordOrigin.Chinese,
    },
  ],
};

export const COUNTER_分: Counter = {
  counterId: "分",
  disambiguations: [],
  englishName: "minutes",
  externalLinks: [
    {
      additionalDescription: null,
      displayText: "分: Counting Minutes and Edo Period Silver Currency",
      language: ExternalLinkLanguage.English,
      siteName: "Tofugu",
      url: "https://www.tofugu.com/japanese/japanese-counter-fun/",
    },
  ],
  footnotes: [],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "分",
  },
  leadIn: null,
  notes: null,
  readings: [
    {
      counterId: "分",
      kana: "ふん",
      kangoConjugationOptions: {
        allowsKuFor9: false,
        allowsKyuuFor9: true,
        allowsNanaFor7: true,
        allowsShiFor4: false,
        allowsShichiFor7: true,
        allowsYoFor4: false,
        allowsYonFor4: true,
      },
      readingId: "ふん",
      wagoStyle: null,
      wordOrigin: WordOrigin.Chinese,
    },
  ],
};

export const COUNTER_切れ: Counter = {
  counterId: "切れ",
  disambiguations: [],
  englishName: "cuts of meat",
  externalLinks: [],
  footnotes: [],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "切れ",
  },
  leadIn: null,
  notes: null,
  readings: [
    {
      counterId: "切れ",
      kana: "きれ",
      kangoConjugationOptions: {
        allowsKuFor9: false,
        allowsKyuuFor9: true,
        allowsNanaFor7: true,
        allowsShiFor4: false,
        allowsShichiFor7: false,
        allowsYoFor4: false,
        allowsYonFor4: true,
      },
      readingId: "きれ",
      wagoStyle: null,
      wordOrigin: WordOrigin.Japanese,
    },
  ],
};

export const COUNTER_匹: Counter = {
  counterId: "匹",
  disambiguations: [
    {
      distinction: 匹Components.Disambiguation人,
      otherCounterId: "人",
    },
  ],
  englishName: "small animals",
  externalLinks: [
    {
      additionalDescription: null,
      displayText: "匹: Counting Animals, Bugs, and Wild Children",
      language: ExternalLinkLanguage.English,
      siteName: "Tofugu",
      url: "https://www.tofugu.com/japanese/japanese-counter-hiki/",
    },
  ],
  footnotes: [],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "匹",
  },
  leadIn: null,
  notes: null,
  readings: [
    {
      counterId: "匹",
      kana: "ひき",
      kangoConjugationOptions: {
        allowsKuFor9: false,
        allowsKyuuFor9: true,
        allowsNanaFor7: true,
        allowsShiFor4: false,
        allowsShichiFor7: true,
        allowsYoFor4: false,
        allowsYonFor4: true,
      },
      readingId: "ひき",
      wagoStyle: null,
      wordOrigin: WordOrigin.Japanese,
    },
  ],
};

export const COUNTER_口: Counter = {
  counterId: "口",
  disambiguations: [],
  englishName: "bites",
  externalLinks: [],
  footnotes: [],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "口",
  },
  leadIn: null,
  notes: null,
  readings: [
    {
      counterId: "口",
      kana: "くち",
      kangoConjugationOptions: {
        allowsKuFor9: false,
        allowsKyuuFor9: true,
        allowsNanaFor7: true,
        allowsShiFor4: false,
        allowsShichiFor7: false,
        allowsYoFor4: false,
        allowsYonFor4: true,
      },
      readingId: "くち",
      wagoStyle: null,
      wordOrigin: WordOrigin.Japanese,
    },
  ],
};

export const COUNTER_台: Counter = {
  counterId: "台",
  disambiguations: [],
  englishName: "machines and large objects",
  externalLinks: [
    {
      additionalDescription: null,
      displayText: "台: Counting Machines, Furniture, & Whole Cakes",
      language: ExternalLinkLanguage.English,
      siteName: "Tofugu",
      url: "https://www.tofugu.com/japanese/japanese-counter-dai/",
    },
  ],
  footnotes: [],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "台",
  },
  leadIn: null,
  notes: null,
  readings: [
    {
      counterId: "台",
      kana: "だい",
      kangoConjugationOptions: {
        allowsKuFor9: false,
        allowsKyuuFor9: true,
        allowsNanaFor7: true,
        allowsShiFor4: false,
        allowsShichiFor7: true,
        allowsYoFor4: false,
        allowsYonFor4: true,
      },
      readingId: "だい",
      wagoStyle: null,
      wordOrigin: WordOrigin.Chinese,
    },
  ],
};

export const COUNTER_名: Counter = {
  counterId: "名",
  disambiguations: [
    {
      distinction: 名Components.Disambiguation人,
      otherCounterId: "人",
    },
  ],
  englishName: "people",
  externalLinks: [
    {
      additionalDescription: null,
      displayText: "人: Counting People and Smart Animals",
      language: ExternalLinkLanguage.English,
      siteName: "Tofugu",
      url: "https://www.tofugu.com/japanese/japanese-counter-nin/",
    },
  ],
  footnotes: [],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "名",
  },
  leadIn: "A situational counter for people, used in formal scenarios.",
  notes: null,
  readings: [
    {
      counterId: "名",
      kana: "めい",
      kangoConjugationOptions: {
        allowsKuFor9: false,
        allowsKyuuFor9: true,
        allowsNanaFor7: true,
        allowsShiFor4: false,
        allowsShichiFor7: false,
        allowsYoFor4: false,
        allowsYonFor4: true,
      },
      readingId: "めい",
      wagoStyle: null,
      wordOrigin: WordOrigin.Chinese,
    },
  ],
};

export const COUNTER_周: Counter = {
  counterId: "周",
  disambiguations: [],
  englishName: "laps and circuits",
  externalLinks: [],
  footnotes: [],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "周",
  },
  leadIn: null,
  notes: null,
  readings: [
    {
      counterId: "周",
      kana: "しゅう",
      kangoConjugationOptions: {
        allowsKuFor9: false,
        allowsKyuuFor9: true,
        allowsNanaFor7: true,
        allowsShiFor4: false,
        allowsShichiFor7: false,
        allowsYoFor4: false,
        allowsYonFor4: true,
      },
      readingId: "しゅう",
      wagoStyle: null,
      wordOrigin: WordOrigin.Chinese,
    },
  ],
};

export const COUNTER_回: Counter = {
  counterId: "回",
  disambiguations: [],
  englishName: "times (occurrences)",
  externalLinks: [
    {
      additionalDescription: null,
      displayText: "回: Repetitive Actions, Regular Events",
      language: ExternalLinkLanguage.English,
      siteName: "Tofugu",
      url: "https://www.tofugu.com/japanese/japanese-counter-kai-times/",
    },
  ],
  footnotes: [],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "回",
  },
  leadIn: null,
  notes: null,
  readings: [
    {
      counterId: "回",
      kana: "かい",
      kangoConjugationOptions: {
        allowsKuFor9: false,
        allowsKyuuFor9: true,
        allowsNanaFor7: true,
        allowsShiFor4: false,
        allowsShichiFor7: true,
        allowsYoFor4: false,
        allowsYonFor4: true,
      },
      readingId: "かい",
      wagoStyle: null,
      wordOrigin: WordOrigin.Chinese,
    },
  ],
};

export const COUNTER_巻: Counter = {
  counterId: "巻",
  disambiguations: [],
  englishName: "volumes",
  externalLinks: [],
  footnotes: [],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "巻",
  },
  leadIn: null,
  notes: null,
  readings: [
    {
      counterId: "巻",
      kana: "かん",
      kangoConjugationOptions: {
        allowsKuFor9: false,
        allowsKyuuFor9: true,
        allowsNanaFor7: true,
        allowsShiFor4: false,
        allowsShichiFor7: false,
        allowsYoFor4: false,
        allowsYonFor4: true,
      },
      readingId: "かん",
      wagoStyle: null,
      wordOrigin: WordOrigin.Chinese,
    },
  ],
};

export const COUNTER_席: Counter = {
  counterId: "席",
  disambiguations: [],
  englishName: "seats",
  externalLinks: [],
  footnotes: [],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "席",
  },
  leadIn: null,
  notes: null,
  readings: [
    {
      counterId: "席",
      kana: "せき",
      kangoConjugationOptions: {
        allowsKuFor9: false,
        allowsKyuuFor9: true,
        allowsNanaFor7: true,
        allowsShiFor4: false,
        allowsShichiFor7: false,
        allowsYoFor4: false,
        allowsYonFor4: true,
      },
      readingId: "せき",
      wagoStyle: {
        alsoUsesKangoIchi: true,
        alsoUsesKangoNi: true,
        alsoUsesKangoSan: false,
        kana: "せき",
        rangeEndInclusive: 2,
      },
      wordOrigin: WordOrigin.Chinese,
    },
  ],
};

export const COUNTER_年: Counter = {
  counterId: "年",
  disambiguations: [],
  englishName: "years",
  externalLinks: [
    {
      additionalDescription: null,
      displayText: "年: Counting Years and Planetary Orbits",
      language: ExternalLinkLanguage.English,
      siteName: "Tofugu",
      url: "https://www.tofugu.com/japanese/japanese-counters-nen/",
    },
  ],
  footnotes: [],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "年",
  },
  leadIn: null,
  notes: null,
  readings: [
    {
      counterId: "年",
      kana: "ねん",
      kangoConjugationOptions: {
        allowsKuFor9: true,
        allowsKyuuFor9: true,
        allowsNanaFor7: true,
        allowsShiFor4: false,
        allowsShichiFor7: true,
        allowsYoFor4: true,
        allowsYonFor4: false,
      },
      readingId: "ねん",
      wagoStyle: null,
      wordOrigin: WordOrigin.Chinese,
    },
  ],
};

export const COUNTER_戦: Counter = {
  counterId: "戦",
  disambiguations: [],
  englishName: "battles",
  externalLinks: [],
  footnotes: [],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "戦",
  },
  leadIn: null,
  notes: null,
  readings: [
    {
      counterId: "戦",
      kana: "せん",
      kangoConjugationOptions: {
        allowsKuFor9: false,
        allowsKyuuFor9: true,
        allowsNanaFor7: true,
        allowsShiFor4: false,
        allowsShichiFor7: false,
        allowsYoFor4: false,
        allowsYonFor4: true,
      },
      readingId: "せん",
      wagoStyle: null,
      wordOrigin: WordOrigin.Chinese,
    },
  ],
};

export const COUNTER_日: Counter = {
  counterId: "日",
  disambiguations: [],
  englishName: "days of the month",
  externalLinks: [
    {
      additionalDescription: null,
      displayText: "日: Counting Days",
      language: ExternalLinkLanguage.English,
      siteName: "Tofugu",
      url: "https://www.tofugu.com/japanese/japanese-counter-ka-nichi/",
    },
  ],
  footnotes: [],
  irregulars: {
    1: [
      {
        amount: 1,
        countingSystem: null,
        doesPresenceEraseRegularConjugations: true,
        reading: "ついたち",
        type: CounterIrregularType.ArbitraryReading,
      },
    ],
    2: [
      {
        amount: 2,
        countingSystem: CountingSystem.Wago,
        doesPresenceEraseRegularConjugations: true,
        reading: "ふつか",
        type: CounterIrregularType.SoundChange,
      },
    ],
    3: [
      {
        amount: 3,
        countingSystem: CountingSystem.Wago,
        doesPresenceEraseRegularConjugations: true,
        reading: "みっか",
        type: CounterIrregularType.SoundChange,
      },
    ],
    4: [
      {
        amount: 4,
        countingSystem: CountingSystem.Wago,
        doesPresenceEraseRegularConjugations: true,
        reading: "よっか",
        type: CounterIrregularType.SoundChange,
      },
    ],
    5: [
      {
        amount: 5,
        countingSystem: CountingSystem.Wago,
        doesPresenceEraseRegularConjugations: true,
        reading: "いつか",
        type: CounterIrregularType.SoundChange,
      },
    ],
    6: [
      {
        amount: 6,
        countingSystem: CountingSystem.Wago,
        doesPresenceEraseRegularConjugations: true,
        reading: "むいか",
        type: CounterIrregularType.SoundChange,
      },
    ],
    7: [
      {
        amount: 7,
        countingSystem: CountingSystem.Wago,
        doesPresenceEraseRegularConjugations: true,
        reading: "なのか",
        type: CounterIrregularType.SoundChange,
      },
    ],
    8: [
      {
        amount: 8,
        countingSystem: CountingSystem.Wago,
        doesPresenceEraseRegularConjugations: true,
        reading: "ようか",
        type: CounterIrregularType.SoundChange,
      },
    ],
    9: [
      {
        amount: 9,
        countingSystem: CountingSystem.Wago,
        doesPresenceEraseRegularConjugations: true,
        reading: "ここのか",
        type: CounterIrregularType.SoundChange,
      },
    ],
    10: [
      {
        amount: 10,
        countingSystem: null,
        doesPresenceEraseRegularConjugations: false,
        reading: "とおか",
        type: CounterIrregularType.ArbitraryReading,
      },
    ],
    14: [
      {
        amount: 14,
        countingSystem: null,
        doesPresenceEraseRegularConjugations: false,
        reading: "じゅうよっか",
        type: CounterIrregularType.ArbitraryReading,
      },
    ],
    20: [
      {
        amount: 20,
        countingSystem: null,
        doesPresenceEraseRegularConjugations: false,
        reading: "はつか",
        type: CounterIrregularType.ArbitraryReading,
      },
    ],
    24: [
      {
        amount: 24,
        countingSystem: null,
        doesPresenceEraseRegularConjugations: false,
        reading: "にじゅうよっか",
        type: CounterIrregularType.ArbitraryReading,
      },
    ],
  },
  kanji: {
    additionalKanji: [],
    primaryKanji: "日",
  },
  leadIn: null,
  notes: null,
  readings: [
    {
      counterId: "日",
      kana: "にち",
      kangoConjugationOptions: {
        allowsKuFor9: false,
        allowsKyuuFor9: true,
        allowsNanaFor7: true,
        allowsShiFor4: false,
        allowsShichiFor7: false,
        allowsYoFor4: false,
        allowsYonFor4: true,
      },
      readingId: "にち",
      wagoStyle: null,
      wordOrigin: WordOrigin.Chinese,
    },
  ],
};

export const COUNTER_時: Counter = {
  counterId: "時",
  disambiguations: [],
  englishName: "hours",
  externalLinks: [
    {
      additionalDescription: null,
      displayText: "時/時間: Counting Time and Hours",
      language: ExternalLinkLanguage.English,
      siteName: "Tofugu",
      url: "https://www.tofugu.com/japanese/japanese-counter-ji-jikan/",
    },
  ],
  footnotes: [],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "時",
  },
  leadIn: null,
  notes: null,
  readings: [
    {
      counterId: "時",
      kana: "じ",
      kangoConjugationOptions: {
        allowsKuFor9: true,
        allowsKyuuFor9: false,
        allowsNanaFor7: true,
        allowsShiFor4: false,
        allowsShichiFor7: true,
        allowsYoFor4: true,
        allowsYonFor4: false,
      },
      readingId: "じ",
      wagoStyle: null,
      wordOrigin: WordOrigin.Chinese,
    },
  ],
};

export const COUNTER_曲: Counter = {
  counterId: "曲",
  disambiguations: [],
  englishName: "songs",
  externalLinks: [],
  footnotes: [],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "曲",
  },
  leadIn: null,
  notes: null,
  readings: [
    {
      counterId: "曲",
      kana: "きょく",
      kangoConjugationOptions: {
        allowsKuFor9: false,
        allowsKyuuFor9: true,
        allowsNanaFor7: true,
        allowsShiFor4: false,
        allowsShichiFor7: false,
        allowsYoFor4: false,
        allowsYonFor4: true,
      },
      readingId: "きょく",
      wagoStyle: null,
      wordOrigin: WordOrigin.Chinese,
    },
  ],
};

export const COUNTER_本: Counter = {
  counterId: "本",
  disambiguations: [
    {
      distinction: 本Components.Disambiguation缶,
      otherCounterId: "缶",
    },
  ],
  englishName: "long, thin objects",
  externalLinks: [
    {
      additionalDescription:
        "Detailed and well-researched article from the kings of Japanese language learning.",
      displayText: "本: Counting Long, Skinny Things",
      language: ExternalLinkLanguage.English,
      siteName: "Tofugu",
      url: "https://www.tofugu.com/japanese/japanese-counter-hon/",
    },
    {
      additionalDescription:
        "Japanese dictionary entries, compiled from multiple sources.",
      displayText: "本（読み：ホン）",
      language: ExternalLinkLanguage.Japanese,
      siteName: "コトバンク",
      url: "https://kotobank.jp/word/%E6%9C%AC-631932",
    },
  ],
  footnotes: [
    本Components.Footnote1,
    本Components.Footnote2,
    本Components.Footnote3,
    本Components.Footnote4,
  ],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "本",
  },
  leadIn:
    "A highly versatile counter used primarily to count long, thin (usually cylindrical) objects.",
  notes: 本Components.CounterNotes,
  readings: [
    {
      counterId: "本",
      kana: "ほん",
      kangoConjugationOptions: {
        allowsKuFor9: false,
        allowsKyuuFor9: true,
        allowsNanaFor7: true,
        allowsShiFor4: false,
        allowsShichiFor7: true,
        allowsYoFor4: false,
        allowsYonFor4: true,
      },
      readingId: "ほん",
      wagoStyle: null,
      wordOrigin: WordOrigin.Chinese,
    },
  ],
};

export const COUNTER_束: Counter = {
  counterId: "束",
  disambiguations: [],
  englishName: "bundles",
  externalLinks: [],
  footnotes: [],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "束",
  },
  leadIn: null,
  notes: null,
  readings: [
    {
      counterId: "束",
      kana: "たば",
      kangoConjugationOptions: {
        allowsKuFor9: false,
        allowsKyuuFor9: true,
        allowsNanaFor7: true,
        allowsShiFor4: false,
        allowsShichiFor7: false,
        allowsYoFor4: false,
        allowsYonFor4: true,
      },
      readingId: "たば",
      wagoStyle: {
        alsoUsesKangoIchi: false,
        alsoUsesKangoNi: false,
        alsoUsesKangoSan: true,
        kana: "たば",
        rangeEndInclusive: 3,
      },
      wordOrigin: WordOrigin.Japanese,
    },
  ],
};

export const COUNTER_枚: Counter = {
  counterId: "枚",
  disambiguations: [],
  englishName: "flat objects",
  externalLinks: [
    {
      additionalDescription: null,
      displayText: "枚: Counting Everything Flat",
      language: ExternalLinkLanguage.English,
      siteName: "Tofugu",
      url: "https://www.tofugu.com/japanese/japanese-counter-mai/",
    },
  ],
  footnotes: [],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "枚",
  },
  leadIn: null,
  notes: null,
  readings: [
    {
      counterId: "枚",
      kana: "まい",
      kangoConjugationOptions: {
        allowsKuFor9: false,
        allowsKyuuFor9: true,
        allowsNanaFor7: true,
        allowsShiFor4: false,
        allowsShichiFor7: true,
        allowsYoFor4: false,
        allowsYonFor4: true,
      },
      readingId: "まい",
      wagoStyle: null,
      wordOrigin: WordOrigin.Chinese,
    },
  ],
};

export const COUNTER_校: Counter = {
  counterId: "校",
  disambiguations: [],
  englishName: "schools",
  externalLinks: [],
  footnotes: [],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "校",
  },
  leadIn: null,
  notes: null,
  readings: [
    {
      counterId: "校",
      kana: "こう",
      kangoConjugationOptions: {
        allowsKuFor9: false,
        allowsKyuuFor9: true,
        allowsNanaFor7: true,
        allowsShiFor4: false,
        allowsShichiFor7: false,
        allowsYoFor4: false,
        allowsYonFor4: true,
      },
      readingId: "こう",
      wagoStyle: null,
      wordOrigin: WordOrigin.Chinese,
    },
  ],
};

export const COUNTER_歳: Counter = {
  counterId: "歳",
  disambiguations: [],
  englishName: "age",
  externalLinks: [],
  footnotes: [],
  irregulars: {},
  kanji: {
    additionalKanji: ["才"],
    primaryKanji: "歳",
  },
  leadIn: null,
  notes: null,
  readings: [
    {
      counterId: "歳",
      kana: "さい",
      kangoConjugationOptions: {
        allowsKuFor9: false,
        allowsKyuuFor9: true,
        allowsNanaFor7: true,
        allowsShiFor4: false,
        allowsShichiFor7: false,
        allowsYoFor4: false,
        allowsYonFor4: true,
      },
      readingId: "さい",
      wagoStyle: null,
      wordOrigin: WordOrigin.Chinese,
    },
  ],
};

export const COUNTER_皿: Counter = {
  counterId: "皿",
  disambiguations: [],
  englishName: "plates of food",
  externalLinks: [],
  footnotes: [],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "皿",
  },
  leadIn: null,
  notes: null,
  readings: [
    {
      counterId: "皿",
      kana: "さら",
      kangoConjugationOptions: {
        allowsKuFor9: false,
        allowsKyuuFor9: true,
        allowsNanaFor7: true,
        allowsShiFor4: false,
        allowsShichiFor7: false,
        allowsYoFor4: false,
        allowsYonFor4: true,
      },
      readingId: "さら",
      wagoStyle: {
        alsoUsesKangoIchi: false,
        alsoUsesKangoNi: false,
        alsoUsesKangoSan: true,
        kana: "さら",
        rangeEndInclusive: 3,
      },
      wordOrigin: WordOrigin.Japanese,
    },
  ],
};

export const COUNTER_社: Counter = {
  counterId: "社",
  disambiguations: [],
  englishName: "companies and temples",
  externalLinks: [],
  footnotes: [],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "社",
  },
  leadIn: null,
  notes: null,
  readings: [
    {
      counterId: "社",
      kana: "しゃ",
      kangoConjugationOptions: {
        allowsKuFor9: false,
        allowsKyuuFor9: true,
        allowsNanaFor7: true,
        allowsShiFor4: false,
        allowsShichiFor7: false,
        allowsYoFor4: false,
        allowsYonFor4: true,
      },
      readingId: "しゃ",
      wagoStyle: null,
      wordOrigin: WordOrigin.Chinese,
    },
  ],
};

export const COUNTER_組: Counter = {
  counterId: "組",
  disambiguations: [],
  englishName: "groups and pairs",
  externalLinks: [],
  footnotes: [],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "組",
  },
  leadIn: null,
  notes: null,
  readings: [
    {
      counterId: "組",
      kana: "くみ",
      kangoConjugationOptions: {
        allowsKuFor9: false,
        allowsKyuuFor9: true,
        allowsNanaFor7: true,
        allowsShiFor4: false,
        allowsShichiFor7: false,
        allowsYoFor4: false,
        allowsYonFor4: true,
      },
      readingId: "くみ",
      wagoStyle: null,
      wordOrigin: WordOrigin.Japanese,
    },
  ],
};

export const COUNTER_缶: Counter = {
  counterId: "缶",
  disambiguations: [
    {
      distinction: 缶Components.Disambiguation本,
      otherCounterId: "本",
    },
  ],
  englishName: "cans",
  externalLinks: [],
  footnotes: [缶Components.Footnote1],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "缶",
  },
  leadIn: null,
  notes: null,
  readings: [
    {
      counterId: "缶",
      kana: "かん",
      kangoConjugationOptions: {
        allowsKuFor9: false,
        allowsKyuuFor9: true,
        allowsNanaFor7: true,
        allowsShiFor4: false,
        allowsShichiFor7: false,
        allowsYoFor4: false,
        allowsYonFor4: true,
      },
      readingId: "かん",
      wagoStyle: {
        alsoUsesKangoIchi: true,
        alsoUsesKangoNi: true,
        alsoUsesKangoSan: false,
        kana: "かん",
        rangeEndInclusive: 2,
      },
      wordOrigin: WordOrigin.Chinese,
    },
  ],
};

export const COUNTER_羽: Counter = {
  counterId: "羽",
  disambiguations: [],
  englishName: "birds and rabbits",
  externalLinks: [
    {
      additionalDescription: null,
      displayText: "羽: Counting Birds, Bats, and Bun-Buns",
      language: ExternalLinkLanguage.English,
      siteName: "Tofugu",
      url: "https://www.tofugu.com/japanese/japanese-counter-wa/",
    },
  ],
  footnotes: [],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "羽",
  },
  leadIn: null,
  notes: null,
  readings: [
    {
      counterId: "羽",
      kana: "わ",
      kangoConjugationOptions: {
        allowsKuFor9: false,
        allowsKyuuFor9: true,
        allowsNanaFor7: true,
        allowsShiFor4: false,
        allowsShichiFor7: true,
        allowsYoFor4: false,
        allowsYonFor4: true,
      },
      readingId: "わ",
      wagoStyle: null,
      wordOrigin: WordOrigin.Japanese,
    },
  ],
};

export const COUNTER_色: Counter = {
  counterId: "色",
  disambiguations: [],
  englishName: "colours",
  externalLinks: [],
  footnotes: [],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "色",
  },
  leadIn: null,
  notes: null,
  readings: [
    {
      counterId: "色",
      kana: "しょく",
      kangoConjugationOptions: {
        allowsKuFor9: false,
        allowsKyuuFor9: true,
        allowsNanaFor7: true,
        allowsShiFor4: false,
        allowsShichiFor7: false,
        allowsYoFor4: false,
        allowsYonFor4: true,
      },
      readingId: "しょく",
      wagoStyle: null,
      wordOrigin: WordOrigin.Chinese,
    },
  ],
};

export const COUNTER_語: Counter = {
  counterId: "語",
  disambiguations: [],
  englishName: "words",
  externalLinks: [],
  footnotes: [],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "語",
  },
  leadIn: null,
  notes: null,
  readings: [
    {
      counterId: "語",
      kana: "ご",
      kangoConjugationOptions: {
        allowsKuFor9: false,
        allowsKyuuFor9: true,
        allowsNanaFor7: true,
        allowsShiFor4: false,
        allowsShichiFor7: false,
        allowsYoFor4: false,
        allowsYonFor4: true,
      },
      readingId: "ご",
      wagoStyle: null,
      wordOrigin: WordOrigin.Chinese,
    },
  ],
};

export const COUNTER_足: Counter = {
  counterId: "足",
  disambiguations: [],
  englishName: "pairs of footwear",
  externalLinks: [],
  footnotes: [],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "足",
  },
  leadIn: null,
  notes: null,
  readings: [
    {
      counterId: "足",
      kana: "そく",
      kangoConjugationOptions: {
        allowsKuFor9: false,
        allowsKyuuFor9: true,
        allowsNanaFor7: true,
        allowsShiFor4: false,
        allowsShichiFor7: false,
        allowsYoFor4: false,
        allowsYonFor4: true,
      },
      readingId: "そく",
      wagoStyle: null,
      wordOrigin: WordOrigin.Chinese,
    },
  ],
};

export const COUNTER_軒: Counter = {
  counterId: "軒",
  disambiguations: [],
  englishName: "houses and buildings",
  externalLinks: [],
  footnotes: [],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "軒",
  },
  leadIn: null,
  notes: null,
  readings: [
    {
      counterId: "軒",
      kana: "けん",
      kangoConjugationOptions: {
        allowsKuFor9: false,
        allowsKyuuFor9: true,
        allowsNanaFor7: true,
        allowsShiFor4: false,
        allowsShichiFor7: false,
        allowsYoFor4: false,
        allowsYonFor4: true,
      },
      readingId: "けん",
      wagoStyle: null,
      wordOrigin: WordOrigin.Chinese,
    },
  ],
};

export const COUNTER_週: Counter = {
  counterId: "週",
  disambiguations: [],
  englishName: "weeks",
  externalLinks: [],
  footnotes: [],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "週",
  },
  leadIn: null,
  notes: null,
  readings: [
    {
      counterId: "週",
      kana: "しゅう",
      kangoConjugationOptions: {
        allowsKuFor9: false,
        allowsKyuuFor9: true,
        allowsNanaFor7: true,
        allowsShiFor4: false,
        allowsShichiFor7: false,
        allowsYoFor4: false,
        allowsYonFor4: true,
      },
      readingId: "しゅう",
      wagoStyle: null,
      wordOrigin: WordOrigin.Chinese,
    },
  ],
};

export const COUNTER_階: Counter = {
  counterId: "階",
  disambiguations: [],
  englishName: "floors",
  externalLinks: [
    {
      additionalDescription: null,
      displayText: "階: Floors of a Building",
      language: ExternalLinkLanguage.English,
      siteName: "Tofugu",
      url: "https://www.tofugu.com/japanese/japanese-counter-kai-floors/",
    },
  ],
  footnotes: [],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "階",
  },
  leadIn: null,
  notes: null,
  readings: [
    {
      counterId: "階",
      kana: "かい",
      kangoConjugationOptions: {
        allowsKuFor9: false,
        allowsKyuuFor9: true,
        allowsNanaFor7: true,
        allowsShiFor4: false,
        allowsShichiFor7: true,
        allowsYoFor4: false,
        allowsYonFor4: true,
      },
      readingId: "かい",
      wagoStyle: null,
      wordOrigin: WordOrigin.Chinese,
    },
  ],
};

export const COUNTER_頭: Counter = {
  counterId: "頭",
  disambiguations: [],
  englishName: "large animals",
  externalLinks: [
    {
      additionalDescription: null,
      displayText: "頭: Counting Those Big, Professional Animals",
      language: ExternalLinkLanguage.English,
      siteName: "Tofugu",
      url: "https://www.tofugu.com/japanese/japanese-counter-tou/",
    },
  ],
  footnotes: [],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "頭",
  },
  leadIn: null,
  notes: null,
  readings: [
    {
      counterId: "頭",
      kana: "とう",
      kangoConjugationOptions: {
        allowsKuFor9: false,
        allowsKyuuFor9: true,
        allowsNanaFor7: true,
        allowsShiFor4: false,
        allowsShichiFor7: true,
        allowsYoFor4: false,
        allowsYonFor4: true,
      },
      readingId: "とう",
      wagoStyle: null,
      wordOrigin: WordOrigin.Chinese,
    },
  ],
};

export const COUNTERS_LOOKUP: { [counterId: string]: Counter } = {
  ヶ国: COUNTER_ヶ国,
  ヶ所: COUNTER_ヶ所,
  ヶ月: COUNTER_ヶ月,
  人: COUNTER_人,
  件: COUNTER_件,
  円: COUNTER_円,
  冊: COUNTER_冊,
  分: COUNTER_分,
  切れ: COUNTER_切れ,
  匹: COUNTER_匹,
  口: COUNTER_口,
  台: COUNTER_台,
  名: COUNTER_名,
  周: COUNTER_周,
  回: COUNTER_回,
  巻: COUNTER_巻,
  席: COUNTER_席,
  年: COUNTER_年,
  戦: COUNTER_戦,
  日: COUNTER_日,
  時: COUNTER_時,
  曲: COUNTER_曲,
  本: COUNTER_本,
  束: COUNTER_束,
  枚: COUNTER_枚,
  校: COUNTER_校,
  歳: COUNTER_歳,
  皿: COUNTER_皿,
  社: COUNTER_社,
  組: COUNTER_組,
  缶: COUNTER_缶,
  羽: COUNTER_羽,
  色: COUNTER_色,
  語: COUNTER_語,
  足: COUNTER_足,
  軒: COUNTER_軒,
  週: COUNTER_週,
  階: COUNTER_階,
  頭: COUNTER_頭,
};
