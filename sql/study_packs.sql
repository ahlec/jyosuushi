PRAGMA foreign_keys = OFF;
BEGIN TRANSACTION;
CREATE TABLE study_packs (
  pack_id STRING PRIMARY KEY NOT NULL,
  english_name STRING NOT NULL,
  date_counter_last_removed DATETIME,
  description TEXT NOT NULL
);
INSERT INTO
  "study_packs" (
    pack_id,
    english_name,
    date_counter_last_removed,
    description
  )
VALUES(
    'n5',
    'JLPT N5',
    NULL,
    'A collection of the counters that you’re likely to encounter when taking the Japanese Language Proficiency Test’s N5 level.'
  );
INSERT INTO
  "study_packs" (
    pack_id,
    english_name,
    date_counter_last_removed,
    description
  )
VALUES(
    'n4',
    'JLPT N4',
    NULL,
    'A collection of the counters that you’re likely to encounter when taking the Japanese Language Proficiency Test’s N4 level.'
  );
INSERT INTO
  "study_packs" (
    pack_id,
    english_name,
    date_counter_last_removed,
    description
  )
VALUES(
    'essential',
    'Essential',
    NULL,
    'A collection of the most common counters needed to get through a basic conversation in Japanese. Knowing these, you might not be able to count everything, but you’ll be able to make do for most things on a daily basis.'
  );
INSERT INTO
  "study_packs" (
    pack_id,
    english_name,
    date_counter_last_removed,
    description
  )
VALUES(
    'common',
    'Common',
    NULL,
    'Building off of the Essential collection, these are counters that you’re likely to run into with a fair bit of frequency as you dive deeper into Japanese and handle more complex situations.'
  );
COMMIT;