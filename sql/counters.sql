PRAGMA foreign_keys = OFF;
BEGIN TRANSACTION;
CREATE TABLE counters (
  counter_id STRING PRIMARY KEY,
  english_name STRING NOT NULL,
  kana STRING NOT NULL,
  kanji STRING,
  uses_yon BOOLEAN NOT NULL DEFAULT (1),
  uses_yo BOOLEAN NOT NULL DEFAULT (0),
  uses_shi BOOLEAN NOT NULL DEFAULT (0),
  uses_nana BOOLEAN NOT NULL DEFAULT (1),
  uses_shichi BOOLEAN NOT NULL DEFAULT (0),
  uses_kyuu BOOLEAN NOT NULL DEFAULT (1),
  uses_ku BOOLEAN NOT NULL DEFAULT (0),
  notes TEXT
);
INSERT INTO
  "counters"
VALUES(
    '日',
    'days of the month',
    'にち',
    '日',
    1,
    0,
    0,
    1,
    0,
    1,
    0,
    NULL
  );
INSERT INTO
  "counters"
VALUES(
    '本',
    'long, thin objects',
    'ほん',
    '本',
    1,
    0,
    0,
    1,
    1,
    1,
    0,
    NULL
  );
INSERT INTO
  "counters"
VALUES('分', 'minutes', 'ふん', '分', 1, 0, 0, 1, 1, 1, 0, NULL);
INSERT INTO
  "counters"
VALUES('名', 'people', 'めい', '名', 1, 0, 0, 1, 0, 1, 0, NULL);
INSERT INTO
  "counters"
VALUES('人', 'people', 'にん', '人', 0, 1, 0, 1, 1, 1, 1, NULL);
INSERT INTO
  "counters"
VALUES('時', 'hours', 'じ', '時', 0, 1, 0, 1, 1, 0, 1, NULL);
INSERT INTO
  "counters"
VALUES('枚', 'flat objects', 'まい', '枚', 1, 0, 0, 1, 1, 1, 0, NULL);
INSERT INTO
  "counters"
VALUES('匹', 'small animals', 'ひき', '匹', 1, 0, 0, 1, 1, 1, 0, NULL);
INSERT INTO
  "counters"
VALUES('頭', 'large animals', 'とう', '頭', 1, 0, 0, 1, 1, 1, 0, NULL);
INSERT INTO
  "counters"
VALUES(
    '羽',
    'birds and rabbits',
    'わ',
    '羽',
    1,
    0,
    0,
    1,
    1,
    1,
    0,
    NULL
  );
INSERT INTO
  "counters"
VALUES('冊', 'books', 'さつ', '冊', 1, 0, 0, 1, 1, 1, 0, NULL);
INSERT INTO
  "counters"
VALUES(
    '台',
    'machines and large objects',
    'だい',
    '台',
    1,
    0,
    0,
    1,
    1,
    1,
    0,
    NULL
  );
INSERT INTO
  "counters"
VALUES('年', 'years', 'ねん', '年', 0, 1, 0, 1, 1, 1, 1, NULL);
INSERT INTO
  "counters"
VALUES(
    '回',
    'times (occurrences)',
    'かい',
    '回',
    1,
    0,
    0,
    1,
    1,
    1,
    0,
    NULL
  );
INSERT INTO
  "counters"
VALUES('月', 'months', 'つき', '月', 1, 0, 0, 1, 0, 1, 0, NULL);
INSERT INTO
  "counters"
VALUES('階', 'floors', 'かい', '階', 1, 0, 0, 1, 1, 1, 0, NULL);
INSERT INTO
  "counters"
VALUES('歳', 'age', 'さい', '歳', 1, 0, 0, 1, 0, 1, 0, NULL);
INSERT INTO
  "counters"
VALUES('ヶ月', 'months', 'かげつ', 'ヶ月', 1, 0, 0, 1, 0, 1, 0, NULL);
INSERT INTO
  "counters"
VALUES('ヶ国', 'countries', 'かこく', 'ヶ国', 1, 0, 0, 1, 0, 1, 0, NULL);
INSERT INTO
  "counters"
VALUES('円', 'yen', 'えん', '円', 1, 0, 0, 1, 0, 1, 0, NULL);
INSERT INTO
  "counters"
VALUES('巻', 'volumes', 'かん', '巻', 1, 0, 0, 1, 0, 1, 0, NULL);
INSERT INTO
  "counters"
VALUES('缶', 'cans', 'かん', '缶', 1, 0, 0, 1, 0, 1, 0, NULL);
INSERT INTO
  "counters"
VALUES('曲', 'songs', 'きょく', '曲', 1, 0, 0, 1, 0, 1, 0, NULL);
INSERT INTO
  "counters"
VALUES('ヶ所', 'places', 'かしょ', 'ヶ所', 1, 0, 0, 1, 0, 1, 0, NULL);
INSERT INTO
  "counters"
VALUES(
    '軒',
    'houses and buildings',
    'けん',
    '軒',
    1,
    0,
    0,
    1,
    0,
    1,
    0,
    NULL
  );
INSERT INTO
  "counters"
VALUES('件', 'matters', 'けん', '件', 1, 0, 0, 1, 0, 1, 0, NULL);
INSERT INTO
  "counters"
VALUES(
    '組',
    'groups and pairs',
    'くみ',
    '組',
    1,
    0,
    0,
    1,
    0,
    1,
    0,
    NULL
  );
INSERT INTO
  "counters"
VALUES('口', 'bites', 'くち', '口', 1, 0, 0, 1, 0, 1, 0, NULL);
INSERT INTO
  "counters"
VALUES('切れ', 'cuts of meat', 'きれ', '切れ', 1, 0, 0, 1, 0, 1, 0, NULL);
INSERT INTO
  "counters"
VALUES('語', 'words', 'ご', '語', 1, 0, 0, 1, 0, 1, 0, NULL);
INSERT INTO
  "counters"
VALUES('皿', 'plates of food', 'さら', '皿', 1, 0, 0, 1, 0, 1, 0, NULL);
INSERT INTO
  "counters"
VALUES('校', 'schools', 'こう', '校', 1, 0, 0, 1, 0, 1, 0, NULL);
INSERT INTO
  "counters"
VALUES('ゲーム', 'games', 'ゲーム', 'ゲーム', 1, 0, 0, 1, 0, 1, 0, NULL);
INSERT INTO
  "counters"
VALUES('試合', 'games', 'しあい', '試合', 1, 0, 0, 1, 0, 1, 0, NULL);
INSERT INTO
  "counters"
VALUES('品（ひん）', 'products', 'ひん', '品', 1, 0, 0, 1, 0, 1, 0, NULL);
INSERT INTO
  "counters"
VALUES('品（しな）', 'products', 'しな', '品', 1, 0, 0, 1, 0, 1, 0, NULL);
INSERT INTO
  "counters"
VALUES(
    '社',
    'companies and temples',
    'しゃ',
    '社',
    1,
    0,
    0,
    1,
    0,
    1,
    0,
    NULL
  );
INSERT INTO
  "counters"
VALUES('週', 'weeks', 'しゅう', '週', 1, 0, 0, 1, 0, 1, 0, NULL);
INSERT INTO
  "counters"
VALUES(
    '周',
    'laps and circuits',
    'しゅう',
    '周',
    1,
    0,
    0,
    1,
    0,
    1,
    0,
    NULL
  );
INSERT INTO
  "counters"
VALUES('色', 'colours', 'しょく', '色', 1, 0, 0, 1, 0, 1, 0, NULL);
INSERT INTO
  "counters"
VALUES('席', 'seats', 'せき', '席', 1, 0, 0, 1, 0, 1, 0, NULL);
INSERT INTO
  "counters"
VALUES('戦', 'battles', 'せん', '戦', 1, 0, 0, 1, 0, 1, 0, NULL);
INSERT INTO
  "counters"
VALUES(
    '足',
    'pairs of footwear',
    'そく',
    '足',
    1,
    0,
    0,
    1,
    0,
    1,
    0,
    NULL
  );
INSERT INTO
  "counters"
VALUES('束', 'bundles', 'たば', '束', 1, 0, 0, 1, 0, 1, 0, NULL);
COMMIT;