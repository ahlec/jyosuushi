// DO NOT HAND-MODIFY THIS FILE!!
// This file was built using `yarn build-data` from the SQLite database.
// Modifications will be lost if they are made manually and not through the database.

import {
  Counter,
  CounterIrregularType,
  CountingSystem,
  ExternalLinkLanguage,
  WordOrigin,
} from "@jyosuushi/interfaces";

import * as 人Components from "@data/counter-components/人";
import * as 冊Components from "@data/counter-components/冊";
import * as 切れComponents from "@data/counter-components/切れ";
import * as 匹Components from "@data/counter-components/匹";
import * as 口Components from "@data/counter-components/口";
import * as 名Components from "@data/counter-components/名";
import * as 巻Components from "@data/counter-components/巻";
import * as 年Components from "@data/counter-components/年";
import * as 戦Components from "@data/counter-components/戦";
import * as 本Components from "@data/counter-components/本";
import * as 校Components from "@data/counter-components/校";
import * as 歳Components from "@data/counter-components/歳";
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
      description:
        "Detailed and well-researched article from the kings of Japanese language learning.",
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
      description:
        "Detailed and well-researched article from the kings of Japanese language learning.",
      displayText: "人: Counting People and Smart Animals",
      language: ExternalLinkLanguage.English,
      siteName: "Tofugu",
      url: "https://www.tofugu.com/japanese/japanese-counter-nin/",
    },
    {
      description:
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
  disambiguations: [
    {
      distinction: 冊Components.Disambiguation巻,
      otherCounterId: "巻",
    },
  ],
  englishName: "books",
  externalLinks: [
    {
      description:
        "Detailed and well-researched article from the kings of Japanese language learning.",
      displayText: "冊: Counting Books",
      language: ExternalLinkLanguage.English,
      siteName: "Tofugu",
      url: "https://www.tofugu.com/japanese/japanese-counter-satsu/",
    },
    {
      description:
        "Japanese dictionary entries, compiled from multiple sources.",
      displayText: "冊（読み：サク）",
      language: ExternalLinkLanguage.Japanese,
      siteName: "コトバンク",
      url: "https://kotobank.jp/word/%E5%86%8A-509491",
    },
  ],
  footnotes: [
    冊Components.Footnote1,
    冊Components.Footnote2,
    冊Components.Footnote3,
    冊Components.Footnote4,
    冊Components.Footnote5,
  ],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "冊",
  },
  leadIn: "The primary common-use counter for books.",
  notes: 冊Components.CounterNotes,
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
      description:
        "Detailed and well-researched article from the kings of Japanese language learning.",
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
  disambiguations: [
    {
      distinction: 切れComponents.Disambiguation口,
      otherCounterId: "口",
    },
  ],
  englishName: "slices",
  externalLinks: [
    {
      description:
        "Japanese dictionary entries, compiled from multiple sources.",
      displayText: "切れ（読み：きれ）",
      language: ExternalLinkLanguage.Japanese,
      siteName: "コトバンク",
      url: "https://kotobank.jp/word/%E5%88%87%E3%82%8C-480539",
    },
  ],
  footnotes: [
    切れComponents.Footnote1,
    切れComponents.Footnote2,
    切れComponents.Footnote3,
    切れComponents.Footnote4,
    切れComponents.Footnote5,
  ],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "切れ",
  },
  leadIn: "A counter used for counting slices of something, usually food.",
  notes: 切れComponents.CounterNotes,
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
        allowsYoFor4: true,
        allowsYonFor4: true,
      },
      readingId: "きれ",
      wagoStyle: {
        alsoUsesKangoIchi: false,
        alsoUsesKangoNi: false,
        alsoUsesKangoSan: true,
        kana: "きれ",
        rangeEndInclusive: 3,
      },
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
      description:
        "Detailed and well-researched article from the kings of Japanese language learning.",
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
  disambiguations: [
    {
      distinction: 口Components.Disambiguation本,
      otherCounterId: "本",
    },
    {
      distinction: 口Components.Disambiguation切れ,
      otherCounterId: "切れ",
    },
  ],
  englishName: "bites",
  externalLinks: [
    {
      description:
        "Japanese dictionary entries, compiled from multiple sources.",
      displayText: "口（読み：くち）",
      language: ExternalLinkLanguage.Japanese,
      siteName: "コトバンク",
      url: "https://kotobank.jp/word/%E5%8F%A3-55470",
    },
  ],
  footnotes: [
    口Components.Footnote1,
    口Components.Footnote2,
    口Components.Footnote3,
    口Components.Footnote4,
    口Components.Footnote5,
    口Components.Footnote6,
    口Components.Footnote7,
    口Components.Footnote8,
    口Components.Footnote9,
    口Components.Footnote10,
    口Components.Footnote11,
    口Components.Footnote12,
  ],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "口",
  },
  leadIn:
    "A multi-use counter which primarily counts bites of food or sips of drinks, but can also count swords or sums of money.",
  notes: 口Components.CounterNotes,
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
      wagoStyle: {
        alsoUsesKangoIchi: false,
        alsoUsesKangoNi: false,
        alsoUsesKangoSan: true,
        kana: "くち",
        rangeEndInclusive: 3,
      },
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
      description:
        "Detailed and well-researched article from the kings of Japanese language learning.",
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
      description:
        "Detailed and well-researched article from the kings of Japanese language learning.",
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
      description:
        "Detailed and well-researched article from the kings of Japanese language learning.",
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
  disambiguations: [
    {
      distinction: 巻Components.Disambiguation冊,
      otherCounterId: "冊",
    },
  ],
  englishName: "volumes",
  externalLinks: [],
  footnotes: [巻Components.Footnote1, 巻Components.Footnote2],
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
  disambiguations: [
    {
      distinction: 年Components.Disambiguation歳,
      otherCounterId: "歳",
    },
  ],
  englishName: "years",
  externalLinks: [
    {
      description:
        "Detailed and well-researched article from the kings of Japanese language learning.",
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
  externalLinks: [
    {
      description:
        "Masters thesis that focuses on the establishment of new counters, in particular <counter:店> and <counter:試合>. Has a lengthy comparison of {試合}^(しあい) and {戦}^(せん) as counters.",
      displayText: "近現代日本語における新たな助数詞の成立と定着",
      language: ExternalLinkLanguage.Japanese,
      siteName: "筑波大学",
      url: "http://hdl.handle.net/2241/00128666",
    },
  ],
  footnotes: [
    戦Components.Footnote1,
    戦Components.Footnote2,
    戦Components.Footnote3,
    戦Components.Footnote4,
  ],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "戦",
  },
  leadIn:
    "A counter used for both conflicts in war and matches in sports/competitions.",
  notes: 戦Components.CounterNotes,
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
      description:
        "Detailed and well-researched article from the kings of Japanese language learning.",
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
      description:
        "Detailed and well-researched article from the kings of Japanese language learning.",
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
    {
      distinction: 本Components.Disambiguation口,
      otherCounterId: "口",
    },
  ],
  englishName: "long, thin objects",
  externalLinks: [
    {
      description:
        "Detailed and well-researched article from the kings of Japanese language learning.",
      displayText: "本: Counting Long, Skinny Things",
      language: ExternalLinkLanguage.English,
      siteName: "Tofugu",
      url: "https://www.tofugu.com/japanese/japanese-counter-hon/",
    },
    {
      description:
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
    本Components.Footnote5,
    本Components.Footnote6,
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
      description:
        "Detailed and well-researched article from the kings of Japanese language learning.",
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
  externalLinks: [
    {
      description:
        "Japanese dictionary entries, compiled from multiple sources.",
      displayText: "校（読み：コウ）",
      language: ExternalLinkLanguage.Japanese,
      siteName: "コトバンク",
      url: "https://kotobank.jp/word/%E6%A0%A1-493763",
    },
    {
      description:
        "Article giving an overview of the printing and proofing process in design and publishing.",
      displayText:
        "初校？初稿？デザイナーなら知っておきたい基本的なデザイン業界専門用語",
      language: ExternalLinkLanguage.Japanese,
      siteName: "MTFC",
      url: "https://mt-fc.net/design-term",
    },
  ],
  footnotes: [
    校Components.Footnote1,
    校Components.Footnote2,
    校Components.Footnote3,
    校Components.Footnote4,
  ],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "校",
  },
  leadIn: "A counter used for counting schools and printer's proofs.",
  notes: 校Components.CounterNotes,
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
  disambiguations: [
    {
      distinction: 歳Components.Disambiguation年,
      otherCounterId: "年",
    },
  ],
  englishName: "age",
  externalLinks: [
    {
      description:
        "Japanese dictionary entries, compiled from multiple sources.",
      displayText: "歳（読み：サイ）",
      language: ExternalLinkLanguage.Japanese,
      siteName: "コトバンク",
      url: "https://kotobank.jp/word/%E6%AD%B3-507098",
    },
  ],
  footnotes: [
    歳Components.Footnote1,
    歳Components.Footnote2,
    歳Components.Footnote3,
    歳Components.Footnote4,
    歳Components.Footnote5,
    歳Components.Footnote6,
    歳Components.Footnote7,
    歳Components.Footnote8,
  ],
  irregulars: {
    20: [
      {
        amount: 20,
        countingSystem: null,
        doesPresenceEraseRegularConjugations: false,
        reading: "はたち",
        type: CounterIrregularType.ArbitraryReading,
      },
    ],
  },
  kanji: {
    additionalKanji: ["才"],
    primaryKanji: "歳",
  },
  leadIn:
    'The counter for expressing age in years, and thus the primary "age" counter.',
  notes: 歳Components.CounterNotes,
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
      description:
        "Detailed and well-researched article from the kings of Japanese language learning.",
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
      description:
        "Detailed and well-researched article from the kings of Japanese language learning.",
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
      description:
        "Detailed and well-researched article from the kings of Japanese language learning.",
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
