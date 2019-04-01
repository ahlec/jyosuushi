import { Counter } from "../redux";

export const COUNTER_DAYS_OF_MONTH: Counter = {
  counterId: "counter-days-of-month",
  name: "days of the month",
  kana: "にち",
  kanji: "日",
  irregulars: {
    1: "ついたち",
    2: "ふつか",
    3: "みっか",
    4: "よっか",
    5: "いつか",
    6: "むいか",
    7: "なのか",
    8: "ようか",
    9: "ここのか",
    10: "とうか",
    14: "じゅうよっか",
    20: "はつか",
    24: "にじゅうよっか"
  }
};

export const COUNTER_HOURS: Counter = {
  counterId: "counter-hours",
  name: "hours",
  kana: "じ",
  kanji: "時",
  irregulars: {
    4: "よじ",
    7: "しちじ",
    9: "くじ"
  }
};

export const COUNTER_LONG_THIN: Counter = {
  counterId: "counter-long-thin",
  name: "long, thin objects",
  kana: "ほん",
  kanji: "本",
  irregulars: {}
};

export const COUNTER_MINUTES: Counter = {
  counterId: "counter-minutes",
  name: "minutes",
  kana: "ふん",
  kanji: "分",
  irregulars: {}
};

export const COUNTER_PEOPLE_MEI: Counter = {
  counterId: "counter-people-mei",
  name: "people (formal)",
  kana: "めい",
  kanji: "名",
  irregulars: {}
};

export const COUNTER_PEOPLE_NIN: Counter = {
  counterId: "counter-people-nin",
  name: "people",
  kana: "にん",
  kanji: "人",
  irregulars: {
    1: "ひとり",
    2: "ふたり"
  }
};
