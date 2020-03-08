PRAGMA foreign_keys = OFF;
BEGIN TRANSACTION;
CREATE TABLE counter_readings (
  counter_id STRING REFERENCES counters (counter_id),
  reading_id STRING,
  word_origin STRING REFERENCES enum_word_origin (word_origin),
  kana STRING,
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
VALUES('束', 'たば', '和語', 'たば', NULL, 1, 0, 0, 1, 0, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('足', 'そく', '漢語', 'そく', NULL, 1, 0, 0, 1, 0, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('戦', 'せん', '漢語', 'せん', NULL, 1, 0, 0, 1, 0, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('席', 'せき', '漢語', 'せき', NULL, 1, 0, 0, 1, 0, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('色', 'しょく', '漢語', 'しょく', NULL, 1, 0, 0, 1, 0, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('周', 'しゅう', '漢語', 'しゅう', NULL, 1, 0, 0, 1, 0, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('週', 'しゅう', '漢語', 'しゅう', NULL, 1, 0, 0, 1, 0, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('社', 'しゃ', '漢語', 'しゃ', NULL, 1, 0, 0, 1, 0, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('品', 'ひん', '漢語', 'ひん', NULL, 1, 0, 0, 1, 0, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('品', 'しな', '和語', 'しな', NULL, 1, 0, 0, 1, 0, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('試合', 'しあい', '漢語', 'しあい', NULL, 1, 0, 0, 1, 0, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('ゲーム', 'ゲーム', '外来語', 'ゲーム', NULL, 1, 0, 0, 1, 0, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('校', 'こう', '漢語', 'こう', NULL, 1, 0, 0, 1, 0, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('皿', 'さら', '和語', 'さら', NULL, 1, 0, 0, 1, 0, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('語', 'ご', '漢語', 'ご', NULL, 1, 0, 0, 1, 0, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('切れ', 'きれ', '和語', 'きれ', NULL, 1, 0, 0, 1, 0, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('口', 'くち', '和語', 'くち', NULL, 1, 0, 0, 1, 0, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('組', 'くみ', '和語', 'くみ', NULL, 1, 0, 0, 1, 0, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('件', 'けん', '漢語', 'けん', NULL, 1, 0, 0, 1, 0, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('軒', 'けん', '漢語', 'けん', NULL, 1, 0, 0, 1, 0, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('ヶ所', 'かしょ', '漢語', 'かしょ', NULL, 1, 0, 0, 1, 0, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('曲', 'きょく', '漢語', 'きょく', NULL, 1, 0, 0, 1, 0, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('缶', 'かん', '漢語', 'かん', NULL, 1, 0, 0, 1, 0, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('巻', 'かん', '漢語', 'かん', NULL, 1, 0, 0, 1, 0, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('円', 'えん', '漢語', 'えん', NULL, 1, 0, 0, 1, 0, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('ヶ国', 'かこく', '漢語', 'かこく', NULL, 1, 0, 0, 1, 0, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('ヶ月', 'かげつ', '漢語', 'かげつ', NULL, 1, 0, 0, 1, 0, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('歳', 'さい', '漢語', 'さい', NULL, 1, 0, 0, 1, 0, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('階', 'かい', '漢語', 'かい', NULL, 1, 0, 0, 1, 1, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('回', 'かい', '漢語', 'かい', NULL, 1, 0, 0, 1, 1, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('年', 'ねん', '漢語', 'ねん', NULL, 0, 1, 0, 1, 1, 1, 1);
INSERT INTO
  "counter_readings"
VALUES('台', 'だい', '漢語', 'だい', NULL, 1, 0, 0, 1, 1, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('冊', 'さつ', '漢語', 'さつ', NULL, 1, 0, 0, 1, 1, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('羽', 'わ', '和語', 'わ', NULL, 1, 0, 0, 1, 1, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('頭', 'とう', '漢語', 'とう', NULL, 1, 0, 0, 1, 1, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('匹', 'ひき', '和語', 'ひき', NULL, 1, 0, 0, 1, 1, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('枚', 'まい', '漢語', 'まい', NULL, 1, 0, 0, 1, 1, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('時', 'じ', '漢語', 'じ', NULL, 0, 1, 0, 1, 1, 0, 1);
INSERT INTO
  "counter_readings"
VALUES('人', 'にん', '和語', 'にん', NULL, 0, 1, 0, 1, 1, 1, 1);
INSERT INTO
  "counter_readings"
VALUES('名', 'めい', '漢語', 'めい', NULL, 1, 0, 0, 1, 0, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('分', 'ふん', '漢語', 'ふん', NULL, 1, 0, 0, 1, 1, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('本', 'ほん', '漢語', 'ほん', NULL, 1, 0, 0, 1, 1, 1, 0);
INSERT INTO
  "counter_readings"
VALUES('日', 'にち', '漢語', 'にち', NULL, 1, 0, 0, 1, 0, 1, 0);
COMMIT;