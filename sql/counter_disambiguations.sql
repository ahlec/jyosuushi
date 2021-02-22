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
INSERT INTO
  "counter_disambiguations" (counter1_id, counter2_id, distinction)
VALUES(
    '切れ',
    '口',
    'Since we often cut things into smaller, bite-size pieces, the distinction between {切れ}^(きれ) and {口}^(くち) can often feel blurry. {切れ}^(きれ) is used to count slices of something, whereas {口}^(くち) is used to count single bites of food. A good example is watermelon. A single slice of watermelon is counted as {一切れ}^(ひときれ), though it will certainly be more than one bite to eat.[^suika]

[^suika]: [カットしたスイカの数え方・単位は？](https://www.seikatu-cb.com/kazoe/suika.html#a04): 食べやすいようにカットしたスイカを数えるときは一切れ、二切れと数えます。'
  );
INSERT INTO
  "counter_disambiguations" (counter1_id, counter2_id, distinction)
VALUES(
    '冊',
    '巻',
    'Both {冊}^(さつ) and {巻}^(かん) can be used to count books, though their usages differ. Today, {巻}^(かん) would be used primarily to count individual books within a continuation -- be that a single story/collection split across multiple volumes, or a series (such as manga).[^kann-continuation] This can be seen with phrases like 「 {全７巻}^(ぜんななかん
)の{事典}^(じてん)」(lit. seven-volume encyclopedia) or, used ordinally, {第一巻}^(だいいっかん) (the first volume in a series). {巻}^(かん) would therefore be limited to when you are counting things from the same continuation, but wouldn''t be used to count things from separate collections.

{冊}^(さつ) meanwhile is more around counting the book itself. It can be used to count books from the same collection or from multiple separate collections. Like {巻}^(かん), it _can_ be used in phrases like 「 {全７冊}^(ぜんななさつ)の{事典}^(じてん)」, but it _cannot_ be used with ordinal numbers to refer to a particular issue in a series.[^interchangeable]

[^kann-continuation]: [巻と冊の違い](http://www.st38.net/sukkiri-chigai/z0186.html): 巻は数冊でひとまとまりになる書物のひとつずつを表すときにも使われる。例えば、「これは全１２巻の小説だ」などという時である。
[^interchangeable]: [巻と冊の違い](http://www.st38.net/sukkiri-chigai/z0186.html): 例えば、「これは全１２巻の小説だ」などという時である。この場合、「全１２冊」と冊を使って言うこともできる。しかし、「この本は人気シリーズ漫画の第５巻だ」のようにシリーズの何番目にあたる書籍なのか、という序数で示すときには巻を使うが、冊に置き換えて使うことはできない。'
  );
INSERT INTO
  "counter_disambiguations" (counter1_id, counter2_id, distinction)
VALUES(
    '冊',
    '部',
    '{冊}^(さつ) and {部}^(ぶ) can both be used to count books, but the context of when you''d use one over the other differentiates them. {冊}^(さつ) would typically be used to count the books themselves, their physical form[^satsu-physical-form] -- the thing that a person buys and reads.[^thing-people-read] This would be used to count the books on your shelves or your tables. {部}^(ぶ), meanwhile, is used more to refer to the production of the books. {部}^(ぶ) is used to count the number of copies of a book that have been published by the publisher or the number of copies printed at a print shop.[^bu-usage] While this latter counter is more of an industry term, this will nevertheless be seen publicly when talking about the success a book has seen ("This book has sold over 50,000 copies").

[^satsu-physical-form]: [# 本を数える単位は「冊」？「部」？](https://detail.chiebukuro.yahoo.co.jp/qa/question_detail/q1430706134): 本を物体として数えるなら「冊」で、本を発行物として数えるなら「部」です。
[^thing-people-read]: [冊と部の違い](http://naniga-chigauno.st042.net/z230.html): 冊とは、本の数を数える時の助数詞で、主に個人が買ったり読んだりする本の数を示す時に使う。
[^bu-usage]: [冊と部の違い](http://naniga-chigauno.st042.net/z230.html): 一方部とは、こちらも書籍、本の数を数える時の助数詞であるが、冊とは違って、主に出版社が発行した本の数や、印刷所が印刷した本の数等を表す時に使う。'
  );
COMMIT;