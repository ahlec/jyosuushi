// DO NOT HAND-MODIFY THIS FILE!!
// This file was built using `yarn db:export` from the SQLite database.
// Modifications will be lost if they are made manually and not through the database.

interface StandardCounterCollection {
  id: string;
  name: string;
  counterIds: readonly string[];
  dateLastUpdated: number;
}

const STUDY_PACK_COMMON: StandardCounterCollection = {
  counterIds: [
    "ヶ国",
    "ヶ所",
    "件",
    "円",
    "切れ",
    "口",
    "名",
    "周",
    "巻",
    "席",
    "戦",
    "曲",
    "束",
    "校",
    "皿",
    "社",
    "組",
    "缶",
    "色",
    "語",
    "足",
    "軒",
    "週",
  ],
  dateLastUpdated: 1608918939000,
  id: "common",
  name: "Common",
};

const STUDY_PACK_ESSENTIAL: StandardCounterCollection = {
  counterIds: [
    "ヶ月",
    "人",
    "冊",
    "分",
    "匹",
    "台",
    "回",
    "年",
    "日",
    "時",
    "本",
    "枚",
    "歳",
    "羽",
    "階",
    "頭",
  ],
  dateLastUpdated: 1608918939000,
  id: "essential",
  name: "Essential",
};

const STUDY_PACK_N4: StandardCounterCollection = {
  counterIds: ["冊", "羽", "頭"],
  dateLastUpdated: 1608918939000,
  id: "n4",
  name: "JLPT N4",
};

const STUDY_PACK_N5: StandardCounterCollection = {
  counterIds: ["人", "分", "匹", "台", "年", "日", "時", "本", "枚"],
  dateLastUpdated: 1608918939000,
  id: "n5",
  name: "JLPT N5",
};

export const STANDARD_COLLECTIONS: readonly StandardCounterCollection[] = [
  STUDY_PACK_COMMON,
  STUDY_PACK_ESSENTIAL,
  STUDY_PACK_N4,
  STUDY_PACK_N5,
];
