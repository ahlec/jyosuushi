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
INSERT INTO
  "counter_disambiguations" (counter1_id, counter2_id, distinction)
VALUES(
    '戦',
    '試合',
    'Both {試合}^(しあい)　and {戦}^(せん) can be used to count sports matches/sports games. For the prototypical sports, such as baseball or basketball, these can be used interchangeably. However, some sport matches cannot be counted with {試合}^(しあい), most noteably racing competitions, board game matches (such as Go or Shogi), and sports where individual compete without direct opponents (such as figure skating).[^thesis-shiai] On the other hand, {戦}^(せん) is able to be used for most games and matches, but not all; games that are performed without the purpose of declaring a winner/loser (such as exhibition matches or practice games) would use {試合}^(しあい) instead.[^thesis-sen]

Additionally, though it does not reflect a difference in meaning between the two counters, {戦}^(せん) is used ordinally ({第１戦}^(だいいっせん), {３戦目}^(さんせんめ)) significantly more than {試合}^(しあい).[^thesis-ordinal]

[^thesis-shiai]: [近現代日本語における新たな助数詞の成立と定着](http://hdl.handle.net/2241/00128666): 「-試合」は〚囲碁・将棋〛（「対局」）や〚相撲〛（「取組」）、〚競馬〛〚F1〛（「レース」）など、その勝負を「試合」以外の名詞で指示する競技には用いることができない。また、「互いに相手に対して何かをする」という意味と馴染まない〚フィギュアスケート〛のような競技には用いにくい。(p. 105)
[^thesis-sen]: [近現代日本語における新たな助数詞の成立と定着](http://hdl.handle.net/2241/00128666): 「-戦」は、文脈上、勝敗を決することを目的としないことが含意されると用いにくくなる。(p. 105)
[^thesis-ordinal]: [近現代日本語における新たな助数詞の成立と定着](http://hdl.handle.net/2241/00128666): 〔表 5-1〕から「-試合」は数量を表す際に、「-戦」は順序を表す際によく用いられていることがわかる。しかし、このような差異は 2 つの助数詞の使用傾向の一端を表すものではあるが、意味的な違いを表すものではないと考えられる。 (p. 91-92)
'
  );
INSERT INTO
  "counter_disambiguations" (counter1_id, counter2_id, distinction)
VALUES(
    '口',
    '杯',
    'While liquids to be drunk can both be counted with {杯}^(はい) and {口}^(くち), these two are not interchangeable. {杯}^(はい) refers to the glass as a whole, as in "a glass of water" or "two cups of juice." {口}^(くち), meanwhile, refers to a single sip of a drink -- "a sip of water" or "two sips of juice."'
  );
INSERT INTO
  "counter_disambiguations" (counter1_id, counter2_id, distinction)
VALUES(
    '口',
    '本',
    'Both {口}^(くち) and {本}^(ほん) can be used to count swords. The difference here is that {本}^(ほん) is primarily used when speaking, whereas {口}^(くち) is used exclusively in writing.[^chiebukuro-swords]

The media will usually used {本}^(ほん) to count swords.[^usage]

[^chiebukuro-swords]: [刀の数え方を教えて下さい。](https://detail.chiebukuro.yahoo.co.jp/qa/question_detail/q11100671126): 口語なら振り、本。書き言葉なら腰、口。
[^usage]: [日本刀の数え方](https://oshiete.goo.ne.jp/qa/815510.html#an2540582): マスメディアでは基本的に「本」と言っているようですね。'
  );
COMMIT;