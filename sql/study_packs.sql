PRAGMA foreign_keys = OFF;
BEGIN TRANSACTION;
CREATE TABLE study_packs (
  pack_id STRING PRIMARY KEY NOT NULL,
  english_name STRING NOT NULL,
  date_counter_last_removed DATETIME
);
INSERT INTO
  "study_packs" (pack_id, english_name, date_counter_last_removed)
VALUES('n5', 'JLPT N5', NULL);
INSERT INTO
  "study_packs" (pack_id, english_name, date_counter_last_removed)
VALUES('n4', 'JLPT N4', NULL);
INSERT INTO
  "study_packs" (pack_id, english_name, date_counter_last_removed)
VALUES('essential', 'Essential', NULL);
INSERT INTO
  "study_packs" (pack_id, english_name, date_counter_last_removed)
VALUES('common', 'Common', NULL);
COMMIT;