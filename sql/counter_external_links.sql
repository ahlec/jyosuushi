PRAGMA foreign_keys = OFF;
BEGIN TRANSACTION;
CREATE TABLE counter_external_links (
  counter_id STRING REFERENCES counters (counter_id),
  url STRING NOT NULL,
  site_name STRING NOT NULL,
  link_text STRING NOT NULL,
  additional_description STRING
);
INSERT INTO
  "counter_external_links"
VALUES(
    '本',
    'https://www.tofugu.com/japanese/japanese-counter-hon/',
    'Tofugu',
    '本: Counting Long, Skinny Things',
    NULL
  );
INSERT INTO
  "counter_external_links"
VALUES(
    '羽',
    'https://www.tofugu.com/japanese/japanese-counter-wa/',
    'Tofugu',
    '羽: Counting Birds, Bats, and Bun-Buns',
    NULL
  );
INSERT INTO
  "counter_external_links"
VALUES(
    '匹',
    'https://www.tofugu.com/japanese/japanese-counter-hiki/',
    'Tofugu',
    '匹: Counting Animals, Bugs, and Wild Children',
    NULL
  );
INSERT INTO
  "counter_external_links"
VALUES(
    '台',
    'https://www.tofugu.com/japanese/japanese-counter-dai/',
    'Tofugu',
    '台: Counting Machines, Furniture, & Whole Cakes',
    NULL
  );
INSERT INTO
  "counter_external_links"
VALUES(
    '頭',
    'https://www.tofugu.com/japanese/japanese-counter-tou/',
    'Tofugu',
    '頭: Counting Those Big, Professional Animals',
    NULL
  );
INSERT INTO
  "counter_external_links"
VALUES(
    '枚',
    'https://www.tofugu.com/japanese/japanese-counter-mai/',
    'Tofugu',
    '枚: Counting Everything Flat',
    NULL
  );
INSERT INTO
  "counter_external_links"
VALUES(
    '階',
    'https://www.tofugu.com/japanese/japanese-counter-kai-floors/',
    'Tofugu',
    '階: Floors of a Building',
    NULL
  );
INSERT INTO
  "counter_external_links"
VALUES(
    '月',
    'https://www.tofugu.com/japanese/japanese-counter-tsuki-gatsu-getsu/',
    'Tofugu',
    '月: Counting Months',
    NULL
  );
INSERT INTO
  "counter_external_links"
VALUES(
    '日',
    'https://www.tofugu.com/japanese/japanese-counter-ka-nichi/',
    'Tofugu',
    '日: Counting Days',
    NULL
  );
INSERT INTO
  "counter_external_links"
VALUES(
    '名',
    'https://www.tofugu.com/japanese/japanese-counter-nin/',
    'Tofugu',
    '人: Counting People and Smart Animals',
    NULL
  );
INSERT INTO
  "counter_external_links"
VALUES(
    '人',
    'https://www.tofugu.com/japanese/japanese-counter-nin/',
    'Tofugu',
    '人: Counting People and Smart Animals',
    NULL
  );
INSERT INTO
  "counter_external_links"
VALUES(
    '冊',
    'https://www.tofugu.com/japanese/japanese-counter-satsu/',
    'Tofugu',
    '冊: Counting Books',
    NULL
  );
INSERT INTO
  "counter_external_links"
VALUES(
    '回',
    'https://www.tofugu.com/japanese/japanese-counter-kai-times/',
    'Tofugu',
    '回: Repetitive Actions, Regular Events',
    NULL
  );
INSERT INTO
  "counter_external_links"
VALUES(
    '時',
    'https://www.tofugu.com/japanese/japanese-counter-ji-jikan/',
    'Tofugu',
    '時/時間: Counting Time and Hours',
    NULL
  );
INSERT INTO
  "counter_external_links"
VALUES(
    '年',
    'https://www.tofugu.com/japanese/japanese-counters-nen/',
    'Tofugu',
    '年: Counting Years and Planetary Orbits',
    NULL
  );
INSERT INTO
  "counter_external_links"
VALUES(
    '分',
    'https://www.tofugu.com/japanese/japanese-counter-fun/',
    'Tofugu',
    '分: Counting Minutes and Edo Period Silver Currency',
    NULL
  );
COMMIT;