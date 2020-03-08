PRAGMA foreign_keys = OFF;
BEGIN TRANSACTION;
CREATE TABLE counters (
  counter_id STRING PRIMARY KEY,
  english_name STRING NOT NULL,
  notes TEXT,
  primary_kanji STRING UNIQUE
);
INSERT INTO
  "counters"
VALUES('日', 'days of the month', NULL, '日');
INSERT INTO
  "counters"
VALUES('本', 'long, thin objects', NULL, '本');
INSERT INTO
  "counters"
VALUES('分', 'minutes', NULL, '分');
INSERT INTO
  "counters"
VALUES('名', 'people', NULL, '名');
INSERT INTO
  "counters"
VALUES('人', 'people', NULL, '人');
INSERT INTO
  "counters"
VALUES('時', 'hours', NULL, '時');
INSERT INTO
  "counters"
VALUES('枚', 'flat objects', NULL, '枚');
INSERT INTO
  "counters"
VALUES('匹', 'small animals', NULL, '匹');
INSERT INTO
  "counters"
VALUES('頭', 'large animals', NULL, '頭');
INSERT INTO
  "counters"
VALUES('羽', 'birds and rabbits', NULL, '羽');
INSERT INTO
  "counters"
VALUES('冊', 'books', NULL, '冊');
INSERT INTO
  "counters"
VALUES('台', 'machines and large objects', NULL, '台');
INSERT INTO
  "counters"
VALUES('年', 'years', NULL, '年');
INSERT INTO
  "counters"
VALUES('回', 'times (occurrences)', NULL, '回');
INSERT INTO
  "counters"
VALUES('階', 'floors', NULL, '階');
INSERT INTO
  "counters"
VALUES('歳', 'age', NULL, '歳');
INSERT INTO
  "counters"
VALUES('ヶ月', 'months', NULL, 'ヶ月');
INSERT INTO
  "counters"
VALUES('ヶ国', 'countries', NULL, 'ヶ国');
INSERT INTO
  "counters"
VALUES('円', 'yen', 'hello world', '円');
INSERT INTO
  "counters"
VALUES('巻', 'volumes', NULL, '巻');
INSERT INTO
  "counters"
VALUES('缶', 'cans', NULL, '缶');
INSERT INTO
  "counters"
VALUES('曲', 'songs', NULL, '曲');
INSERT INTO
  "counters"
VALUES('ヶ所', 'places', NULL, 'ヶ所');
INSERT INTO
  "counters"
VALUES('軒', 'houses and buildings', NULL, '軒');
INSERT INTO
  "counters"
VALUES('件', 'matters', NULL, '件');
INSERT INTO
  "counters"
VALUES('組', 'groups and pairs', NULL, '組');
INSERT INTO
  "counters"
VALUES('口', 'bites', NULL, '口');
INSERT INTO
  "counters"
VALUES('切れ', 'cuts of meat', NULL, '切れ');
INSERT INTO
  "counters"
VALUES('語', 'words', NULL, '語');
INSERT INTO
  "counters"
VALUES('皿', 'plates of food', NULL, '皿');
INSERT INTO
  "counters"
VALUES('校', 'schools', NULL, '校');
INSERT INTO
  "counters"
VALUES('ゲーム', 'games', NULL, NULL);
INSERT INTO
  "counters"
VALUES('試合', 'games', NULL, '試合');
INSERT INTO
  "counters"
VALUES('品', 'products', NULL, '品');
INSERT INTO
  "counters"
VALUES('社', 'companies and temples', NULL, '社');
INSERT INTO
  "counters"
VALUES('週', 'weeks', NULL, '週');
INSERT INTO
  "counters"
VALUES('周', 'laps and circuits', NULL, '周');
INSERT INTO
  "counters"
VALUES('色', 'colours', NULL, '色');
INSERT INTO
  "counters"
VALUES('席', 'seats', NULL, '席');
INSERT INTO
  "counters"
VALUES('戦', 'battles', NULL, '戦');
INSERT INTO
  "counters"
VALUES('足', 'pairs of footwear', NULL, '足');
INSERT INTO
  "counters"
VALUES('束', 'bundles', NULL, '束');
COMMIT;