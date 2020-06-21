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
INSERT INTO
  "counter_disambiguations" (counter1_id, counter2_id, distinction)
VALUES(
    '本',
    '缶',
    '本, as a counter for long and thin cylindrical objects, can be used to count canned goods. The counter 缶, literally meaning "tin can," can also be used to count canned goods. The shape of the can itself would need to be long and tall in order to use 本, but if that criteria is met, it comes down to what is inside the can. Typically, cans containing liquids or drinks (such as juice) would use 本 while cans with solid contents (such as vegetables) would use 缶.[^japanknowledge]

[^japanknowledge]: [JapanKnowledge](https://japanknowledge.com/articles/kze/column_kaz_03.html#:~:text=%E7%BC%B6%E3%81%AE%E4%B8%AD%E8%BA%AB%E3%81%8C%E3%82%B8%E3%83%A5%E3%83%BC%E3%82%B9,%E3%81%97%E3%81%A6%E3%81%84%E3%82%8B%E3%81%AE%E3%81%A7%E3%81%99%E3%80%82): これは、話し手が単純に缶だけを数えているのではなく、缶の中身によって数え分けていることを示しています。缶の中身がジュースのような液体だと「本」で数えますが、中身がアスパラガスのように固体だと「個」や「缶」で数えます。また、中身の入っていない空き缶は「本」では数えず、「空き缶1個」のように数えます。'
  );
INSERT INTO
  "counter_disambiguations" (counter1_id, counter2_id, distinction)
VALUES(
    '年',
    '歳',
    'While both words mean "year," {歳}^(さい) as a counter is used specifically to express a living being''s age in years while {年}^(ねん) is the counter for years themselves.'
  );
COMMIT;