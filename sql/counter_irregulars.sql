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
COMMIT;