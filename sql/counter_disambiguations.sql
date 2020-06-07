PRAGMA foreign_keys = OFF;
BEGIN TRANSACTION;
CREATE TABLE counter_disambiguations (
  counter1_id STRING NOT NULL REFERENCES counters (counter_id) CHECK (counter1_id <> counter2_id),
  counter2_id STRING NOT NULL REFERENCES counters (counter_id) CHECK (counter1_id <> counter2_id),
  distinction TEXT NOT NULL,
  PRIMARY KEY (counter1_id, counter2_id)
);
INSERT INTO
  "counter_disambiguations" (counter1_id, counter2_id, distinction)
VALUES(
    '人',
    '名',
    '人 is much more commonly used in daily conversation. 名 is more polite than 人 and so is used in formal situations.'
  );
INSERT INTO
  "counter_disambiguations" (counter1_id, counter2_id, distinction)
VALUES(
    '人',
    '匹',
    'While 人 is the counter for humans and 匹 is the counter for animals, the line can sometimes be blurred. Non-human animals can be counted with 人, either out of respect or love; using 人 to count an animal will humanize the animal. Conversely, humans can be counted with 匹 to emphasize animalistic behaviour; a woman counted with 匹 would carry the nuance of being more beast than man.'
  );
COMMIT;