PRAGMA foreign_keys = OFF;
BEGIN TRANSACTION;
CREATE TABLE study_pack_contents (
  pack_id STRING REFERENCES study_packs (pack_id) NOT NULL,
  counter_id STRING REFERENCES counters (counter_id) NOT NULL,
  date_added DATETIME DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
  PRIMARY KEY (pack_id, counter_id)
);
INSERT INTO
  "study_pack_contents" (pack_id, counter_id, date_added)
VALUES('n4', '頭', '2020-12-25 17:55:39');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id, date_added)
VALUES('n4', '羽', '2020-12-25 17:55:39');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id, date_added)
VALUES('n4', '冊', '2020-12-25 17:55:39');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id, date_added)
VALUES('n5', '台', '2020-12-25 17:55:39');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id, date_added)
VALUES('n5', '匹', '2020-12-25 17:55:39');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id, date_added)
VALUES('n5', '枚', '2020-12-25 17:55:39');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id, date_added)
VALUES('n5', '年', '2020-12-25 17:55:39');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id, date_added)
VALUES('essential', '年', '2020-12-25 17:55:39');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id, date_added)
VALUES('essential', '台', '2020-12-25 17:55:39');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id, date_added)
VALUES('essential', '冊', '2020-12-25 17:55:39');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id, date_added)
VALUES('essential', '羽', '2020-12-25 17:55:39');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id, date_added)
VALUES('essential', '頭', '2020-12-25 17:55:39');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id, date_added)
VALUES('essential', '匹', '2020-12-25 17:55:39');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id, date_added)
VALUES('essential', '枚', '2020-12-25 17:55:39');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id, date_added)
VALUES('essential', 'ヶ月', '2020-12-25 17:55:39');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id, date_added)
VALUES('essential', '階', '2020-12-25 17:55:39');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id, date_added)
VALUES('essential', '歳', '2020-12-25 17:55:39');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id, date_added)
VALUES('essential', '回', '2020-12-25 17:55:39');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id, date_added)
VALUES('common', 'ヶ所', '2020-12-25 17:55:39');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id, date_added)
VALUES('common', '曲', '2020-12-25 17:55:39');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id, date_added)
VALUES('common', '缶', '2020-12-25 17:55:39');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id, date_added)
VALUES('common', '巻', '2020-12-25 17:55:39');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id, date_added)
VALUES('common', '円', '2020-12-25 17:55:39');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id, date_added)
VALUES('common', 'ヶ国', '2020-12-25 17:55:39');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id, date_added)
VALUES('common', '組', '2020-12-25 17:55:39');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id, date_added)
VALUES('common', '口', '2020-12-25 17:55:39');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id, date_added)
VALUES('common', '切れ', '2020-12-25 17:55:39');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id, date_added)
VALUES('essential', '人', '2020-12-25 17:55:39');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id, date_added)
VALUES('n5', '人', '2020-12-25 17:55:39');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id, date_added)
VALUES('essential', '分', '2020-12-25 17:55:39');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id, date_added)
VALUES('n5', '分', '2020-12-25 17:55:39');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id, date_added)
VALUES('essential', '本', '2020-12-25 17:55:39');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id, date_added)
VALUES('n5', '本', '2020-12-25 17:55:39');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id, date_added)
VALUES('essential', '時', '2020-12-25 17:55:39');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id, date_added)
VALUES('n5', '時', '2020-12-25 17:55:39');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id, date_added)
VALUES('essential', '日', '2020-12-25 17:55:39');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id, date_added)
VALUES('n5', '日', '2020-12-25 17:55:39');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id, date_added)
VALUES('common', '皿', '2020-12-25 17:55:39');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id, date_added)
VALUES('common', '語', '2020-12-25 17:55:39');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id, date_added)
VALUES('common', '校', '2020-12-25 17:55:39');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id, date_added)
VALUES('common', '件', '2020-12-25 17:55:39');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id, date_added)
VALUES('common', '軒', '2020-12-25 17:55:39');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id, date_added)
VALUES('common', '席', '2020-12-25 17:55:39');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id, date_added)
VALUES('common', '色', '2020-12-25 17:55:39');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id, date_added)
VALUES('common', '周', '2020-12-25 17:55:39');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id, date_added)
VALUES('common', '週', '2020-12-25 17:55:39');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id, date_added)
VALUES('common', '社', '2020-12-25 17:55:39');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id, date_added)
VALUES('common', '足', '2020-12-25 17:55:39');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id, date_added)
VALUES('common', '束', '2020-12-25 17:55:39');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id, date_added)
VALUES('common', '戦', '2020-12-25 17:55:39');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id, date_added)
VALUES('common', '名', '2020-12-25 17:55:39');
COMMIT;