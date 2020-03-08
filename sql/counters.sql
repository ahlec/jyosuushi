PRAGMA foreign_keys = OFF;
BEGIN TRANSACTION;
CREATE TABLE counters (
  counter_id STRING PRIMARY KEY,
  english_name STRING NOT NULL,
  notes TEXT
);
INSERT INTO
  "counters"
VALUES('日', 'days of the month', NULL);
INSERT INTO
  "counters"
VALUES('本', 'long, thin objects', NULL);
INSERT INTO
  "counters"
VALUES('分', 'minutes', NULL);
INSERT INTO
  "counters"
VALUES('名', 'people', NULL);
INSERT INTO
  "counters"
VALUES('人', 'people', NULL);
INSERT INTO
  "counters"
VALUES('時', 'hours', NULL);
INSERT INTO
  "counters"
VALUES('枚', 'flat objects', NULL);
INSERT INTO
  "counters"
VALUES('匹', 'small animals', NULL);
INSERT INTO
  "counters"
VALUES('頭', 'large animals', NULL);
INSERT INTO
  "counters"
VALUES('羽', 'birds and rabbits', NULL);
INSERT INTO
  "counters"
VALUES('冊', 'books', NULL);
INSERT INTO
  "counters"
VALUES('台', 'machines and large objects', NULL);
INSERT INTO
  "counters"
VALUES('年', 'years', NULL);
INSERT INTO
  "counters"
VALUES('回', 'times (occurrences)', NULL);
INSERT INTO
  "counters"
VALUES('階', 'floors', NULL);
INSERT INTO
  "counters"
VALUES('歳', 'age', NULL);
INSERT INTO
  "counters"
VALUES('ヶ月', 'months', NULL);
INSERT INTO
  "counters"
VALUES('ヶ国', 'countries', NULL);
INSERT INTO
  "counters"
VALUES('円', 'yen', 'hello world');
INSERT INTO
  "counters"
VALUES('巻', 'volumes', NULL);
INSERT INTO
  "counters"
VALUES('缶', 'cans', NULL);
INSERT INTO
  "counters"
VALUES('曲', 'songs', NULL);
INSERT INTO
  "counters"
VALUES('ヶ所', 'places', NULL);
INSERT INTO
  "counters"
VALUES('軒', 'houses and buildings', NULL);
INSERT INTO
  "counters"
VALUES('件', 'matters', NULL);
INSERT INTO
  "counters"
VALUES('組', 'groups and pairs', NULL);
INSERT INTO
  "counters"
VALUES('口', 'bites', NULL);
INSERT INTO
  "counters"
VALUES('切れ', 'cuts of meat', NULL);
INSERT INTO
  "counters"
VALUES('語', 'words', NULL);
INSERT INTO
  "counters"
VALUES('皿', 'plates of food', NULL);
INSERT INTO
  "counters"
VALUES('校', 'schools', NULL);
INSERT INTO
  "counters"
VALUES('ゲーム', 'games', NULL);
INSERT INTO
  "counters"
VALUES('試合', 'games', NULL);
INSERT INTO
  "counters"
VALUES('品', 'products', NULL);
INSERT INTO
  "counters"
VALUES('社', 'companies and temples', NULL);
INSERT INTO
  "counters"
VALUES('週', 'weeks', NULL);
INSERT INTO
  "counters"
VALUES('周', 'laps and circuits', NULL);
INSERT INTO
  "counters"
VALUES('色', 'colours', NULL);
INSERT INTO
  "counters"
VALUES('席', 'seats', NULL);
INSERT INTO
  "counters"
VALUES('戦', 'battles', NULL);
INSERT INTO
  "counters"
VALUES('足', 'pairs of footwear', NULL);
INSERT INTO
  "counters"
VALUES('束', 'bundles', NULL);
COMMIT;