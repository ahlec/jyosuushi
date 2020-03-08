PRAGMA foreign_keys = OFF;
BEGIN TRANSACTION;
CREATE TABLE counter_readings (
  counter_id STRING REFERENCES counters (counter_id),
  reading_id STRING,
  word_origin STRING REFERENCES enum_word_origin (word_origin),
  kana STRING,
  kanji STRING,
  wago_range_end_inclusive INTEGER REFERENCES enum_wago_range (range_end_inclusive),
  kango_uses_yon BOOLEAN NOT NULL DEFAULT (1),
  kango_uses_yo BOOLEAN DEFAULT (0) NOT NULL,
  kango_uses_shi BOOLEAN NOT NULL DEFAULT (0),
  kango_uses_nana BOOLEAN NOT NULL DEFAULT (1),
  kango_uses_shichi BOOLEAN NOT NULL DEFAULT (0),
  kango_uses_kyuu BOOLEAN NOT NULL DEFAULT (1),
  kango_uses_ku BOOLEAN NOT NULL DEFAULT (0),
  PRIMARY KEY (counter_id, reading_id)
);
INSERT INTO
  "counter_readings"
VALUES('束', 'たば', '和語', 'たば', '束', NULL, 1, 0, 0, 1, 0, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('足', 'そく', '漢語', 'そく', '足', NULL, 1, 0, 0, 1, 0, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('戦', 'せん', '漢語', 'せん', '戦', NULL, 1, 0, 0, 1, 0, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('席', 'せき', '漢語', 'せき', '席', NULL, 1, 0, 0, 1, 0, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('色', 'しょく', '漢語', 'しょく', '色', NULL, 1, 0, 0, 1, 0, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('周', 'しゅう', '漢語', 'しゅう', '周', NULL, 1, 0, 0, 1, 0, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('週', 'しゅう', '漢語', 'しゅう', '週', NULL, 1, 0, 0, 1, 0, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('社', 'しゃ', '漢語', 'しゃ', '社', NULL, 1, 0, 0, 1, 0, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('品', 'ひん', '漢語', 'ひん', '品', NULL, 1, 0, 0, 1, 0, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('品', 'しな', '和語', 'しな', '品', NULL, 1, 0, 0, 1, 0, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('試合', 'しあい', '漢語', 'しあい', '試合', NULL, 1, 0, 0, 1, 0, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('ゲーム', 'ゲーム', '外来語', 'ゲーム', NULL, NULL, 1, 0, 0, 1, 0, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('校', 'こう', '漢語', 'こう', '校', NULL, 1, 0, 0, 1, 0, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('皿', 'さら', '和語', 'さら', '皿', NULL, 1, 0, 0, 1, 0, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('語', 'ご', '漢語', 'ご', '語', NULL, 1, 0, 0, 1, 0, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('切れ', 'きれ', '和語', 'きれ', '切れ', NULL, 1, 0, 0, 1, 0, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('口', 'くち', '和語', 'くち', '口', NULL, 1, 0, 0, 1, 0, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('組', 'くみ', '和語', 'くみ', '組', NULL, 1, 0, 0, 1, 0, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('件', 'けん', '漢語', 'けん', '件', NULL, 1, 0, 0, 1, 0, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('軒', 'けん', '漢語', 'けん', '軒', NULL, 1, 0, 0, 1, 0, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('ヶ所', 'かしょ', '漢語', 'かしょ', 'ヶ所', NULL, 1, 0, 0, 1, 0, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('曲', 'きょく', '漢語', 'きょく', '曲', NULL, 1, 0, 0, 1, 0, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('缶', 'かん', '漢語', 'かん', '缶', NULL, 1, 0, 0, 1, 0, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('巻', 'かん', '漢語', 'かん', '巻', NULL, 1, 0, 0, 1, 0, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('円', 'えん', '漢語', 'えん', '円', NULL, 1, 0, 0, 1, 0, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('ヶ国', 'かこく', '漢語', 'かこく', 'ヶ国', NULL, 1, 0, 0, 1, 0, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('ヶ月', 'かげつ', '漢語', 'かげつ', 'ヶ月', NULL, 1, 0, 0, 1, 0, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('歳', 'さい', '漢語', 'さい', '歳', NULL, 1, 0, 0, 1, 0, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('階', 'かい', '漢語', 'かい', '階', NULL, 1, 0, 0, 1, 1, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('回', 'かい', '漢語', 'かい', '回', NULL, 1, 0, 0, 1, 1, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('年', 'ねん', '漢語', 'ねん', '年', NULL, 0, 1, 0, 1, 1, 1, 1);
INSERT INTO
  "counter_readings"
VALUES('台', 'だい', '漢語', 'だい', '台', NULL, 1, 0, 0, 1, 1, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('冊', 'さつ', '漢語', 'さつ', '冊', NULL, 1, 0, 0, 1, 1, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('羽', 'わ', '和語', 'わ', '羽', NULL, 1, 0, 0, 1, 1, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('頭', 'とう', '漢語', 'とう', '頭', NULL, 1, 0, 0, 1, 1, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('匹', 'ひき', '和語', 'ひき', '匹', NULL, 1, 0, 0, 1, 1, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('枚', 'まい', '漢語', 'まい', '枚', NULL, 1, 0, 0, 1, 1, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('時', 'じ', '漢語', 'じ', '時', NULL, 0, 1, 0, 1, 1, 0, 1);
INSERT INTO
  "counter_readings"
VALUES('人', 'にん', '和語', 'にん', '人', NULL, 0, 1, 0, 1, 1, 1, 1);
INSERT INTO
  "counter_readings"
VALUES('名', 'めい', '漢語', 'めい', '名', NULL, 1, 0, 0, 1, 0, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('分', 'ふん', '漢語', 'ふん', '分', NULL, 1, 0, 0, 1, 1, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('本', 'ほん', '漢語', 'ほん', '本', NULL, 1, 0, 0, 1, 1, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('日', 'にち', '漢語', 'にち', '日', NULL, 1, 0, 0, 1, 0, 1, 0);
COMMIT;