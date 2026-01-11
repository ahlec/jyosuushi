PRAGMA foreign_keys = OFF;
BEGIN TRANSACTION;
CREATE TABLE counter_reading_frequency (
  counter_id STRING NOT NULL REFERENCES counters (counter_id),
  amount INTEGER NOT NULL,
  kana STRING NOT NULL,
  frequency STRING NOT NULL REFERENCES enum_counter_reading_frequency (frequency),
  PRIMARY KEY (counter_id, amount, kana)
);
INSERT INTO
  "counter_reading_frequency" (counter_id, amount, kana, frequency)
VALUES('日', 20, 'にじゅうにち', 'uncommon');
COMMIT;