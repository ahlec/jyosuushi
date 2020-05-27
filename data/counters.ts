// DO NOT HAND-MODIFY THIS FILE!!
// This file was built using `yarn build-data` from the SQLite database.
// Modifications will be lost if they are made manually and not through the database.

import {
  Counter,
  CounterIrregularType,
  CountingSystem,
  JapaneseDictionary,
  WordOrigin
} from "../src/interfaces";
import * as DISAMBIGUATIONS from "./disambiguations";

export const COUNTER_ヶ国: Counter = {
  counterId: "ヶ国",
  dictionaryEntries: [],
  disambiguations: {},
  englishName: "countries",
  externalLinks: [],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "ヶ国"
  },
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
        allowsYonFor4: true
      },
      readingId: "かこく",
      wagoStyle: null,
      wordOrigin: WordOrigin.Chinese
    }
  ]
};

export const COUNTER_ヶ所: Counter = {
  counterId: "ヶ所",
  dictionaryEntries: [],
  disambiguations: {},
  englishName: "places",
  externalLinks: [],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "ヶ所"
  },
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
        allowsYonFor4: true
      },
      readingId: "かしょ",
      wagoStyle: null,
      wordOrigin: WordOrigin.Chinese
    }
  ]
};

export const COUNTER_ヶ月: Counter = {
  counterId: "ヶ月",
  dictionaryEntries: [
    {
      directLink: "https://dictionary.goo.ne.jp/word/%E7%AE%87%E6%9C%88/",
      japanese:
        "［接尾］助数詞。月数を数えるのに用いる。「数―」「三―間 (かん) 」",
      source: JapaneseDictionary.Goo,
      translation:
        '[Suffix] Counter. Used to count the number of months. "A few months" "A three month period"'
    }
  ],
  disambiguations: {},
  englishName: "months",
  externalLinks: [
    {
      additionalDescription: null,
      displayText: "月: Counting Months",
      siteName: "Tofugu",
      url: "https://www.tofugu.com/japanese/japanese-counter-tsuki-gatsu-getsu/"
    }
  ],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "ヶ月"
  },
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
        allowsYonFor4: true
      },
      readingId: "かげつ",
      wagoStyle: null,
      wordOrigin: WordOrigin.Chinese
    }
  ]
};

export const COUNTER_人: Counter = {
  counterId: "人",
  dictionaryEntries: [
    {
      directLink:
        "https://dictionary.goo.ne.jp/word/%E4%BA%BA_%28%E3%81%AB%E3%82%93%29/",
      japanese: "［接尾］助数詞。人数を数えるのに用いる。「五人」「七人」",
      source: JapaneseDictionary.Goo,
      translation: "[Suffix] Counter. Used to count the number of people."
    }
  ],
  disambiguations: {
    名: DISAMBIGUATIONS.DISAMBIGUATION_人名
  },
  englishName: "people",
  externalLinks: [
    {
      additionalDescription: null,
      displayText: "人: Counting People and Smart Animals",
      siteName: "Tofugu",
      url: "https://www.tofugu.com/japanese/japanese-counter-nin/"
    }
  ],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "人"
  },
  notes: null,
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
        allowsYonFor4: false
      },
      readingId: "にん",
      wagoStyle: {
        alsoUsesKangoIchi: false,
        alsoUsesKangoNi: false,
        alsoUsesKangoSan: false,
        kana: "り",
        rangeEndInclusive: 2
      },
      wordOrigin: WordOrigin.Japanese
    }
  ]
};

export const COUNTER_件: Counter = {
  counterId: "件",
  dictionaryEntries: [],
  disambiguations: {},
  englishName: "matters",
  externalLinks: [],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "件"
  },
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
        allowsYonFor4: true
      },
      readingId: "けん",
      wagoStyle: null,
      wordOrigin: WordOrigin.Chinese
    }
  ]
};

export const COUNTER_円: Counter = {
  counterId: "円",
  dictionaryEntries: [],
  disambiguations: {},
  englishName: "yen",
  externalLinks: [],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "円"
  },
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
        allowsYonFor4: true
      },
      readingId: "えん",
      wagoStyle: null,
      wordOrigin: WordOrigin.Chinese
    }
  ]
};

export const COUNTER_冊: Counter = {
  counterId: "冊",
  dictionaryEntries: [
    {
      directLink:
        "https://dictionary.goo.ne.jp/word/%E5%86%8A_%28%E3%81%95%E3%81%A4%29/",
      japanese: "［接尾］助数詞。書物などを数えるのに用いる。「雑誌二、三冊」",
      source: JapaneseDictionary.Goo,
      translation: "[Suffix] Counter. Used to count things such as books."
    }
  ],
  disambiguations: {},
  englishName: "books",
  externalLinks: [
    {
      additionalDescription: null,
      displayText: "冊: Counting Books",
      siteName: "Tofugu",
      url: "https://www.tofugu.com/japanese/japanese-counter-satsu/"
    }
  ],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "冊"
  },
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
        allowsYonFor4: true
      },
      readingId: "さつ",
      wagoStyle: null,
      wordOrigin: WordOrigin.Chinese
    }
  ]
};

export const COUNTER_分: Counter = {
  counterId: "分",
  dictionaryEntries: [],
  disambiguations: {},
  englishName: "minutes",
  externalLinks: [
    {
      additionalDescription: null,
      displayText: "分: Counting Minutes and Edo Period Silver Currency",
      siteName: "Tofugu",
      url: "https://www.tofugu.com/japanese/japanese-counter-fun/"
    }
  ],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "分"
  },
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
        allowsYonFor4: true
      },
      readingId: "ふん",
      wagoStyle: null,
      wordOrigin: WordOrigin.Chinese
    }
  ]
};

export const COUNTER_切れ: Counter = {
  counterId: "切れ",
  dictionaryEntries: [
    {
      directLink:
        "https://dictionary.goo.ne.jp/word/%E5%88%87%E3%82%8C_%28%E3%81%8D%E3%82%8C%29/",
      japanese:
        "［接尾］助数詞。\n１ 切ったものを数えるのに用いる。「たくあん一切れ」「ようかん二切れ」\n\n２ 江戸時代、一分金を数えるのに用いる。\n\n「白銀五百匁二包み、小判二十五両一歩合わせて四十―」〈浄・二枚絵草紙〉",
      source: JapaneseDictionary.Goo,
      translation:
        '[Suffix] Counter.\n1. Used to count things that have been cut. "One slice of Takuan (pickled Daikon radish)." "Two slices of Youkan (sweet bean jelly)."\n2. In the Edo period, used to count Ichibukin (a type of gold coin).'
    }
  ],
  disambiguations: {},
  englishName: "cuts of meat",
  externalLinks: [],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "切れ"
  },
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
        allowsYonFor4: true
      },
      readingId: "きれ",
      wagoStyle: null,
      wordOrigin: WordOrigin.Japanese
    }
  ]
};

export const COUNTER_匹: Counter = {
  counterId: "匹",
  dictionaryEntries: [
    {
      directLink:
        "https://dictionary.goo.ne.jp/word/%E5%8C%B9_%28%E3%81%B2%E3%81%8D%29/",
      japanese:
        "［接尾］助数詞。動物・鳥・昆虫・魚などを数えるのに用いる。上に来る語によっては「びき」「ぴき」となる。「2―の猫」",
      source: JapaneseDictionary.Goo,
      translation:
        "[Suffix] Counter. Used to count animals, birds, insects, and fish. Depending on the preceding word, this can come 「びき」 or 「ぴき」."
    }
  ],
  disambiguations: {},
  englishName: "small animals",
  externalLinks: [
    {
      additionalDescription: null,
      displayText: "匹: Counting Animals, Bugs, and Wild Children",
      siteName: "Tofugu",
      url: "https://www.tofugu.com/japanese/japanese-counter-hiki/"
    }
  ],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "匹"
  },
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
        allowsYonFor4: true
      },
      readingId: "ひき",
      wagoStyle: null,
      wordOrigin: WordOrigin.Japanese
    }
  ]
};

export const COUNTER_口: Counter = {
  counterId: "口",
  dictionaryEntries: [
    {
      directLink:
        "https://dictionary.goo.ne.jp/word/%E5%8F%A3_%28%E3%81%8F%E3%81%A1%29/",
      japanese:
        "［接尾］助数詞。\n１ 刀剣などを数えるのに用いる。「脇差し数口」\n\n２ ものを食べる回数をいうのに用いる。「ひと口食べる」\n\n３ 寄付や出費などの分担の単位として用いる。「ひと口一万円の寄付金」",
      source: JapaneseDictionary.Goo,
      translation:
        '[Suffix] Counter.\n1. Used to count swords and daggers. "A couple Wakizashi (short swords)"\n2. Used to count the number of times that something has been eaten. "I\'ll have one bite."\n3. When talking about donations, expenses, or similar things, used as a unit to talk about shares of money. "Donations of ¥10,000 per share."'
    }
  ],
  disambiguations: {},
  englishName: "bites",
  externalLinks: [],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "口"
  },
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
        allowsYonFor4: true
      },
      readingId: "くち",
      wagoStyle: null,
      wordOrigin: WordOrigin.Japanese
    }
  ]
};

export const COUNTER_台: Counter = {
  counterId: "台",
  dictionaryEntries: [
    {
      directLink:
        "https://dictionary.goo.ne.jp/word/%E5%8F%B0_%28%E3%81%A0%E3%81%84%29/",
      japanese:
        "［接尾］助数詞。\n１ 車両や機械などを数えるのに用いる。「計算機3台」\n\n２ 年齢や値段などのおおよその範囲を表すのに用いる。「20歳台で父を失う」「1ドルが100円台になる」\n\n３ 印刷や製本で16ページ分あるいは32ページ分などを1台として、その数を数えるのに用いる。折 (おり) 。「16台256ページの本」",
      source: JapaneseDictionary.Goo,
      translation:
        '[Suffix] Counter.\n1. Used to count things such as machines and vehicles.\n2. Used to express rough ranges of ages or price. "I parted ways with my dad when I was around 20." or "1 dollar is something like ¥100."\n3. In printing and publishing, used to count sections of either 16- or 32-pages. "This 16台 book has 256 pages."'
    }
  ],
  disambiguations: {},
  englishName: "machines and large objects",
  externalLinks: [
    {
      additionalDescription: null,
      displayText: "台: Counting Machines, Furniture, & Whole Cakes",
      siteName: "Tofugu",
      url: "https://www.tofugu.com/japanese/japanese-counter-dai/"
    }
  ],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "台"
  },
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
        allowsYonFor4: true
      },
      readingId: "だい",
      wagoStyle: null,
      wordOrigin: WordOrigin.Chinese
    }
  ]
};

export const COUNTER_名: Counter = {
  counterId: "名",
  dictionaryEntries: [
    {
      directLink:
        "https://dictionary.goo.ne.jp/word/%E5%90%8D_%28%E3%82%81%E3%81%84%29/",
      japanese: "［接尾］助数詞。人数を数えるのに用いる。「40名」",
      source: JapaneseDictionary.Goo,
      translation: "[Suffix] Counter. Used to count the number of people."
    }
  ],
  disambiguations: {
    人: DISAMBIGUATIONS.DISAMBIGUATION_人名
  },
  englishName: "people",
  externalLinks: [
    {
      additionalDescription: null,
      displayText: "人: Counting People and Smart Animals",
      siteName: "Tofugu",
      url: "https://www.tofugu.com/japanese/japanese-counter-nin/"
    }
  ],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "名"
  },
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
        allowsYonFor4: true
      },
      readingId: "めい",
      wagoStyle: null,
      wordOrigin: WordOrigin.Chinese
    }
  ]
};

export const COUNTER_周: Counter = {
  counterId: "周",
  dictionaryEntries: [],
  disambiguations: {},
  englishName: "laps and circuits",
  externalLinks: [],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "周"
  },
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
        allowsYonFor4: true
      },
      readingId: "しゅう",
      wagoStyle: null,
      wordOrigin: WordOrigin.Chinese
    }
  ]
};

export const COUNTER_回: Counter = {
  counterId: "回",
  dictionaryEntries: [
    {
      directLink:
        "https://dictionary.goo.ne.jp/word/%E5%9B%9E_%28%E3%81%8B%E3%81%84%29/",
      japanese:
        "［接尾］助数詞。数または順序を表す語に付いて、度数または順序を表すのに用いる。「七回裏」「次回」",
      source: JapaneseDictionary.Goo,
      translation:
        '[Suffix] Counter. When following a number or a word expressive a relative order, used to express the number of times or an order. "Bottom of the seventh (baseball)" "Next time."'
    }
  ],
  disambiguations: {},
  englishName: "times (occurrences)",
  externalLinks: [
    {
      additionalDescription: null,
      displayText: "回: Repetitive Actions, Regular Events",
      siteName: "Tofugu",
      url: "https://www.tofugu.com/japanese/japanese-counter-kai-times/"
    }
  ],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "回"
  },
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
        allowsYonFor4: true
      },
      readingId: "かい",
      wagoStyle: null,
      wordOrigin: WordOrigin.Chinese
    }
  ]
};

export const COUNTER_巻: Counter = {
  counterId: "巻",
  dictionaryEntries: [
    {
      directLink:
        "https://dictionary.goo.ne.jp/word/%E5%B7%BB_%28%E3%81%8B%E3%82%93%29/",
      japanese:
        "［接尾］助数詞。\n１ 書籍の冊数をかぞえるのに用いる。「全3巻の書物」\n\n２ 巻物やテープ、フィルムなどの数をかぞえるのに用いる。「巻物3巻」「フィルム5巻」",
      source: JapaneseDictionary.Goo,
      translation:
        '[Suffix] Counter.\n1. Used to count the number of books in a publication. "A book in three parts."\n2. Used to count things such as scrolls, rolls of tape, or rolls of film. "Three scrolls" "Five rolls of film."'
    }
  ],
  disambiguations: {},
  englishName: "volumes",
  externalLinks: [],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "巻"
  },
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
        allowsYonFor4: true
      },
      readingId: "かん",
      wagoStyle: null,
      wordOrigin: WordOrigin.Chinese
    }
  ]
};

export const COUNTER_席: Counter = {
  counterId: "席",
  dictionaryEntries: [
    {
      directLink: "https://dictionary.goo.ne.jp/word/%E5%B8%AD/",
      japanese: "［接尾］助数詞。順位を表すのに用いる。「第一席」",
      source: JapaneseDictionary.Goo,
      translation:
        '[Suffix] Counter. Used to express order/rank. "First seat (eg, violin)"'
    }
  ],
  disambiguations: {},
  englishName: "seats",
  externalLinks: [],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "席"
  },
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
        allowsYonFor4: true
      },
      readingId: "せき",
      wagoStyle: {
        alsoUsesKangoIchi: true,
        alsoUsesKangoNi: true,
        alsoUsesKangoSan: false,
        kana: "せき",
        rangeEndInclusive: 2
      },
      wordOrigin: WordOrigin.Chinese
    }
  ]
};

export const COUNTER_年: Counter = {
  counterId: "年",
  dictionaryEntries: [
    {
      directLink:
        "https://dictionary.goo.ne.jp/word/%E5%B9%B4_%28%E3%81%AD%E3%82%93%29/",
      japanese:
        "［接尾］助数詞。\n１ 年号・年数を表すのに用いる。「平成七年」「西暦一九九五年」\n\n２ 年齢・学年を表すのに用いる。「人生五〇年」「五年に進級」",
      source: JapaneseDictionary.Goo,
      translation:
        '[Suffix] Counter.\n1. Used to express a year explicitly or an amount of years. "Heisei 7" "1995 (Gregorian)"\n2. Used to express age (in years) or school grade. "50 years old" "Graduated to fifth grade."'
    }
  ],
  disambiguations: {},
  englishName: "years",
  externalLinks: [
    {
      additionalDescription: null,
      displayText: "年: Counting Years and Planetary Orbits",
      siteName: "Tofugu",
      url: "https://www.tofugu.com/japanese/japanese-counters-nen/"
    }
  ],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "年"
  },
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
        allowsYonFor4: false
      },
      readingId: "ねん",
      wagoStyle: null,
      wordOrigin: WordOrigin.Chinese
    }
  ]
};

export const COUNTER_戦: Counter = {
  counterId: "戦",
  dictionaryEntries: [],
  disambiguations: {},
  englishName: "battles",
  externalLinks: [],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "戦"
  },
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
        allowsYonFor4: true
      },
      readingId: "せん",
      wagoStyle: null,
      wordOrigin: WordOrigin.Chinese
    }
  ]
};

export const COUNTER_日: Counter = {
  counterId: "日",
  dictionaryEntries: [],
  disambiguations: {},
  englishName: "days of the month",
  externalLinks: [
    {
      additionalDescription: null,
      displayText: "日: Counting Days",
      siteName: "Tofugu",
      url: "https://www.tofugu.com/japanese/japanese-counter-ka-nichi/"
    }
  ],
  irregulars: {
    1: [
      {
        amount: 1,
        countingSystem: null,
        doesPresenceEraseRegularConjugations: true,
        reading: "ついたち",
        type: CounterIrregularType.ArbitraryReading
      }
    ],
    2: [
      {
        amount: 2,
        countingSystem: CountingSystem.Wago,
        doesPresenceEraseRegularConjugations: true,
        reading: "ふつか",
        type: CounterIrregularType.SoundChange
      }
    ],
    3: [
      {
        amount: 3,
        countingSystem: CountingSystem.Wago,
        doesPresenceEraseRegularConjugations: true,
        reading: "みっか",
        type: CounterIrregularType.SoundChange
      }
    ],
    4: [
      {
        amount: 4,
        countingSystem: CountingSystem.Wago,
        doesPresenceEraseRegularConjugations: true,
        reading: "よっか",
        type: CounterIrregularType.SoundChange
      }
    ],
    5: [
      {
        amount: 5,
        countingSystem: CountingSystem.Wago,
        doesPresenceEraseRegularConjugations: true,
        reading: "いつか",
        type: CounterIrregularType.SoundChange
      }
    ],
    6: [
      {
        amount: 6,
        countingSystem: CountingSystem.Wago,
        doesPresenceEraseRegularConjugations: true,
        reading: "むいか",
        type: CounterIrregularType.SoundChange
      }
    ],
    7: [
      {
        amount: 7,
        countingSystem: CountingSystem.Wago,
        doesPresenceEraseRegularConjugations: true,
        reading: "なのか",
        type: CounterIrregularType.SoundChange
      }
    ],
    8: [
      {
        amount: 8,
        countingSystem: CountingSystem.Wago,
        doesPresenceEraseRegularConjugations: true,
        reading: "ようか",
        type: CounterIrregularType.SoundChange
      }
    ],
    9: [
      {
        amount: 9,
        countingSystem: CountingSystem.Wago,
        doesPresenceEraseRegularConjugations: true,
        reading: "ここのか",
        type: CounterIrregularType.SoundChange
      }
    ],
    10: [
      {
        amount: 10,
        countingSystem: null,
        doesPresenceEraseRegularConjugations: false,
        reading: "とおか",
        type: CounterIrregularType.ArbitraryReading
      }
    ],
    14: [
      {
        amount: 14,
        countingSystem: null,
        doesPresenceEraseRegularConjugations: false,
        reading: "じゅうよっか",
        type: CounterIrregularType.ArbitraryReading
      }
    ],
    20: [
      {
        amount: 20,
        countingSystem: null,
        doesPresenceEraseRegularConjugations: false,
        reading: "はつか",
        type: CounterIrregularType.ArbitraryReading
      }
    ],
    24: [
      {
        amount: 24,
        countingSystem: null,
        doesPresenceEraseRegularConjugations: false,
        reading: "にじゅうよっか",
        type: CounterIrregularType.ArbitraryReading
      }
    ]
  },
  kanji: {
    additionalKanji: [],
    primaryKanji: "日"
  },
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
        allowsYonFor4: true
      },
      readingId: "にち",
      wagoStyle: null,
      wordOrigin: WordOrigin.Chinese
    }
  ]
};

export const COUNTER_時: Counter = {
  counterId: "時",
  dictionaryEntries: [
    {
      directLink:
        "https://dictionary.goo.ne.jp/word/%E6%99%82_%28%E3%81%98%29/",
      japanese: "［接尾］助数詞。時刻を表すのに用いる。「七時」",
      source: JapaneseDictionary.Goo,
      translation:
        '[Suffix] Counter. Used to express moments in time. "7 o\'clock"'
    }
  ],
  disambiguations: {},
  englishName: "hours",
  externalLinks: [
    {
      additionalDescription: null,
      displayText: "時/時間: Counting Time and Hours",
      siteName: "Tofugu",
      url: "https://www.tofugu.com/japanese/japanese-counter-ji-jikan/"
    }
  ],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "時"
  },
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
        allowsYonFor4: false
      },
      readingId: "じ",
      wagoStyle: null,
      wordOrigin: WordOrigin.Chinese
    }
  ]
};

export const COUNTER_曲: Counter = {
  counterId: "曲",
  dictionaryEntries: [],
  disambiguations: {},
  englishName: "songs",
  externalLinks: [],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "曲"
  },
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
        allowsYonFor4: true
      },
      readingId: "きょく",
      wagoStyle: null,
      wordOrigin: WordOrigin.Chinese
    }
  ]
};

export const COUNTER_本: Counter = {
  counterId: "本",
  dictionaryEntries: [
    {
      directLink:
        "https://dictionary.goo.ne.jp/word/%E6%9C%AC_%28%E3%81%BB%E3%82%93%29/",
      japanese:
        "［接尾］助数詞。漢語の数詞に付く。上に来る語によっては「ぼん」「ぽん」となる。\n１ 長い物、細長い棒状のものなどを数えるのに用いる。「鉛筆五本」「二本の道路」\n\n２ 剣道や柔道などで、技 (わざ) の数を数えるのに用いる。「二本を先取する」\n\n３ 映画の作品の数を数えるのに用いる。「主演作五本」",
      source: JapaneseDictionary.Goo,
      translation:
        '[Suffix] Counter. Used in conjunction with the Chinese numbering system. Depending on the preceding word, can become either 「ぼん」 or 「ぽん」.\n1. Used to count long items or long, thin cylindrical items. "5 pencils" or "2 roads"\n2. In Kendo and Judo, used to count the number of moves.\n3. Used to count the number of movies (as in: video, cinema).'
    }
  ],
  disambiguations: {},
  englishName: "long, thin objects",
  externalLinks: [
    {
      additionalDescription: null,
      displayText: "本: Counting Long, Skinny Things",
      siteName: "Tofugu",
      url: "https://www.tofugu.com/japanese/japanese-counter-hon/"
    }
  ],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "本"
  },
  notes: null,
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
        allowsYonFor4: true
      },
      readingId: "ほん",
      wagoStyle: null,
      wordOrigin: WordOrigin.Chinese
    }
  ]
};

export const COUNTER_束: Counter = {
  counterId: "束",
  dictionaryEntries: [],
  disambiguations: {},
  englishName: "bundles",
  externalLinks: [],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "束"
  },
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
        allowsYonFor4: true
      },
      readingId: "たば",
      wagoStyle: {
        alsoUsesKangoIchi: false,
        alsoUsesKangoNi: false,
        alsoUsesKangoSan: true,
        kana: "たば",
        rangeEndInclusive: 3
      },
      wordOrigin: WordOrigin.Japanese
    }
  ]
};

export const COUNTER_枚: Counter = {
  counterId: "枚",
  dictionaryEntries: [
    {
      directLink:
        "https://dictionary.goo.ne.jp/word/%E6%9E%9A_%28%E3%81%BE%E3%81%84%29/",
      japanese:
        "［接尾］助数詞。\n１ 紙・板・皿などの薄く平たいものを数えるのに用いる。「二、三枚の紙」\n\n２ 原稿用紙の数を数えるのに用いる。ふつう400字詰めの原稿用紙を単位として数える。「五枚ほどの随筆」\n\n３ 魚を数えるのに用いる。「ヘラブナを三枚釣り上げる」\n\n４ 相撲で、その階級の人数を数えるのに用いる。「幕内を二枚ふやす」\n\n５ 相撲の番付で、席次を数えるのに用いる。「三枚上がる」\n\n６ 田や畑などの一区画を数えるのに用いる。「田一枚を植える」\n\n７ 浄瑠璃・長唄で、太夫や唄方の人数を数えるのに用いる。「二挺 (ちょう) 三枚」\n\n８ 近世の大判金・丁銀や近代の貨幣・銀貨など、貨幣の数を数えるのに用いる。「銀三拾枚」\n\n９ 駕籠舁 (かごかき) の人数を数えるのに用いる。\n\n「大坂より四―肩は二十四匁の定まり」〈浮・諸艶大鑑・六〉",
      source: JapaneseDictionary.Goo,
      translation:
        "[Suffix] Counter.\n1. Used to count thin, flat objects such as paper, boards, and plates.\n2. Used to count Japanese writing paper. Typically, this unit will represent a paper with 400 characters written on it.\n3. Used to count fish.\n4. In sumo wrestling, used to count the number of people at a particular rank.\n5. In sumo wrestling, used to count seat ranking.\n6. Used to count sections (areas) within rice paddies, agricultural plots, or the like.\n7. In some traditional Japanese performances, used to count the number of actors or musicians.\n8. When discussing monetary coins from the early modern (Edo) era or later, used to count the amount of money.\n9. Used to count the number of people carrying a palanquin."
    }
  ],
  disambiguations: {},
  englishName: "flat objects",
  externalLinks: [
    {
      additionalDescription: null,
      displayText: "枚: Counting Everything Flat",
      siteName: "Tofugu",
      url: "https://www.tofugu.com/japanese/japanese-counter-mai/"
    }
  ],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "枚"
  },
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
        allowsYonFor4: true
      },
      readingId: "まい",
      wagoStyle: null,
      wordOrigin: WordOrigin.Chinese
    }
  ]
};

export const COUNTER_校: Counter = {
  counterId: "校",
  dictionaryEntries: [
    {
      directLink: "https://dictionary.goo.ne.jp/word/%E6%A0%A1/",
      japanese:
        "{1} ［名］\n1. 学校。<「わが校」>\n2. 書物の文字の誤りを調べ正すこと。校正。<「校を重ねる」>\n\n{2} ［接尾］助数詞。校正の回数を数えるのに用いる。<「初校」><「再校」><「三校」>",
      source: JapaneseDictionary.Goo,
      translation:
        '{1} Noun\n\n1. School. <"Our school">\n2. To look for and correct mistakes in the characters of documents. Proofreading. <"To proofread again and again">\n\n{2} [Suffix] Counter. Used to count the number of proofs[^1]. <"First proof">, <"Second proof">, <"Third proof">\n\n[^1]: Proofs in the printing sense. From [Merriam Webster](https://www.merriam-webster.com/dictionary/proof): _a copy (as of typeset text) made for examination or correction.'
    }
  ],
  disambiguations: {},
  englishName: "schools",
  externalLinks: [],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "校"
  },
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
        allowsYonFor4: true
      },
      readingId: "こう",
      wagoStyle: null,
      wordOrigin: WordOrigin.Chinese
    }
  ]
};

export const COUNTER_歳: Counter = {
  counterId: "歳",
  dictionaryEntries: [
    {
      directLink: "https://dictionary.goo.ne.jp/word/%E6%AD%B3/",
      japanese:
        "［接尾］助数詞。年齢・年数を数えるのに用いる。「三歳」「満五歳」",
      source: JapaneseDictionary.Goo,
      translation: "[Suffix] Counter. Used to count age or number of years."
    }
  ],
  disambiguations: {},
  englishName: "age",
  externalLinks: [],
  irregulars: {},
  kanji: {
    additionalKanji: ["才"],
    primaryKanji: "歳"
  },
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
        allowsYonFor4: true
      },
      readingId: "さい",
      wagoStyle: null,
      wordOrigin: WordOrigin.Chinese
    }
  ]
};

export const COUNTER_皿: Counter = {
  counterId: "皿",
  dictionaryEntries: [
    {
      directLink: "https://dictionary.goo.ne.jp/word/%E7%9A%BF/",
      japanese:
        "［接尾］助数詞。皿に盛った食物や料理などの数を数えるのに用いる。「カレーライス二―」「炒 (いた) め物三―」",
      source: JapaneseDictionary.Goo,
      translation:
        '[Suffix] Counter. Used to count the quantity of food served on a plate. "Two plates of curry rice." "Three plates of stir-fry."'
    }
  ],
  disambiguations: {},
  englishName: "plates of food",
  externalLinks: [],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "皿"
  },
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
        allowsYonFor4: true
      },
      readingId: "さら",
      wagoStyle: {
        alsoUsesKangoIchi: false,
        alsoUsesKangoNi: false,
        alsoUsesKangoSan: true,
        kana: "さら",
        rangeEndInclusive: 3
      },
      wordOrigin: WordOrigin.Japanese
    }
  ]
};

export const COUNTER_社: Counter = {
  counterId: "社",
  dictionaryEntries: [],
  disambiguations: {},
  englishName: "companies and temples",
  externalLinks: [],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "社"
  },
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
        allowsYonFor4: true
      },
      readingId: "しゃ",
      wagoStyle: null,
      wordOrigin: WordOrigin.Chinese
    }
  ]
};

export const COUNTER_組: Counter = {
  counterId: "組",
  dictionaryEntries: [
    {
      directLink: "https://dictionary.goo.ne.jp/word/%E7%B5%84/",
      japanese:
        "［接尾］助数詞。いくつかが集まってひとそろいになっているものを数える。「コーヒー茶碗一 (ひと) 組み」「二 (ふた) 組みの夫婦」",
      source: JapaneseDictionary.Goo,
      translation:
        '[Suffix] Counter. Used to count groups of individual things that have been brought together and are considered as one. "One coffee cup (likely indicating not just the cup but the saucer beneath it as well)" "Two husband-wife teams."'
    }
  ],
  disambiguations: {},
  englishName: "groups and pairs",
  externalLinks: [],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "組"
  },
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
        allowsYonFor4: true
      },
      readingId: "くみ",
      wagoStyle: null,
      wordOrigin: WordOrigin.Japanese
    }
  ]
};

export const COUNTER_缶: Counter = {
  counterId: "缶",
  dictionaryEntries: [],
  disambiguations: {},
  englishName: "cans",
  externalLinks: [],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "缶"
  },
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
        allowsYonFor4: true
      },
      readingId: "かん",
      wagoStyle: {
        alsoUsesKangoIchi: true,
        alsoUsesKangoNi: true,
        alsoUsesKangoSan: false,
        kana: "かん",
        rangeEndInclusive: 2
      },
      wordOrigin: WordOrigin.Chinese
    }
  ]
};

export const COUNTER_羽: Counter = {
  counterId: "羽",
  dictionaryEntries: [
    {
      directLink:
        "https://dictionary.goo.ne.jp/word/%E7%BE%BD_%28%E3%82%8F%29/",
      japanese:
        "［接尾］助数詞。鳥やウサギを数えるのに用いる。「一羽」「二羽」\n[補説]上に来る数詞の末音によって、「ば（三羽）」または「ぱ（六羽・八羽）」ともなる。",
      source: JapaneseDictionary.Goo,
      translation:
        "[Suffix] Counter. Used to count birds and rabbits.\n[Notes] Depending on the final sound of the preceding word, this can become 「ば」 or 「ぱ」."
    }
  ],
  disambiguations: {},
  englishName: "birds and rabbits",
  externalLinks: [
    {
      additionalDescription: null,
      displayText: "羽: Counting Birds, Bats, and Bun-Buns",
      siteName: "Tofugu",
      url: "https://www.tofugu.com/japanese/japanese-counter-wa/"
    }
  ],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "羽"
  },
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
        allowsYonFor4: true
      },
      readingId: "わ",
      wagoStyle: null,
      wordOrigin: WordOrigin.Japanese
    }
  ]
};

export const COUNTER_色: Counter = {
  counterId: "色",
  dictionaryEntries: [
    {
      directLink:
        "https://dictionary.goo.ne.jp/word/%E3%81%97%E3%82%87%E3%81%8F/#jn-110841",
      japanese:
        "［接尾］\n\n１ 助数詞。色数 (いろかず) を数えるのに用いる。「三色かけ合わせ」「二四色の色鉛筆」「三色刷り」\n",
      source: JapaneseDictionary.Goo,
      translation: "[Suffix]\n1. Counter. Used to count the number of colours."
    }
  ],
  disambiguations: {},
  englishName: "colours",
  externalLinks: [],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "色"
  },
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
        allowsYonFor4: true
      },
      readingId: "しょく",
      wagoStyle: null,
      wordOrigin: WordOrigin.Chinese
    }
  ]
};

export const COUNTER_語: Counter = {
  counterId: "語",
  dictionaryEntries: [],
  disambiguations: {},
  englishName: "words",
  externalLinks: [],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "語"
  },
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
        allowsYonFor4: true
      },
      readingId: "ご",
      wagoStyle: null,
      wordOrigin: WordOrigin.Chinese
    }
  ]
};

export const COUNTER_足: Counter = {
  counterId: "足",
  dictionaryEntries: [],
  disambiguations: {},
  englishName: "pairs of footwear",
  externalLinks: [],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "足"
  },
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
        allowsYonFor4: true
      },
      readingId: "そく",
      wagoStyle: null,
      wordOrigin: WordOrigin.Chinese
    }
  ]
};

export const COUNTER_軒: Counter = {
  counterId: "軒",
  dictionaryEntries: [
    {
      directLink:
        "https://dictionary.goo.ne.jp/word/%E8%BB%92_%28%E3%81%91%E3%82%93%29/",
      japanese:
        "［接尾］\n\n１ 助数詞。家屋の数をかぞえるのに用いる。「三軒」「数千軒」",
      source: JapaneseDictionary.Goo,
      translation:
        '[Suffix]\n1. Counter. Used to count the number of houses (residences). "Three units (eg apartments)" "Thousands of houses"'
    }
  ],
  disambiguations: {},
  englishName: "houses and buildings",
  externalLinks: [],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "軒"
  },
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
        allowsYonFor4: true
      },
      readingId: "けん",
      wagoStyle: null,
      wordOrigin: WordOrigin.Chinese
    }
  ]
};

export const COUNTER_週: Counter = {
  counterId: "週",
  dictionaryEntries: [],
  disambiguations: {},
  englishName: "weeks",
  externalLinks: [],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "週"
  },
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
        allowsYonFor4: true
      },
      readingId: "しゅう",
      wagoStyle: null,
      wordOrigin: WordOrigin.Chinese
    }
  ]
};

export const COUNTER_階: Counter = {
  counterId: "階",
  dictionaryEntries: [
    {
      directLink:
        "https://dictionary.goo.ne.jp/word/%E9%9A%8E_%28%E3%81%8B%E3%81%84%29/",
      japanese:
        "［接尾］助数詞。\n１ 建築物の層を数えるのに用いる。「35階建てのビル」\n\n２ 位階の等級を数えるのに用いる。\n\n「一―こえて、内侍督 (ないしのかみ) 三位の加階し給ふ」〈宇津保・蔵開下〉",
      source: JapaneseDictionary.Goo,
      translation:
        '[Suffix] Counter.\n1. Used to count the number of storeys in a building. "A 35-storey building."\n2. Used to count ranks in a court (imperial).'
    }
  ],
  disambiguations: {},
  englishName: "floors",
  externalLinks: [
    {
      additionalDescription: null,
      displayText: "階: Floors of a Building",
      siteName: "Tofugu",
      url: "https://www.tofugu.com/japanese/japanese-counter-kai-floors/"
    }
  ],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "階"
  },
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
        allowsYonFor4: true
      },
      readingId: "かい",
      wagoStyle: null,
      wordOrigin: WordOrigin.Chinese
    }
  ]
};

export const COUNTER_頭: Counter = {
  counterId: "頭",
  dictionaryEntries: [
    {
      directLink:
        "https://dictionary.goo.ne.jp/word/%E9%A0%AD_%28%E3%81%A8%E3%81%86%29/",
      japanese: "［接尾］牛・馬・犬などの動物を数えるのに用いる。「牛七頭」",
      source: JapaneseDictionary.Goo,
      translation:
        "[Suffix] Used to count animals such as cows, horses, or dogs."
    }
  ],
  disambiguations: {},
  englishName: "large animals",
  externalLinks: [
    {
      additionalDescription: null,
      displayText: "頭: Counting Those Big, Professional Animals",
      siteName: "Tofugu",
      url: "https://www.tofugu.com/japanese/japanese-counter-tou/"
    }
  ],
  irregulars: {},
  kanji: {
    additionalKanji: [],
    primaryKanji: "頭"
  },
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
        allowsYonFor4: true
      },
      readingId: "とう",
      wagoStyle: null,
      wordOrigin: WordOrigin.Chinese
    }
  ]
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
  頭: COUNTER_頭
};
