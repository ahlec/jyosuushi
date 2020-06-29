PRAGMA foreign_keys = OFF;
BEGIN TRANSACTION;
CREATE TABLE counter_external_links (
  counter_id STRING REFERENCES counters (counter_id),
  url STRING NOT NULL,
  site_name STRING NOT NULL,
  link_text STRING NOT NULL,
  description STRING NOT NULL,
  language STRING REFERENCES enum_external_link_language (language) NOT NULL
);
INSERT INTO
  "counter_external_links" (
    counter_id,
    url,
    site_name,
    link_text,
    description,
    language
  )
VALUES(
    '本',
    'https://www.tofugu.com/japanese/japanese-counter-hon/',
    'Tofugu',
    '本: Counting Long, Skinny Things',
    'Detailed and well-researched article from the kings of Japanese language learning.',
    'english'
  );
INSERT INTO
  "counter_external_links" (
    counter_id,
    url,
    site_name,
    link_text,
    description,
    language
  )
VALUES(
    '羽',
    'https://www.tofugu.com/japanese/japanese-counter-wa/',
    'Tofugu',
    '羽: Counting Birds, Bats, and Bun-Buns',
    'Detailed and well-researched article from the kings of Japanese language learning.',
    'english'
  );
INSERT INTO
  "counter_external_links" (
    counter_id,
    url,
    site_name,
    link_text,
    description,
    language
  )
VALUES(
    '匹',
    'https://www.tofugu.com/japanese/japanese-counter-hiki/',
    'Tofugu',
    '匹: Counting Animals, Bugs, and Wild Children',
    'Detailed and well-researched article from the kings of Japanese language learning.',
    'english'
  );
INSERT INTO
  "counter_external_links" (
    counter_id,
    url,
    site_name,
    link_text,
    description,
    language
  )
VALUES(
    '台',
    'https://www.tofugu.com/japanese/japanese-counter-dai/',
    'Tofugu',
    '台: Counting Machines, Furniture, & Whole Cakes',
    'Detailed and well-researched article from the kings of Japanese language learning.',
    'english'
  );
INSERT INTO
  "counter_external_links" (
    counter_id,
    url,
    site_name,
    link_text,
    description,
    language
  )
VALUES(
    '頭',
    'https://www.tofugu.com/japanese/japanese-counter-tou/',
    'Tofugu',
    '頭: Counting Those Big, Professional Animals',
    'Detailed and well-researched article from the kings of Japanese language learning.',
    'english'
  );
INSERT INTO
  "counter_external_links" (
    counter_id,
    url,
    site_name,
    link_text,
    description,
    language
  )
VALUES(
    '枚',
    'https://www.tofugu.com/japanese/japanese-counter-mai/',
    'Tofugu',
    '枚: Counting Everything Flat',
    'Detailed and well-researched article from the kings of Japanese language learning.',
    'english'
  );
INSERT INTO
  "counter_external_links" (
    counter_id,
    url,
    site_name,
    link_text,
    description,
    language
  )
VALUES(
    '階',
    'https://www.tofugu.com/japanese/japanese-counter-kai-floors/',
    'Tofugu',
    '階: Floors of a Building',
    'Detailed and well-researched article from the kings of Japanese language learning.',
    'english'
  );
INSERT INTO
  "counter_external_links" (
    counter_id,
    url,
    site_name,
    link_text,
    description,
    language
  )
VALUES(
    'ヶ月',
    'https://www.tofugu.com/japanese/japanese-counter-tsuki-gatsu-getsu/',
    'Tofugu',
    '月: Counting Months',
    'Detailed and well-researched article from the kings of Japanese language learning.',
    'english'
  );
INSERT INTO
  "counter_external_links" (
    counter_id,
    url,
    site_name,
    link_text,
    description,
    language
  )
VALUES(
    '日',
    'https://www.tofugu.com/japanese/japanese-counter-ka-nichi/',
    'Tofugu',
    '日: Counting Days',
    'Detailed and well-researched article from the kings of Japanese language learning.',
    'english'
  );
INSERT INTO
  "counter_external_links" (
    counter_id,
    url,
    site_name,
    link_text,
    description,
    language
  )
VALUES(
    '名',
    'https://www.tofugu.com/japanese/japanese-counter-nin/',
    'Tofugu',
    '人: Counting People and Smart Animals',
    'Detailed and well-researched article from the kings of Japanese language learning.',
    'english'
  );
INSERT INTO
  "counter_external_links" (
    counter_id,
    url,
    site_name,
    link_text,
    description,
    language
  )
VALUES(
    '人',
    'https://www.tofugu.com/japanese/japanese-counter-nin/',
    'Tofugu',
    '人: Counting People and Smart Animals',
    'Detailed and well-researched article from the kings of Japanese language learning.',
    'english'
  );
INSERT INTO
  "counter_external_links" (
    counter_id,
    url,
    site_name,
    link_text,
    description,
    language
  )
VALUES(
    '冊',
    'https://www.tofugu.com/japanese/japanese-counter-satsu/',
    'Tofugu',
    '冊: Counting Books',
    'Detailed and well-researched article from the kings of Japanese language learning.',
    'english'
  );
INSERT INTO
  "counter_external_links" (
    counter_id,
    url,
    site_name,
    link_text,
    description,
    language
  )
VALUES(
    '回',
    'https://www.tofugu.com/japanese/japanese-counter-kai-times/',
    'Tofugu',
    '回: Repetitive Actions, Regular Events',
    'Detailed and well-researched article from the kings of Japanese language learning.',
    'english'
  );
INSERT INTO
  "counter_external_links" (
    counter_id,
    url,
    site_name,
    link_text,
    description,
    language
  )
VALUES(
    '時',
    'https://www.tofugu.com/japanese/japanese-counter-ji-jikan/',
    'Tofugu',
    '時/時間: Counting Time and Hours',
    'Detailed and well-researched article from the kings of Japanese language learning.',
    'english'
  );
INSERT INTO
  "counter_external_links" (
    counter_id,
    url,
    site_name,
    link_text,
    description,
    language
  )
VALUES(
    '年',
    'https://www.tofugu.com/japanese/japanese-counters-nen/',
    'Tofugu',
    '年: Counting Years and Planetary Orbits',
    'Detailed and well-researched article from the kings of Japanese language learning.',
    'english'
  );
INSERT INTO
  "counter_external_links" (
    counter_id,
    url,
    site_name,
    link_text,
    description,
    language
  )
VALUES(
    '分',
    'https://www.tofugu.com/japanese/japanese-counter-fun/',
    'Tofugu',
    '分: Counting Minutes and Edo Period Silver Currency',
    'Detailed and well-researched article from the kings of Japanese language learning.',
    'english'
  );
INSERT INTO
  "counter_external_links" (
    counter_id,
    url,
    site_name,
    link_text,
    description,
    language
  )
VALUES(
    '人',
    'https://kotobank.jp/word/%E4%BA%BA-536577',
    'コトバンク',
    '人（読み：ジン）',
    'Japanese dictionary entries, compiled from multiple sources.',
    'japanese'
  );
INSERT INTO
  "counter_external_links" (
    counter_id,
    url,
    site_name,
    link_text,
    description,
    language
  )
VALUES(
    '本',
    'https://kotobank.jp/word/%E6%9C%AC-631932',
    'コトバンク',
    '本（読み：ホン）',
    'Japanese dictionary entries, compiled from multiple sources.',
    'japanese'
  );
INSERT INTO
  "counter_external_links" (
    counter_id,
    url,
    site_name,
    link_text,
    description,
    language
  )
VALUES(
    '歳',
    'https://kotobank.jp/word/%E6%AD%B3-507098',
    'コトバンク',
    '歳（読み：サイ）',
    'Japanese dictionary entries, compiled from multiple sources.',
    'japanese'
  );
INSERT INTO
  "counter_external_links" (
    counter_id,
    url,
    site_name,
    link_text,
    description,
    language
  )
VALUES(
    '戦',
    'http://hdl.handle.net/2241/00128666',
    '筑波大学',
    '近現代日本語における新たな助数詞の成立と定着',
    'Masters thesis that focuses on the establishment of new counters, in particular <counter:店> and <counter:試合>. Has a lengthy comparison of {試合}^(しあい) and {戦}^(せん) as counters.',
    'japanese'
  );
INSERT INTO
  "counter_external_links" (
    counter_id,
    url,
    site_name,
    link_text,
    description,
    language
  )
VALUES(
    '試合',
    'http://hdl.handle.net/2241/00128666',
    '筑波大学',
    '近現代日本語における新たな助数詞の成立と定着',
    'Masters thesis that focuses on the establishment of new counters, in particular <counter:店> and <counter:試合>.',
    'japanese'
  );
INSERT INTO
  "counter_external_links" (
    counter_id,
    url,
    site_name,
    link_text,
    description,
    language
  )
VALUES(
    '口',
    'https://kotobank.jp/word/%E5%8F%A3-55470',
    'コトバンク',
    '口（読み：くち）',
    'Japanese dictionary entries, compiled from multiple sources.',
    'japanese'
  );
INSERT INTO
  "counter_external_links" (
    counter_id,
    url,
    site_name,
    link_text,
    description,
    language
  )
VALUES(
    '切れ',
    'https://kotobank.jp/word/%E5%88%87%E3%82%8C-480539',
    'コトバンク',
    '切れ（読み：きれ）',
    'Japanese dictionary entries, compiled from multiple sources.',
    'japanese'
  );
COMMIT;