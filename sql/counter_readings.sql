PRAGMA foreign_keys = OFF;
BEGIN TRANSACTION;
CREATE TABLE counter_readings (
  counter_id STRING REFERENCES counters (counter_id),
  reading_id STRING,
  word_origin STRING REFERENCES enum_word_origin (word_origin),
  kana STRING,
  wago_style STRING REFERENCES wago_style (wago_style_handle),
  wago_custom_base STRING,
  kango_uses_yon BOOLEAN NOT NULL DEFAULT (1),
  kango_uses_yo BOOLEAN DEFAULT (0) NOT NULL,
  kango_uses_shi BOOLEAN NOT NULL DEFAULT (0),
  kango_uses_nana BOOLEAN NOT NULL DEFAULT (1),
  kango_uses_shichi BOOLEAN NOT NULL DEFAULT (0),
  kango_uses_kyuu BOOLEAN NOT NULL DEFAULT (1),
  kango_uses_ku BOOLEAN NOT NULL DEFAULT (0),
  PRIMARY KEY (counter_id, reading_id)
);
INSERT INTO
  "counter_readings" (
    counter_id,
    reading_id,
    word_origin,
    kana,
    wago_style,
    wago_custom_base,
    kango_uses_yon,
    kango_uses_yo,
    kango_uses_shi,
    kango_uses_nana,
    kango_uses_shichi,
    kango_uses_kyuu,
    kango_uses_ku
  )
VALUES(
    '束',
    'たば',
    '和語',
    'たば',
    'ひと、ふた、み(サン)',
    NULL,
    1,
    0,
    0,
    1,
    0,
    1,
    0
  );
INSERT INTO
  "counter_readings" (
    counter_id,
    reading_id,
    word_origin,
    kana,
    wago_style,
    wago_custom_base,
    kango_uses_yon,
    kango_uses_yo,
    kango_uses_shi,
    kango_uses_nana,
    kango_uses_shichi,
    kango_uses_kyuu,
    kango_uses_ku
  )
VALUES(
    '足',
    'そく',
    '漢語',
    'そく',
    NULL,
    NULL,
    1,
    0,
    0,
    1,
    0,
    1,
    0
  );
INSERT INTO
  "counter_readings" (
    counter_id,
    reading_id,
    word_origin,
    kana,
    wago_style,
    wago_custom_base,
    kango_uses_yon,
    kango_uses_yo,
    kango_uses_shi,
    kango_uses_nana,
    kango_uses_shichi,
    kango_uses_kyuu,
    kango_uses_ku
  )
VALUES(
    '戦',
    'せん',
    '漢語',
    'せん',
    NULL,
    NULL,
    1,
    0,
    0,
    1,
    0,
    1,
    0
  );
INSERT INTO
  "counter_readings" (
    counter_id,
    reading_id,
    word_origin,
    kana,
    wago_style,
    wago_custom_base,
    kango_uses_yon,
    kango_uses_yo,
    kango_uses_shi,
    kango_uses_nana,
    kango_uses_shichi,
    kango_uses_kyuu,
    kango_uses_ku
  )
VALUES(
    '席',
    'せき',
    '漢語',
    'せき',
    'ひと(イチ)、ふた(二)',
    NULL,
    1,
    0,
    0,
    1,
    0,
    1,
    0
  );
INSERT INTO
  "counter_readings" (
    counter_id,
    reading_id,
    word_origin,
    kana,
    wago_style,
    wago_custom_base,
    kango_uses_yon,
    kango_uses_yo,
    kango_uses_shi,
    kango_uses_nana,
    kango_uses_shichi,
    kango_uses_kyuu,
    kango_uses_ku
  )
VALUES(
    '色',
    'しょく',
    '漢語',
    'しょく',
    NULL,
    NULL,
    1,
    0,
    0,
    1,
    0,
    1,
    0
  );
INSERT INTO
  "counter_readings" (
    counter_id,
    reading_id,
    word_origin,
    kana,
    wago_style,
    wago_custom_base,
    kango_uses_yon,
    kango_uses_yo,
    kango_uses_shi,
    kango_uses_nana,
    kango_uses_shichi,
    kango_uses_kyuu,
    kango_uses_ku
  )
VALUES(
    '周',
    'しゅう',
    '漢語',
    'しゅう',
    NULL,
    NULL,
    1,
    0,
    0,
    1,
    0,
    1,
    0
  );
INSERT INTO
  "counter_readings" (
    counter_id,
    reading_id,
    word_origin,
    kana,
    wago_style,
    wago_custom_base,
    kango_uses_yon,
    kango_uses_yo,
    kango_uses_shi,
    kango_uses_nana,
    kango_uses_shichi,
    kango_uses_kyuu,
    kango_uses_ku
  )
VALUES(
    '週',
    'しゅう',
    '漢語',
    'しゅう',
    NULL,
    NULL,
    1,
    0,
    0,
    1,
    0,
    1,
    0
  );
INSERT INTO
  "counter_readings" (
    counter_id,
    reading_id,
    word_origin,
    kana,
    wago_style,
    wago_custom_base,
    kango_uses_yon,
    kango_uses_yo,
    kango_uses_shi,
    kango_uses_nana,
    kango_uses_shichi,
    kango_uses_kyuu,
    kango_uses_ku
  )
VALUES(
    '社',
    'しゃ',
    '漢語',
    'しゃ',
    NULL,
    NULL,
    1,
    0,
    0,
    1,
    0,
    1,
    0
  );
INSERT INTO
  "counter_readings" (
    counter_id,
    reading_id,
    word_origin,
    kana,
    wago_style,
    wago_custom_base,
    kango_uses_yon,
    kango_uses_yo,
    kango_uses_shi,
    kango_uses_nana,
    kango_uses_shichi,
    kango_uses_kyuu,
    kango_uses_ku
  )
VALUES(
    '品',
    'ひん',
    '漢語',
    'ひん',
    NULL,
    NULL,
    1,
    0,
    0,
    1,
    0,
    1,
    0
  );
INSERT INTO
  "counter_readings" (
    counter_id,
    reading_id,
    word_origin,
    kana,
    wago_style,
    wago_custom_base,
    kango_uses_yon,
    kango_uses_yo,
    kango_uses_shi,
    kango_uses_nana,
    kango_uses_shichi,
    kango_uses_kyuu,
    kango_uses_ku
  )
VALUES(
    '品',
    'しな',
    '和語',
    'しな',
    NULL,
    NULL,
    1,
    0,
    0,
    1,
    0,
    1,
    0
  );
INSERT INTO
  "counter_readings" (
    counter_id,
    reading_id,
    word_origin,
    kana,
    wago_style,
    wago_custom_base,
    kango_uses_yon,
    kango_uses_yo,
    kango_uses_shi,
    kango_uses_nana,
    kango_uses_shichi,
    kango_uses_kyuu,
    kango_uses_ku
  )
VALUES(
    '試合',
    'しあい',
    '漢語',
    'しあい',
    NULL,
    NULL,
    1,
    0,
    0,
    1,
    0,
    1,
    0
  );
INSERT INTO
  "counter_readings" (
    counter_id,
    reading_id,
    word_origin,
    kana,
    wago_style,
    wago_custom_base,
    kango_uses_yon,
    kango_uses_yo,
    kango_uses_shi,
    kango_uses_nana,
    kango_uses_shichi,
    kango_uses_kyuu,
    kango_uses_ku
  )
VALUES(
    'ゲーム',
    'ゲーム',
    '外来語',
    'ゲーム',
    NULL,
    NULL,
    1,
    0,
    0,
    1,
    0,
    1,
    0
  );
INSERT INTO
  "counter_readings" (
    counter_id,
    reading_id,
    word_origin,
    kana,
    wago_style,
    wago_custom_base,
    kango_uses_yon,
    kango_uses_yo,
    kango_uses_shi,
    kango_uses_nana,
    kango_uses_shichi,
    kango_uses_kyuu,
    kango_uses_ku
  )
VALUES(
    '校',
    'こう',
    '漢語',
    'こう',
    NULL,
    NULL,
    1,
    0,
    0,
    1,
    0,
    1,
    0
  );
INSERT INTO
  "counter_readings" (
    counter_id,
    reading_id,
    word_origin,
    kana,
    wago_style,
    wago_custom_base,
    kango_uses_yon,
    kango_uses_yo,
    kango_uses_shi,
    kango_uses_nana,
    kango_uses_shichi,
    kango_uses_kyuu,
    kango_uses_ku
  )
VALUES(
    '皿',
    'さら',
    '和語',
    'さら',
    'ひと、ふた、み(サン)',
    NULL,
    1,
    0,
    0,
    1,
    0,
    1,
    0
  );
INSERT INTO
  "counter_readings" (
    counter_id,
    reading_id,
    word_origin,
    kana,
    wago_style,
    wago_custom_base,
    kango_uses_yon,
    kango_uses_yo,
    kango_uses_shi,
    kango_uses_nana,
    kango_uses_shichi,
    kango_uses_kyuu,
    kango_uses_ku
  )
VALUES(
    '語',
    'ご',
    '漢語',
    'ご',
    NULL,
    NULL,
    1,
    0,
    0,
    1,
    0,
    1,
    0
  );
INSERT INTO
  "counter_readings" (
    counter_id,
    reading_id,
    word_origin,
    kana,
    wago_style,
    wago_custom_base,
    kango_uses_yon,
    kango_uses_yo,
    kango_uses_shi,
    kango_uses_nana,
    kango_uses_shichi,
    kango_uses_kyuu,
    kango_uses_ku
  )
VALUES(
    '切れ',
    'きれ',
    '和語',
    'きれ',
    NULL,
    NULL,
    1,
    0,
    0,
    1,
    0,
    1,
    0
  );
INSERT INTO
  "counter_readings" (
    counter_id,
    reading_id,
    word_origin,
    kana,
    wago_style,
    wago_custom_base,
    kango_uses_yon,
    kango_uses_yo,
    kango_uses_shi,
    kango_uses_nana,
    kango_uses_shichi,
    kango_uses_kyuu,
    kango_uses_ku
  )
VALUES(
    '口',
    'くち',
    '和語',
    'くち',
    'ひと、ふた、み(サン)',
    NULL,
    1,
    0,
    0,
    1,
    0,
    1,
    0
  );
INSERT INTO
  "counter_readings" (
    counter_id,
    reading_id,
    word_origin,
    kana,
    wago_style,
    wago_custom_base,
    kango_uses_yon,
    kango_uses_yo,
    kango_uses_shi,
    kango_uses_nana,
    kango_uses_shichi,
    kango_uses_kyuu,
    kango_uses_ku
  )
VALUES(
    '組',
    'くみ',
    '和語',
    'くみ',
    NULL,
    NULL,
    1,
    0,
    0,
    1,
    0,
    1,
    0
  );
INSERT INTO
  "counter_readings" (
    counter_id,
    reading_id,
    word_origin,
    kana,
    wago_style,
    wago_custom_base,
    kango_uses_yon,
    kango_uses_yo,
    kango_uses_shi,
    kango_uses_nana,
    kango_uses_shichi,
    kango_uses_kyuu,
    kango_uses_ku
  )
VALUES(
    '件',
    'けん',
    '漢語',
    'けん',
    NULL,
    NULL,
    1,
    0,
    0,
    1,
    0,
    1,
    0
  );
INSERT INTO
  "counter_readings" (
    counter_id,
    reading_id,
    word_origin,
    kana,
    wago_style,
    wago_custom_base,
    kango_uses_yon,
    kango_uses_yo,
    kango_uses_shi,
    kango_uses_nana,
    kango_uses_shichi,
    kango_uses_kyuu,
    kango_uses_ku
  )
VALUES(
    '軒',
    'けん',
    '漢語',
    'けん',
    NULL,
    NULL,
    1,
    0,
    0,
    1,
    0,
    1,
    0
  );
INSERT INTO
  "counter_readings" (
    counter_id,
    reading_id,
    word_origin,
    kana,
    wago_style,
    wago_custom_base,
    kango_uses_yon,
    kango_uses_yo,
    kango_uses_shi,
    kango_uses_nana,
    kango_uses_shichi,
    kango_uses_kyuu,
    kango_uses_ku
  )
VALUES(
    'ヶ所',
    'かしょ',
    '漢語',
    'かしょ',
    NULL,
    NULL,
    1,
    0,
    0,
    1,
    0,
    1,
    0
  );
INSERT INTO
  "counter_readings" (
    counter_id,
    reading_id,
    word_origin,
    kana,
    wago_style,
    wago_custom_base,
    kango_uses_yon,
    kango_uses_yo,
    kango_uses_shi,
    kango_uses_nana,
    kango_uses_shichi,
    kango_uses_kyuu,
    kango_uses_ku
  )
VALUES(
    '曲',
    'きょく',
    '漢語',
    'きょく',
    NULL,
    NULL,
    1,
    0,
    0,
    1,
    0,
    1,
    0
  );
INSERT INTO
  "counter_readings" (
    counter_id,
    reading_id,
    word_origin,
    kana,
    wago_style,
    wago_custom_base,
    kango_uses_yon,
    kango_uses_yo,
    kango_uses_shi,
    kango_uses_nana,
    kango_uses_shichi,
    kango_uses_kyuu,
    kango_uses_ku
  )
VALUES(
    '缶',
    'かん',
    '漢語',
    'かん',
    'ひと(イチ)、ふた(二)',
    NULL,
    1,
    0,
    0,
    1,
    0,
    1,
    0
  );
INSERT INTO
  "counter_readings" (
    counter_id,
    reading_id,
    word_origin,
    kana,
    wago_style,
    wago_custom_base,
    kango_uses_yon,
    kango_uses_yo,
    kango_uses_shi,
    kango_uses_nana,
    kango_uses_shichi,
    kango_uses_kyuu,
    kango_uses_ku
  )
VALUES(
    '巻',
    'かん',
    '漢語',
    'かん',
    NULL,
    NULL,
    1,
    0,
    0,
    1,
    0,
    1,
    0
  );
INSERT INTO
  "counter_readings" (
    counter_id,
    reading_id,
    word_origin,
    kana,
    wago_style,
    wago_custom_base,
    kango_uses_yon,
    kango_uses_yo,
    kango_uses_shi,
    kango_uses_nana,
    kango_uses_shichi,
    kango_uses_kyuu,
    kango_uses_ku
  )
VALUES(
    '円',
    'えん',
    '漢語',
    'えん',
    NULL,
    NULL,
    1,
    0,
    0,
    1,
    0,
    1,
    0
  );
INSERT INTO
  "counter_readings" (
    counter_id,
    reading_id,
    word_origin,
    kana,
    wago_style,
    wago_custom_base,
    kango_uses_yon,
    kango_uses_yo,
    kango_uses_shi,
    kango_uses_nana,
    kango_uses_shichi,
    kango_uses_kyuu,
    kango_uses_ku
  )
VALUES(
    'ヶ国',
    'かこく',
    '漢語',
    'かこく',
    NULL,
    NULL,
    1,
    0,
    0,
    1,
    0,
    1,
    0
  );
INSERT INTO
  "counter_readings" (
    counter_id,
    reading_id,
    word_origin,
    kana,
    wago_style,
    wago_custom_base,
    kango_uses_yon,
    kango_uses_yo,
    kango_uses_shi,
    kango_uses_nana,
    kango_uses_shichi,
    kango_uses_kyuu,
    kango_uses_ku
  )
VALUES(
    'ヶ月',
    'かげつ',
    '漢語',
    'かげつ',
    NULL,
    NULL,
    1,
    0,
    0,
    1,
    0,
    1,
    0
  );
INSERT INTO
  "counter_readings" (
    counter_id,
    reading_id,
    word_origin,
    kana,
    wago_style,
    wago_custom_base,
    kango_uses_yon,
    kango_uses_yo,
    kango_uses_shi,
    kango_uses_nana,
    kango_uses_shichi,
    kango_uses_kyuu,
    kango_uses_ku
  )
VALUES(
    '歳',
    'さい',
    '漢語',
    'さい',
    NULL,
    NULL,
    1,
    0,
    0,
    1,
    0,
    1,
    0
  );
INSERT INTO
  "counter_readings" (
    counter_id,
    reading_id,
    word_origin,
    kana,
    wago_style,
    wago_custom_base,
    kango_uses_yon,
    kango_uses_yo,
    kango_uses_shi,
    kango_uses_nana,
    kango_uses_shichi,
    kango_uses_kyuu,
    kango_uses_ku
  )
VALUES(
    '階',
    'かい',
    '漢語',
    'かい',
    NULL,
    NULL,
    1,
    0,
    0,
    1,
    1,
    1,
    0
  );
INSERT INTO
  "counter_readings" (
    counter_id,
    reading_id,
    word_origin,
    kana,
    wago_style,
    wago_custom_base,
    kango_uses_yon,
    kango_uses_yo,
    kango_uses_shi,
    kango_uses_nana,
    kango_uses_shichi,
    kango_uses_kyuu,
    kango_uses_ku
  )
VALUES(
    '回',
    'かい',
    '漢語',
    'かい',
    NULL,
    NULL,
    1,
    0,
    0,
    1,
    1,
    1,
    0
  );
INSERT INTO
  "counter_readings" (
    counter_id,
    reading_id,
    word_origin,
    kana,
    wago_style,
    wago_custom_base,
    kango_uses_yon,
    kango_uses_yo,
    kango_uses_shi,
    kango_uses_nana,
    kango_uses_shichi,
    kango_uses_kyuu,
    kango_uses_ku
  )
VALUES(
    '年',
    'ねん',
    '漢語',
    'ねん',
    NULL,
    NULL,
    0,
    1,
    0,
    1,
    1,
    1,
    1
  );
INSERT INTO
  "counter_readings" (
    counter_id,
    reading_id,
    word_origin,
    kana,
    wago_style,
    wago_custom_base,
    kango_uses_yon,
    kango_uses_yo,
    kango_uses_shi,
    kango_uses_nana,
    kango_uses_shichi,
    kango_uses_kyuu,
    kango_uses_ku
  )
VALUES(
    '台',
    'だい',
    '漢語',
    'だい',
    NULL,
    NULL,
    1,
    0,
    0,
    1,
    1,
    1,
    0
  );
INSERT INTO
  "counter_readings" (
    counter_id,
    reading_id,
    word_origin,
    kana,
    wago_style,
    wago_custom_base,
    kango_uses_yon,
    kango_uses_yo,
    kango_uses_shi,
    kango_uses_nana,
    kango_uses_shichi,
    kango_uses_kyuu,
    kango_uses_ku
  )
VALUES(
    '冊',
    'さつ',
    '漢語',
    'さつ',
    NULL,
    NULL,
    1,
    0,
    0,
    1,
    1,
    1,
    0
  );
INSERT INTO
  "counter_readings" (
    counter_id,
    reading_id,
    word_origin,
    kana,
    wago_style,
    wago_custom_base,
    kango_uses_yon,
    kango_uses_yo,
    kango_uses_shi,
    kango_uses_nana,
    kango_uses_shichi,
    kango_uses_kyuu,
    kango_uses_ku
  )
VALUES(
    '羽',
    'わ',
    '和語',
    'わ',
    NULL,
    NULL,
    1,
    0,
    0,
    1,
    1,
    1,
    0
  );
INSERT INTO
  "counter_readings" (
    counter_id,
    reading_id,
    word_origin,
    kana,
    wago_style,
    wago_custom_base,
    kango_uses_yon,
    kango_uses_yo,
    kango_uses_shi,
    kango_uses_nana,
    kango_uses_shichi,
    kango_uses_kyuu,
    kango_uses_ku
  )
VALUES(
    '頭',
    'とう',
    '漢語',
    'とう',
    NULL,
    NULL,
    1,
    0,
    0,
    1,
    1,
    1,
    0
  );
INSERT INTO
  "counter_readings" (
    counter_id,
    reading_id,
    word_origin,
    kana,
    wago_style,
    wago_custom_base,
    kango_uses_yon,
    kango_uses_yo,
    kango_uses_shi,
    kango_uses_nana,
    kango_uses_shichi,
    kango_uses_kyuu,
    kango_uses_ku
  )
VALUES(
    '匹',
    'ひき',
    '和語',
    'ひき',
    NULL,
    NULL,
    1,
    0,
    0,
    1,
    1,
    1,
    0
  );
INSERT INTO
  "counter_readings" (
    counter_id,
    reading_id,
    word_origin,
    kana,
    wago_style,
    wago_custom_base,
    kango_uses_yon,
    kango_uses_yo,
    kango_uses_shi,
    kango_uses_nana,
    kango_uses_shichi,
    kango_uses_kyuu,
    kango_uses_ku
  )
VALUES(
    '枚',
    'まい',
    '漢語',
    'まい',
    NULL,
    NULL,
    1,
    0,
    0,
    1,
    1,
    1,
    0
  );
INSERT INTO
  "counter_readings" (
    counter_id,
    reading_id,
    word_origin,
    kana,
    wago_style,
    wago_custom_base,
    kango_uses_yon,
    kango_uses_yo,
    kango_uses_shi,
    kango_uses_nana,
    kango_uses_shichi,
    kango_uses_kyuu,
    kango_uses_ku
  )
VALUES(
    '時',
    'じ',
    '漢語',
    'じ',
    NULL,
    NULL,
    0,
    1,
    0,
    1,
    1,
    0,
    1
  );
INSERT INTO
  "counter_readings" (
    counter_id,
    reading_id,
    word_origin,
    kana,
    wago_style,
    wago_custom_base,
    kango_uses_yon,
    kango_uses_yo,
    kango_uses_shi,
    kango_uses_nana,
    kango_uses_shichi,
    kango_uses_kyuu,
    kango_uses_ku
  )
VALUES(
    '人',
    'にん',
    '和語',
    'にん',
    'ひと、ふた',
    'り',
    0,
    1,
    0,
    1,
    1,
    1,
    1
  );
INSERT INTO
  "counter_readings" (
    counter_id,
    reading_id,
    word_origin,
    kana,
    wago_style,
    wago_custom_base,
    kango_uses_yon,
    kango_uses_yo,
    kango_uses_shi,
    kango_uses_nana,
    kango_uses_shichi,
    kango_uses_kyuu,
    kango_uses_ku
  )
VALUES(
    '名',
    'めい',
    '漢語',
    'めい',
    NULL,
    NULL,
    1,
    0,
    0,
    1,
    0,
    1,
    0
  );
INSERT INTO
  "counter_readings" (
    counter_id,
    reading_id,
    word_origin,
    kana,
    wago_style,
    wago_custom_base,
    kango_uses_yon,
    kango_uses_yo,
    kango_uses_shi,
    kango_uses_nana,
    kango_uses_shichi,
    kango_uses_kyuu,
    kango_uses_ku
  )
VALUES(
    '分',
    'ふん',
    '漢語',
    'ふん',
    NULL,
    NULL,
    1,
    0,
    0,
    1,
    1,
    1,
    0
  );
INSERT INTO
  "counter_readings" (
    counter_id,
    reading_id,
    word_origin,
    kana,
    wago_style,
    wago_custom_base,
    kango_uses_yon,
    kango_uses_yo,
    kango_uses_shi,
    kango_uses_nana,
    kango_uses_shichi,
    kango_uses_kyuu,
    kango_uses_ku
  )
VALUES(
    '本',
    'ほん',
    '漢語',
    'ほん',
    NULL,
    NULL,
    1,
    0,
    0,
    1,
    1,
    1,
    0
  );
INSERT INTO
  "counter_readings" (
    counter_id,
    reading_id,
    word_origin,
    kana,
    wago_style,
    wago_custom_base,
    kango_uses_yon,
    kango_uses_yo,
    kango_uses_shi,
    kango_uses_nana,
    kango_uses_shichi,
    kango_uses_kyuu,
    kango_uses_ku
  )
VALUES(
    '日',
    'にち',
    '漢語',
    'にち',
    NULL,
    NULL,
    1,
    0,
    0,
    1,
    0,
    1,
    0
  );
INSERT INTO
  "counter_readings" (
    counter_id,
    reading_id,
    word_origin,
    kana,
    wago_style,
    wago_custom_base,
    kango_uses_yon,
    kango_uses_yo,
    kango_uses_shi,
    kango_uses_nana,
    kango_uses_shichi,
    kango_uses_kyuu,
    kango_uses_ku
  )
VALUES(
    '杯',
    'はい',
    '漢語',
    'はい',
    NULL,
    NULL,
    1,
    0,
    0,
    1,
    0,
    1,
    0
  );
INSERT INTO
  "counter_readings" (
    counter_id,
    reading_id,
    word_origin,
    kana,
    wago_style,
    wago_custom_base,
    kango_uses_yon,
    kango_uses_yo,
    kango_uses_shi,
    kango_uses_nana,
    kango_uses_shichi,
    kango_uses_kyuu,
    kango_uses_ku
  )
VALUES(
    '株',
    'かぶ',
    '和語',
    'かぶ',
    'ひと、ふた',
    NULL,
    1,
    0,
    0,
    1,
    0,
    1,
    0
  );
INSERT INTO
  "counter_readings" (
    counter_id,
    reading_id,
    word_origin,
    kana,
    wago_style,
    wago_custom_base,
    kango_uses_yon,
    kango_uses_yo,
    kango_uses_shi,
    kango_uses_nana,
    kango_uses_shichi,
    kango_uses_kyuu,
    kango_uses_ku
  )
VALUES(
    '振り',
    'ふり',
    '和語',
    'ふり',
    'ひと、ふた',
    NULL,
    1,
    0,
    0,
    1,
    0,
    1,
    0
  );
COMMIT;