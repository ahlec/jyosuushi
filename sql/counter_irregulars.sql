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
  "counter_irregulars" (
    counter_id,
    number,
    kana,
    irregular_type,
    does_presence_erase_regular_conjugations
  )
VALUES('日', 10, 'とおか', 'arbitrary-reading', 0);
INSERT INTO
  "counter_irregulars" (
    counter_id,
    number,
    kana,
    irregular_type,
    does_presence_erase_regular_conjugations
  )
VALUES(
    '日',
    9,
    'ここのか',
    'standard-wago-range-sound-change',
    1
  );
INSERT INTO
  "counter_irregulars" (
    counter_id,
    number,
    kana,
    irregular_type,
    does_presence_erase_regular_conjugations
  )
VALUES(
    '日',
    8,
    'ようか',
    'standard-wago-range-sound-change',
    1
  );
INSERT INTO
  "counter_irregulars" (
    counter_id,
    number,
    kana,
    irregular_type,
    does_presence_erase_regular_conjugations
  )
VALUES(
    '日',
    7,
    'なのか',
    'standard-wago-range-sound-change',
    1
  );
INSERT INTO
  "counter_irregulars" (
    counter_id,
    number,
    kana,
    irregular_type,
    does_presence_erase_regular_conjugations
  )
VALUES(
    '日',
    6,
    'むいか',
    'standard-wago-range-sound-change',
    1
  );
INSERT INTO
  "counter_irregulars" (
    counter_id,
    number,
    kana,
    irregular_type,
    does_presence_erase_regular_conjugations
  )
VALUES(
    '日',
    5,
    'いつか',
    'standard-wago-range-sound-change',
    1
  );
INSERT INTO
  "counter_irregulars" (
    counter_id,
    number,
    kana,
    irregular_type,
    does_presence_erase_regular_conjugations
  )
VALUES(
    '日',
    4,
    'よっか',
    'standard-wago-range-sound-change',
    1
  );
INSERT INTO
  "counter_irregulars" (
    counter_id,
    number,
    kana,
    irregular_type,
    does_presence_erase_regular_conjugations
  )
VALUES(
    '日',
    3,
    'みっか',
    'standard-wago-range-sound-change',
    1
  );
INSERT INTO
  "counter_irregulars" (
    counter_id,
    number,
    kana,
    irregular_type,
    does_presence_erase_regular_conjugations
  )
VALUES(
    '日',
    2,
    'ふつか',
    'standard-wago-range-sound-change',
    1
  );
INSERT INTO
  "counter_irregulars" (
    counter_id,
    number,
    kana,
    irregular_type,
    does_presence_erase_regular_conjugations
  )
VALUES('日', 1, 'ついたち', 'arbitrary-reading', 1);
INSERT INTO
  "counter_irregulars" (
    counter_id,
    number,
    kana,
    irregular_type,
    does_presence_erase_regular_conjugations
  )
VALUES('日', 24, 'にじゅうよっか', 'arbitrary-reading', 0);
INSERT INTO
  "counter_irregulars" (
    counter_id,
    number,
    kana,
    irregular_type,
    does_presence_erase_regular_conjugations
  )
VALUES('日', 20, 'はつか', 'arbitrary-reading', 0);
INSERT INTO
  "counter_irregulars" (
    counter_id,
    number,
    kana,
    irregular_type,
    does_presence_erase_regular_conjugations
  )
VALUES('日', 14, 'じゅうよっか', 'arbitrary-reading', 0);
COMMIT;