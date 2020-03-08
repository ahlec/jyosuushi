PRAGMA foreign_keys = OFF;
BEGIN TRANSACTION;
CREATE TABLE counter_alternative_kanji (
  counter_id STRING REFERENCES counters (counter_id),
  kanji STRING NOT NULL,
  PRIMARY KEY (counter_id, kanji)
);
INSERT INTO
  "counter_alternative_kanji"
VALUES('歳', '才');
COMMIT;