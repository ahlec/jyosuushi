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
    11,
    '本',
    NULL,
    'https://dictionary.goo.ne.jp/word/%E6%9C%AC_%28%E3%81%BB%E3%82%93%29/',
    '［接尾］助数詞。漢語の数詞に付く。上に来る語によっては「ぼん」「ぽん」となる。
１ 長い物、細長い棒状のものなどを数えるのに用いる。「鉛筆五本」「二本の道路」

２ 剣道や柔道などで、技 (わざ) の数を数えるのに用いる。「二本を先取する」

３ 映画の作品の数を数えるのに用いる。「主演作五本」',
    '[Suffix] Counter. Used in conjunction with the Chinese numbering system. Depending on the preceding word, can become either 「ぼん」 or 「ぽん」.
1. Used to count long items or long, thin cylindrical items. "5 pencils" or "2 roads"
2. In Kendo and Judo, used to count the number of moves.
3. Used to count the number of movies (as in: video, cinema).'
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
    12,
    '回',
    NULL,
    'https://dictionary.goo.ne.jp/word/%E5%9B%9E_%28%E3%81%8B%E3%81%84%29/',
    '［接尾］助数詞。数または順序を表す語に付いて、度数または順序を表すのに用いる。「七回裏」「次回」',
    '[Suffix] Counter. When following a number or a word expressive a relative order, used to express the number of times or an order. "Bottom of the seventh (baseball)" "Next time."'
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
    13,
    '階',
    NULL,
    'https://dictionary.goo.ne.jp/word/%E9%9A%8E_%28%E3%81%8B%E3%81%84%29/',
    '［接尾］助数詞。
１ 建築物の層を数えるのに用いる。「35階建てのビル」

２ 位階の等級を数えるのに用いる。

「一―こえて、内侍督 (ないしのかみ) 三位の加階し給ふ」〈宇津保・蔵開下〉',
    '[Suffix] Counter.
1. Used to count the number of storeys in a building. "A 35-storey building."
2. Used to count ranks in a court (imperial).'
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
    14,
    '歳',
    NULL,
    'https://dictionary.goo.ne.jp/word/%E6%AD%B3/',
    '［接尾］助数詞。年齢・年数を数えるのに用いる。「三歳」「満五歳」',
    '[Suffix] Counter. Used to count age or number of years.'
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
    15,
    'ヶ月',
    NULL,
    'https://dictionary.goo.ne.jp/word/%E7%AE%87%E6%9C%88/',
    '［接尾］助数詞。月数を数えるのに用いる。「数―」「三―間 (かん) 」',
    '[Suffix] Counter. Used to count the number of months. "A few months" "A three month period"'
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
    16,
    '巻',
    NULL,
    'https://dictionary.goo.ne.jp/word/%E5%B7%BB_%28%E3%81%8B%E3%82%93%29/',
    '［接尾］助数詞。
１ 書籍の冊数をかぞえるのに用いる。「全3巻の書物」

２ 巻物やテープ、フィルムなどの数をかぞえるのに用いる。「巻物3巻」「フィルム5巻」',
    '[Suffix] Counter.
1. Used to count the number of books in a publication. "A book in three parts."
2. Used to count things such as scrolls, rolls of tape, or rolls of film. "Three scrolls" "Five rolls of film."'
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
    17,
    '色',
    NULL,
    'https://dictionary.goo.ne.jp/word/%E3%81%97%E3%82%87%E3%81%8F/#jn-110841',
    '［接尾］

１ 助数詞。色数 (いろかず) を数えるのに用いる。「三色かけ合わせ」「二四色の色鉛筆」「三色刷り」
',
    '[Suffix]
1. Counter. Used to count the number of colours.'
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
    18,
    '軒',
    NULL,
    'https://dictionary.goo.ne.jp/word/%E8%BB%92_%28%E3%81%91%E3%82%93%29/',
    '［接尾］

１ 助数詞。家屋の数をかぞえるのに用いる。「三軒」「数千軒」',
    '[Suffix]
1. Counter. Used to count the number of houses (residences). "Three units (eg apartments)" "Thousands of houses"'
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
    19,
    '組',
    NULL,
    'https://dictionary.goo.ne.jp/word/%E7%B5%84/',
    '［接尾］助数詞。いくつかが集まってひとそろいになっているものを数える。「コーヒー茶碗一 (ひと) 組み」「二 (ふた) 組みの夫婦」',
    '[Suffix] Counter. Used to count groups of individual things that have been brought together and are considered as one. "One coffee cup (likely indicating not just the cup but the saucer beneath it as well)" "Two husband-wife teams."'
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
    20,
    '切れ',
    NULL,
    'https://dictionary.goo.ne.jp/word/%E5%88%87%E3%82%8C_%28%E3%81%8D%E3%82%8C%29/',
    '［接尾］助数詞。
１ 切ったものを数えるのに用いる。「たくあん一切れ」「ようかん二切れ」

２ 江戸時代、一分金を数えるのに用いる。

「白銀五百匁二包み、小判二十五両一歩合わせて四十―」〈浄・二枚絵草紙〉',
    '[Suffix] Counter.
1. Used to count things that have been cut. "One slice of Takuan (pickled Daikon radish)." "Two slices of Youkan (sweet bean jelly)."
2. In the Edo period, used to count Ichibukin (a type of gold coin).'
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
    21,
    '皿',
    NULL,
    'https://dictionary.goo.ne.jp/word/%E7%9A%BF/',
    '［接尾］助数詞。皿に盛った食物や料理などの数を数えるのに用いる。「カレーライス二―」「炒 (いた) め物三―」',
    '[Suffix] Counter. Used to count the quantity of food served on a plate. "Two plates of curry rice." "Three plates of stir-fry."'
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
    22,
    '席',
    NULL,
    'https://dictionary.goo.ne.jp/word/%E5%B8%AD/',
    '［接尾］助数詞。順位を表すのに用いる。「第一席」',
    '[Suffix] Counter. Used to express order/rank. "First seat (eg, violin)"'
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
    23,
    '口',
    NULL,
    'https://dictionary.goo.ne.jp/word/%E5%8F%A3_%28%E3%81%8F%E3%81%A1%29/',
    '［接尾］助数詞。
１ 刀剣などを数えるのに用いる。「脇差し数口」

２ ものを食べる回数をいうのに用いる。「ひと口食べる」

３ 寄付や出費などの分担の単位として用いる。「ひと口一万円の寄付金」',
    '[Suffix] Counter.
1. Used to count swords and daggers. "A couple Wakizashi (short swords)"
2. Used to count the number of times that something has been eaten. "I''ll have one bite."
3. When talking about donations, expenses, or similar things, used as a unit to talk about shares of money. "Donations of ¥10,000 per share."'
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
    24,
    '校',
    NULL,
    'https://dictionary.goo.ne.jp/word/%E6%A0%A1/',
    '{1} ［名］
1. 学校。<「わが校」>
2. 書物の文字の誤りを調べ正すこと。校正。<「校を重ねる」>

{2} ［接尾］助数詞。校正の回数を数えるのに用いる。<「初校」><「再校」><「三校」>',
    '{1} Noun

1. School. <"Our school">
2. To look for and correct mistakes in the characters of documents. Proofreading. <"To proofread again and again">

{2} [Suffix] Counter. Used to count the number of proofs[^1]. <"First proof">, <"Second proof">, <"Third proof">

[^1]: Proofs in the printing sense. From [Merriam Webster](https://www.merriam-webster.com/dictionary/proof): _a copy (as of typeset text) made for examination or correction.'
  );
COMMIT;