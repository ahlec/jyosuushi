PRAGMA foreign_keys = OFF;
BEGIN TRANSACTION;
CREATE TABLE counter_dictionary_entries (
  entry_id INTEGER PRIMARY KEY AUTOINCREMENT,
  counter_id STRING NOT NULL REFERENCES counters (counter_id),
  sort_order INTEGER,
  direct_link STRING NOT NULL,
  japanese TEXT NOT NULL,
  translation TEXT NOT NULL
);
INSERT INTO
  "counter_dictionary_entries" (
    entry_id,
    counter_id,
    sort_order,
    direct_link,
    japanese,
    translation
  )
VALUES(
    1,
    '人',
    NULL,
    'https://dictionary.goo.ne.jp/word/%E4%BA%BA_%28%E3%81%AB%E3%82%93%29/',
    '［接尾］助数詞。人数を数えるのに用いる。「五人」「七人」',
    '[Suffix] Counter. Used to count the number of people.'
  );
INSERT INTO
  "counter_dictionary_entries" (
    entry_id,
    counter_id,
    sort_order,
    direct_link,
    japanese,
    translation
  )
VALUES(
    2,
    '名',
    NULL,
    'https://dictionary.goo.ne.jp/word/%E5%90%8D_%28%E3%82%81%E3%81%84%29/',
    '［接尾］助数詞。人数を数えるのに用いる。「40名」',
    '[Suffix] Counter. Used to count the number of people.'
  );
INSERT INTO
  "counter_dictionary_entries" (
    entry_id,
    counter_id,
    sort_order,
    direct_link,
    japanese,
    translation
  )
VALUES(
    3,
    '時',
    NULL,
    'https://dictionary.goo.ne.jp/word/%E6%99%82_%28%E3%81%98%29/',
    '［接尾］助数詞。時刻を表すのに用いる。「七時」',
    '[Suffix] Counter. Used to express moments in time. "7 o''clock"'
  );
INSERT INTO
  "counter_dictionary_entries" (
    entry_id,
    counter_id,
    sort_order,
    direct_link,
    japanese,
    translation
  )
VALUES(
    4,
    '枚',
    NULL,
    'https://dictionary.goo.ne.jp/word/%E6%9E%9A_%28%E3%81%BE%E3%81%84%29/',
    '［接尾］助数詞。
１ 紙・板・皿などの薄く平たいものを数えるのに用いる。「二、三枚の紙」

２ 原稿用紙の数を数えるのに用いる。ふつう400字詰めの原稿用紙を単位として数える。「五枚ほどの随筆」

３ 魚を数えるのに用いる。「ヘラブナを三枚釣り上げる」

４ 相撲で、その階級の人数を数えるのに用いる。「幕内を二枚ふやす」

５ 相撲の番付で、席次を数えるのに用いる。「三枚上がる」

６ 田や畑などの一区画を数えるのに用いる。「田一枚を植える」

７ 浄瑠璃・長唄で、太夫や唄方の人数を数えるのに用いる。「二挺 (ちょう) 三枚」

８ 近世の大判金・丁銀や近代の貨幣・銀貨など、貨幣の数を数えるのに用いる。「銀三拾枚」

９ 駕籠舁 (かごかき) の人数を数えるのに用いる。

「大坂より四―肩は二十四匁の定まり」〈浮・諸艶大鑑・六〉',
    '[Suffix] Counter.
1. Used to count thin, flat objects such as paper, boards, and plates.
2. Used to count Japanese writing paper. Typically, this unit will represent a paper with 400 characters written on it.
3. Used to count fish.
4. In sumo wrestling, used to count the number of people at a particular rank.
5. In sumo wrestling, used to count seat ranking.
6. Used to count sections (areas) within rice paddies, agricultural plots, or the like.
7. In some traditional Japanese performances, used to count the number of actors or musicians.
8. When discussing monetary coins from the early modern (Edo) era or later, used to count the amount of money.
9. Used to count the number of people carrying a palanquin.'
  );
INSERT INTO
  "counter_dictionary_entries" (
    entry_id,
    counter_id,
    sort_order,
    direct_link,
    japanese,
    translation
  )
VALUES(
    5,
    '匹',
    NULL,
    'https://dictionary.goo.ne.jp/word/%E5%8C%B9_%28%E3%81%B2%E3%81%8D%29/',
    '［接尾］助数詞。動物・鳥・昆虫・魚などを数えるのに用いる。上に来る語によっては「びき」「ぴき」となる。「2―の猫」',
    '[Suffix] Counter. Used to count animals, birds, insects, and fish. Depending on the preceding word, this can come 「びき」 or 「ぴき」.'
  );
INSERT INTO
  "counter_dictionary_entries" (
    entry_id,
    counter_id,
    sort_order,
    direct_link,
    japanese,
    translation
  )
VALUES(
    6,
    '頭',
    NULL,
    'https://dictionary.goo.ne.jp/word/%E9%A0%AD_%28%E3%81%A8%E3%81%86%29/',
    '［接尾］牛・馬・犬などの動物を数えるのに用いる。「牛七頭」',
    '[Suffix] Used to count animals such as cows, horses, or dogs.'
  );
INSERT INTO
  "counter_dictionary_entries" (
    entry_id,
    counter_id,
    sort_order,
    direct_link,
    japanese,
    translation
  )
VALUES(
    7,
    '羽',
    NULL,
    'https://dictionary.goo.ne.jp/word/%E7%BE%BD_%28%E3%82%8F%29/',
    '［接尾］助数詞。鳥やウサギを数えるのに用いる。「一羽」「二羽」
[補説]上に来る数詞の末音によって、「ば（三羽）」または「ぱ（六羽・八羽）」ともなる。',
    '[Suffix] Counter. Used to count birds and rabbits.
[Notes] Depending on the final sound of the preceding word, this can become 「ば」 or 「ぱ」.'
  );
INSERT INTO
  "counter_dictionary_entries" (
    entry_id,
    counter_id,
    sort_order,
    direct_link,
    japanese,
    translation
  )
VALUES(
    8,
    '冊',
    NULL,
    'https://dictionary.goo.ne.jp/word/%E5%86%8A_%28%E3%81%95%E3%81%A4%29/',
    '［接尾］助数詞。書物などを数えるのに用いる。「雑誌二、三冊」',
    '[Suffix] Counter. Used to count things such as books.'
  );
INSERT INTO
  "counter_dictionary_entries" (
    entry_id,
    counter_id,
    sort_order,
    direct_link,
    japanese,
    translation
  )
VALUES(
    9,
    '台',
    NULL,
    'https://dictionary.goo.ne.jp/word/%E5%8F%B0_%28%E3%81%A0%E3%81%84%29/',
    '［接尾］助数詞。
１ 車両や機械などを数えるのに用いる。「計算機3台」

２ 年齢や値段などのおおよその範囲を表すのに用いる。「20歳台で父を失う」「1ドルが100円台になる」

３ 印刷や製本で16ページ分あるいは32ページ分などを1台として、その数を数えるのに用いる。折 (おり) 。「16台256ページの本」',
    '[Suffix] Counter.
1. Used to count things such as machines and vehicles.
2. Used to express rough ranges of ages or price. "I parted ways with my dad when I was around 20." or "1 dollar is something like ¥100."
3. In printing and publishing, used to count sections of either 16- or 32-pages. "This 16台 book has 256 pages."'
  );
INSERT INTO
  "counter_dictionary_entries" (
    entry_id,
    counter_id,
    sort_order,
    direct_link,
    japanese,
    translation
  )
VALUES(
    10,
    '年',
    NULL,
    'https://dictionary.goo.ne.jp/word/%E5%B9%B4_%28%E3%81%AD%E3%82%93%29/',
    '［接尾］助数詞。
１ 年号・年数を表すのに用いる。「平成七年」「西暦一九九五年」

２ 年齢・学年を表すのに用いる。「人生五〇年」「五年に進級」',
    '[Suffix] Counter.
1. Used to express a year explicitly or an amount of years. "Heisei 7" "1995 (Gregorian)"
2. Used to express age (in years) or school grade. "50 years old" "Graduated to fifth grade."'
  );
COMMIT;