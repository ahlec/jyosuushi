PRAGMA foreign_keys = OFF;
BEGIN TRANSACTION;
CREATE TABLE counter_irregulars (
  counter_id STRING NOT NULL REFERENCES counters (counter_id),
  number INTEGER NOT NULL,
  kana STRING NOT NULL,
  nonstandard BOOLEAN DEFAULT (0) NOT NULL,
  PRIMARY KEY (counter_id, kana)
);
INSERT INTO
  "counter_irregulars"
VALUES('缶', 2, 'ふたかん', 0);
INSERT INTO
  "counter_irregulars"
VALUES('缶', 2, 'にかん', 0);
INSERT INTO
  "counter_irregulars"
VALUES('缶', 1, 'ひとかん', 0);
INSERT INTO
  "counter_irregulars"
VALUES('缶', 1, 'いっかん', 0);
INSERT INTO
  "counter_irregulars"
VALUES('皿', 3, 'さんさら', 0);
INSERT INTO
  "counter_irregulars"
VALUES('皿', 3, 'みさら', 0);
INSERT INTO
  "counter_irregulars"
VALUES('皿', 2, 'ふたさら', 0);
INSERT INTO
  "counter_irregulars"
VALUES('皿', 1, 'ひとさら', 0);
INSERT INTO
  "counter_irregulars"
VALUES('品（しな）', 2, 'ふたしな', 0);
INSERT INTO
  "counter_irregulars"
VALUES('品（しな）', 1, 'ひとしな', 0);
INSERT INTO
  "counter_irregulars"
VALUES('席', 2, 'ふたせき', 1);
INSERT INTO
  "counter_irregulars"
VALUES('席', 1, 'ひとせき', 1);
INSERT INTO
  "counter_irregulars"
VALUES('日', 10, 'とおか', 0);
INSERT INTO
  "counter_irregulars"
VALUES('日', 9, 'ここのか', 0);
INSERT INTO
  "counter_irregulars"
VALUES('日', 8, 'ようか', 0);
INSERT INTO
  "counter_irregulars"
VALUES('日', 7, 'なのか', 0);
INSERT INTO
  "counter_irregulars"
VALUES('日', 6, 'むいか', 0);
INSERT INTO
  "counter_irregulars"
VALUES('日', 5, 'いつか', 0);
INSERT INTO
  "counter_irregulars"
VALUES('日', 4, 'よっか', 0);
INSERT INTO
  "counter_irregulars"
VALUES('日', 3, 'みっか', 0);
INSERT INTO
  "counter_irregulars"
VALUES('日', 2, 'ふつか', 0);
INSERT INTO
  "counter_irregulars"
VALUES('日', 1, 'ついたち', 0);
INSERT INTO
  "counter_irregulars"
VALUES('日', 24, 'にじゅうよっか', 0);
INSERT INTO
  "counter_irregulars"
VALUES('日', 20, 'はつか', 0);
INSERT INTO
  "counter_irregulars"
VALUES('日', 14, 'じゅうよっか', 0);
INSERT INTO
  "counter_irregulars"
VALUES('人', 2, 'ふたり', 0);
INSERT INTO
  "counter_irregulars"
VALUES('人', 1, 'ひとり', 0);
INSERT INTO
  "counter_irregulars"
VALUES('束', 2, 'ふたたば', 0);
INSERT INTO
  "counter_irregulars"
VALUES('束', 1, 'ひとたば', 0);
INSERT INTO
  "counter_irregulars"
VALUES('束', 3, 'さんたば', 0);
INSERT INTO
  "counter_irregulars"
VALUES('束', 3, 'みたば', 0);
COMMIT;