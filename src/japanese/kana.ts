export interface ConversionChart {
  [romaji: string]: string;
}

export type Gyou =
  | "a"
  | "ka"
  | "ga"
  | "sa"
  | "za"
  | "ta"
  | "da"
  | "na"
  | "ha"
  | "ba"
  | "pa"
  | "ma"
  | "ya"
  | "ra"
  | "wa";

export type Dan = "a" | "i" | "u" | "e" | "o";

type GoJyuuOn<T> = { [gyou in Gyou]: { [dan in Dan]: T | null } };

/* eslint-disable sort-keys */
// JUSTIFICATION: This allows us to match the expected vowel pattern of Japanese and
// keeps our codepoints in ascending order rather than jumping around.
const GOJYUUON_HIRAGANA_CODEPOINTS: GoJyuuOn<number> = {
  a: {
    a: 0x3042,
    i: 0x3044,
    u: 0x3046,
    e: 0x3048,
    o: 0x304a,
  },
  ka: {
    a: 0x304b,
    i: 0x304d,
    u: 0x304f,
    e: 0x3051,
    o: 0x3053,
  },
  ga: {
    a: 0x304c,
    i: 0x304e,
    u: 0x3050,
    e: 0x3052,
    o: 0x3054,
  },
  sa: {
    a: 0x3055,
    i: 0x3057,
    u: 0x3059,
    e: 0x305b,
    o: 0x305d,
  },
  za: {
    a: 0x3056,
    i: 0x3058,
    u: 0x305a,
    e: 0x305c,
    o: 0x305e,
  },
  ta: {
    a: 0x305f,
    i: 0x3061,
    u: 0x3064, // Deviation from previous pattern! Small TSU to blame!
    e: 0x3066,
    o: 0x3068,
  },
  da: {
    a: 0x3060,
    i: 0x3062,
    u: 0x3065,
    e: 0x3067,
    o: 0x3069,
  },
  na: {
    a: 0x306a,
    i: 0x306b,
    u: 0x306c,
    e: 0x306d,
    o: 0x306e,
  },
  ha: {
    a: 0x306f,
    i: 0x3072,
    u: 0x3075,
    e: 0x3078,
    o: 0x307b,
  },
  ba: {
    a: 0x3070,
    i: 0x3073,
    u: 0x3076,
    e: 0x3079,
    o: 0x307c,
  },
  pa: {
    a: 0x3071,
    i: 0x3074,
    u: 0x3077,
    e: 0x307a,
    o: 0x307d,
  },
  ma: {
    a: 0x307e,
    i: 0x307f,
    u: 0x3080,
    e: 0x3081,
    o: 0x3082,
  },
  ya: {
    a: 0x3084,
    i: null,
    u: 0x3086,
    e: null,
    o: 0x3088,
  },
  ra: {
    a: 0x3089,
    i: 0x308a,
    u: 0x308b,
    e: 0x308c,
    o: 0x308d,
  },
  wa: {
    a: 0x308f,
    i: null,
    u: null,
    e: null,
    o: 0x3092,
  },
};
/* eslint-enable sort-keys */

interface GoJyuuOnLookup {
  [codepoint: number]: { dan: Dan; gyou: Gyou };
}
const GOJYUUON_FROM_CODEPOINTS: GoJyuuOnLookup = Object.keys(
  GOJYUUON_HIRAGANA_CODEPOINTS,
).reduce((lookup: GoJyuuOnLookup, gyou: Gyou) => {
  Object.keys(GOJYUUON_HIRAGANA_CODEPOINTS[gyou]).map((dan: Dan) => {
    const codepoint = GOJYUUON_HIRAGANA_CODEPOINTS[gyou][dan];
    if (codepoint) {
      lookup[codepoint] = {
        dan,
        gyou,
      };
    }
  });
  return lookup;
}, {});

const HIRAGANA_CODEPOINT_START = 0x3041;

export class KanaDefinition {
  private deltaFromHiragana: number;

  public constructor(
    public readonly codepointStart: number,
    public readonly codepointEnd: number,
    public readonly conversionChart: ConversionChart,
  ) {
    this.deltaFromHiragana = this.codepointStart - HIRAGANA_CODEPOINT_START;
  }

  public isOnlyKana(str: string): boolean {
    for (let index = 0; index < str.length; ++index) {
      const code = str.charCodeAt(index);
      if (code < this.codepointStart || code > this.codepointEnd) {
        return false;
      }
    }

    return true;
  }

  public changeGyou(kana: string, gyou: Gyou): string {
    if (!kana || kana.length !== 1) {
      throw new Error("Provided kana must be exactly one character");
    }

    const info = GOJYUUON_FROM_CODEPOINTS[kana.codePointAt(0) || 0];
    if (!info) {
      throw new Error(`Could not find '${kana}' in gojyuuon`);
    }

    const newCodepoint =
      (GOJYUUON_HIRAGANA_CODEPOINTS[gyou][info.dan] || 0) +
      this.deltaFromHiragana;
    return String.fromCodePoint(newCodepoint);
  }
}

/* eslint-disable sort-keys */
// JUSTIFICATION: Allows us to match the pattern of Japanese vowels better.
export const HIRAGANA = new KanaDefinition(HIRAGANA_CODEPOINT_START, 0x309f, {
  a: "あ",
  i: "い",
  u: "う",
  e: "え",
  o: "お",
  la: "ぁ",
  li: "ぃ",
  lu: "ぅ",
  le: "ぇ",
  lo: "ぉ",
  ka: "か",
  ki: "き",
  ku: "く",
  ke: "け",
  ko: "こ",
  kya: "きゃ",
  kyi: "きぃ",
  kyu: "きゅ",
  kyo: "きょ",
  kye: "きぇ",
  sa: "さ",
  si: "し",
  shi: "し",
  su: "す",
  se: "せ",
  so: "そ",
  sha: "しゃ",
  sya: "しゃ",
  syi: "しぃ",
  shu: "しゅ",
  syu: "しゅ",
  sho: "しょ",
  syo: "しょ",
  she: "しぇ",
  sye: "しぇ",
  ta: "た",
  ti: "ち",
  chi: "ち",
  tu: "つ",
  tsu: "つ",
  te: "て",
  to: "と",
  cha: "ちゃ",
  tya: "ちゃ",
  tyi: "ちぃ",
  tsi: "つぃ",
  chu: "ちゅ",
  tyu: "ちゅ",
  cho: "ちょ",
  tyo: "ちょ",
  che: "ちぇ",
  tye: "ちぇ",
  na: "な",
  ni: "に",
  nu: "ぬ",
  ne: "ね",
  no: "の",
  nya: "にゃ",
  nyi: "にぃ",
  nyu: "にゅ",
  nye: "にぇ",
  nyo: "にょ",
  ha: "は",
  hi: "ひ",
  hu: "ふ",
  he: "へ",
  ho: "ほ",
  hya: "ひゃ",
  hyi: "ひぃ",
  hyu: "ひゅ",
  hye: "ひぇ",
  hyo: "ひょ",
  fa: "ふぁ",
  fi: "ふぃ",
  fu: "ふ",
  fe: "ふぇ",
  fo: "ふぉ",
  fya: "ふゃ",
  fyi: "ふぃ",
  fyu: "ふゅ",
  fye: "ふぇ",
  fyo: "ふょ",
  ma: "ま",
  mi: "み",
  mu: "む",
  me: "め",
  mo: "も",
  mya: "みゃ",
  myi: "みぃ",
  myu: "みゅ",
  mye: "みぇ",
  myo: "みょ",
  ya: "や",
  yi: "い",
  yu: "ゆ",
  ye: "いぇ",
  yo: "よ",
  ra: "ら",
  ri: "り",
  ru: "る",
  re: "れ",
  ro: "ろ",
  rya: "りゃ",
  ryi: "りぃ",
  ryu: "りゅ",
  rye: "りぇ",
  ryo: "りょ",
  lya: "りゃ",
  lyi: "りぃ",
  lyu: "りゅ",
  lye: "りぇ",
  lyo: "りょ",
  wa: "わ",
  wi: "うぃ",
  wu: "う",
  we: "うぇ",
  wo: "を",
  wya: "うゃ",
  wyi: "ゐ",
  wyu: "うゅ",
  wye: "ゑ",
  wyo: "うょ",
  da: "だ",
  di: "ぢ",
  du: "づ",
  de: "で",
  do: "ど",
  dya: "ぢゃ",
  dyi: "ぢぃ",
  dyu: "ぢゅ",
  dye: "ぢぇ",
  dyo: "ぢょ",
  pa: "ぱ",
  pi: "ぴ",
  pu: "ぷ",
  pe: "ぺ",
  po: "ぽ",
  pya: "ぴゃ",
  pyi: "ぴぃ",
  pyu: "ぴゅ",
  pye: "ぴぇ",
  pyo: "ぴょ",
  ga: "が",
  gi: "ぎ",
  gu: "ぐ",
  ge: "げ",
  go: "ご",
  gya: "ぎゃ",
  gyi: "ぎぃ",
  gyu: "ぎゅ",
  gye: "ぎぇ",
  gyo: "ぎょ",
  ja: "じゃ",
  ji: "じ",
  ju: "じゅ",
  je: "じぇ",
  jo: "じょ",
  jya: "じゃ",
  jyi: "じぃ",
  jyu: "じゅ",
  jye: "じぇ",
  jyo: "じょ",
  za: "ざ",
  zi: "じ",
  zu: "ず",
  ze: "ぜ",
  zo: "ぞ",
  zya: "じゃ",
  zyi: "じぃ",
  zyu: "じゅ",
  zye: "じぇ",
  zyo: "じょ",
  va: "ヴぁ",
  vi: "ヴぃ",
  vu: "ヴ",
  ve: "ヴぇ",
  vo: "ヴぉ",
  vya: "ヴゃ",
  vyu: "ヴゅ",
  vye: "ヴぃぇ",
  vyo: "ヴょ",
  ba: "ば",
  bi: "び",
  bu: "ぶ",
  be: "べ",
  bo: "ぼ",
  bya: "びゃ",
  byi: "びぃ",
  byu: "びゅ",
  bye: "びぇ",
  byo: "びょ",
  xa: "ぁ",
  xi: "ぃ",
  xu: "ぅ",
  xe: "ぇ",
  xo: "ぉ",
  xya: "ゃ",
  xyi: "ぃ",
  xyu: "ゅ",
  xye: "ぇ",
  xyo: "ょ",
  rr: "っr",
  tt: "っt",
  yy: "っy",
  pp: "っp",
  ss: "っs",
  dd: "っd",
  ff: "っf",
  gg: "っg",
  hh: "っh",
  jj: "っj",
  kk: "っk",
  ll: "っl",
  zz: "っz",
  xx: "っx",
  cc: "っc",
  vv: "っv",
  bb: "っb",
  ww: "っw",
  nn: "ん",
  mm: "っm",
  nq: "んq",
  nw: "んw",
  nr: "んr",
  nt: "んt",
  np: "んp",
  ns: "んs",
  nd: "んd",
  nf: "んf",
  ng: "んg",
  nh: "んh",
  nj: "んj",
  nk: "んk",
  nl: "んl",
  nz: "んz",
  nx: "んx",
  nc: "んc",
  nv: "んv",
  nb: "んb",
  nm: "んm",
  "1": "１",
  "2": "２",
  "3": "３",
  "4": "４",
  "5": "５",
  "6": "６",
  "7": "７",
  "8": "８",
  "9": "９",
  "0": "０",
  " ": "　",
  "-": "ー",
  _: "＿",
  ".": "。",
  ",": "、",
  ":": "：",
  ";": "；",
  "'": "’",
  "*": "＊",
  "<": "＜",
  ">": "＞",
  "|": "｜",
  "+": "＋",
  "!": "！",
  '"': "”",
  "#": "＃",
  "%": "％",
  "&": "＆",
  "(": "（",
  ")": "）",
  "=": "＝",
  "?": "？",
  "@": "＠",
  $: "＄",
  "¥": "￥",
  "{": "｛",
  "}": "｝",
  "[": "「",
  "]": "」",
  "/": "／",
  "\\": "＼",
  n1: "ん１",
  n2: "ん２",
  n3: "ん３",
  n4: "ん４",
  n5: "ん５",
  n6: "ん６",
  n7: "ん７",
  n8: "ん８",
  n9: "ん９",
  n0: "ん０",
  "n ": "ん　",
  "n-": "んー",
  n_: "ん＿",
  "n.": "ん。",
  "n,": "ん、",
  "n:": "ん：",
  "n;": "ん；",
  "n'": "ん’",
  "n*": "ん＊",
  "n<": "ん＜",
  "n>": "ん＞",
  "n|": "ん｜",
  "n£": "ん£",
  "n€": "ん€",
  "n¡": "ん¡",
  "n+": "ん＋",
  "n!": "ん！",
  'n"': "ん”",
  "n#": "ん＃",
  "n%": "ん％",
  "n&": "ん＆",
  "n(": "ん（",
  "n)": "ん）",
  "n=": "ん＝",
  "n?": "ん？",
  "n@": "ん＠",
  n$: "ん＄",
  "n¥": "ん￥",
  "n{": "ん｛",
  "n}": "ん｝",
  "n[": "ん「",
  "n]": "ん」",
  "n/": "ん／",
  "n\\": "ん＼",
  nå: "んå",
  nä: "んä",
  nö: "んö",
  nø: "んø",
  næ: "んæ",
});
/* eslint-enable sort-keys */

const CODEPOINT_KATAKANA_FIRST = 0x30a1;
const CODEPOINT_KATAKANA_LAST = 0x30ff;
const DELTA_HIRAGANA_TO_KATAKANA =
  CODEPOINT_KATAKANA_FIRST - HIRAGANA.codepointStart;

const katakanaConversionChart: ConversionChart = Object.keys(
  HIRAGANA.conversionChart,
).reduce((katakana: ConversionChart, romaji: string) => {
  const characters: string[] = [];
  const hiragana = HIRAGANA.conversionChart[romaji];
  for (let index = 0; index < hiragana.length; ++index) {
    const code = hiragana.charCodeAt(index);
    if (code >= HIRAGANA.codepointStart && code <= HIRAGANA.codepointEnd) {
      characters.push(String.fromCharCode(code + DELTA_HIRAGANA_TO_KATAKANA));
    } else {
      characters.push(hiragana[index]);
    }
  }

  katakana[romaji] = characters.join();
  return katakana;
}, {});

export const Katakana = new KanaDefinition(
  CODEPOINT_KATAKANA_FIRST,
  CODEPOINT_KATAKANA_LAST,
  katakanaConversionChart,
);

export function getAsHiragana(kana: string): string {
  const characters: string[] = [];
  for (let index = 0; index < kana.length; ++index) {
    const codepoint = kana.codePointAt(index) || 0;
    if (
      codepoint >= HIRAGANA.codepointStart &&
      codepoint <= HIRAGANA.codepointEnd
    ) {
      characters.push(kana[index]);
    } else if (
      codepoint >= Katakana.codepointStart &&
      codepoint <= Katakana.codepointEnd
    ) {
      characters.push(
        String.fromCharCode(codepoint - DELTA_HIRAGANA_TO_KATAKANA),
      );
    } else {
      throw new Error(`'${kana[index]}' is not kana!`);
    }
  }

  return characters.join("");
}
