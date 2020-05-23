PRAGMA foreign_keys = OFF;
BEGIN TRANSACTION;
CREATE TABLE study_pack_contents (
  pack_id STRING REFERENCES study_packs (pack_id) NOT NULL,
  counter_id STRING REFERENCES counters (counter_id) NOT NULL,
  PRIMARY KEY(pack_id, counter_id)
);
INSERT INTO
  "study_pack_contents" (pack_id, counter_id)
VALUES('n4', '頭');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id)
VALUES('n4', '羽');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id)
VALUES('n4', '冊');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id)
VALUES('n5', '台');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id)
VALUES('n5', '匹');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id)
VALUES('n5', '枚');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id)
VALUES('n5', '年');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id)
VALUES('essential', '年');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id)
VALUES('essential', '台');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id)
VALUES('essential', '冊');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id)
VALUES('essential', '羽');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id)
VALUES('essential', '頭');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id)
VALUES('essential', '匹');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id)
VALUES('essential', '枚');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id)
VALUES('essential', 'ヶ月');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id)
VALUES('essential', '階');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id)
VALUES('essential', '歳');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id)
VALUES('essential', '回');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id)
VALUES('common', 'ヶ所');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id)
VALUES('common', '曲');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id)
VALUES('common', '缶');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id)
VALUES('common', '巻');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id)
VALUES('common', '円');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id)
VALUES('common', 'ヶ国');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id)
VALUES('common', '組');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id)
VALUES('common', '口');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id)
VALUES('common', '切れ');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id)
VALUES('essential', '人');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id)
VALUES('n5', '人');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id)
VALUES('essential', '分');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id)
VALUES('n5', '分');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id)
VALUES('essential', '本');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id)
VALUES('n5', '本');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id)
VALUES('essential', '時');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id)
VALUES('n5', '時');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id)
VALUES('essential', '日');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id)
VALUES('n5', '日');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id)
VALUES('common', '皿');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id)
VALUES('common', '語');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id)
VALUES('common', '校');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id)
VALUES('common', '件');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id)
VALUES('common', '軒');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id)
VALUES('common', '席');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id)
VALUES('common', '色');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id)
VALUES('common', '周');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id)
VALUES('common', '週');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id)
VALUES('common', '社');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id)
VALUES('common', '足');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id)
VALUES('common', '束');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id)
VALUES('common', '戦');
INSERT INTO
  "study_pack_contents" (pack_id, counter_id)
VALUES('common', '名');
COMMIT;