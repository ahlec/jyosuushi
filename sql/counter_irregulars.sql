PRAGMA foreign_keys = OFF;
BEGIN TRANSACTION;
CREATE TABLE counter_irregulars (
  counter_id STRING NOT NULL REFERENCES counters (counter_id),
  number INTEGER NOT NULL,
  kana STRING NOT NULL,
  irregular_type STRING NOT NULL REFERENCES enum_irregular_type (irregular_type),
  does_presence_erase_regular_conjugations BOOLEAN NOT NULL,
  PRIMARY KEY (counter_id, kana)
);
INSERT INTO
  "counter_irregulars"
VALUES('日', 10, 'とおか', 'arbitrary-reading', 0);
INSERT INTO
  "counter_irregulars"
VALUES('日', 9, 'ここのか', 'arbitrary-reading', 0);
INSERT INTO
  "counter_irregulars"
VALUES('日', 8, 'ようか', 'arbitrary-reading', 0);
INSERT INTO
  "counter_irregulars"
VALUES('日', 7, 'なのか', 'arbitrary-reading', 0);
INSERT INTO
  "counter_irregulars"
VALUES('日', 6, 'むいか', 'arbitrary-reading', 0);
INSERT INTO
  "counter_irregulars"
VALUES('日', 5, 'いつか', 'arbitrary-reading', 0);
INSERT INTO
  "counter_irregulars"
VALUES('日', 4, 'よっか', 'arbitrary-reading', 0);
INSERT INTO
  "counter_irregulars"
VALUES('日', 3, 'みっか', 'arbitrary-reading', 0);
INSERT INTO
  "counter_irregulars"
VALUES('日', 2, 'ふつか', 'arbitrary-reading', 0);
INSERT INTO
  "counter_irregulars"
VALUES('日', 1, 'ついたち', 'arbitrary-reading', 0);
INSERT INTO
  "counter_irregulars"
VALUES('日', 24, 'にじゅうよっか', 'arbitrary-reading', 0);
INSERT INTO
  "counter_irregulars"
VALUES('日', 20, 'はつか', 'arbitrary-reading', 0);
INSERT INTO
  "counter_irregulars"
VALUES('日', 14, 'じゅうよっか', 'arbitrary-reading', 0);
COMMIT;