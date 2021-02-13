PRAGMA foreign_keys = OFF;
BEGIN TRANSACTION;
CREATE TABLE counters (
  counter_id STRING PRIMARY KEY,
  english_name STRING NOT NULL,
  lead_in STRING,
  notes TEXT,
  primary_kanji STRING
);
INSERT INTO
  "counters" (
    counter_id,
    english_name,
    lead_in,
    notes,
    primary_kanji
  )
VALUES('日', 'days of the month', NULL, NULL, '日');
INSERT INTO
  "counters" (
    counter_id,
    english_name,
    lead_in,
    notes,
    primary_kanji
  )
VALUES(
    '本',
    'long, thin objects',
    'A highly versatile counter used primarily to count long, thin (usually cylindrical) objects.',
    '{本}^(ほん) is a highly versatile character that assumes many meanings. Most commonly used as a noun, it is the most basic and common word for "book." Additionally, {本}^(ほん) can also mean "origin" ; the most noteworthy example of which is {日本}^(にほん), the name for Japan itself, which was given the kanji due to sitting to the east of China and therefore being the "land of the sun''s origin" each morning). And finally, as a noun {本}^(ほん) can mean "real" or "true," which is why you will find it used in words like {本当}^(ほんとう) ("truth") or {本物}^(ほんもの) ("genuine article"). As a prefix to a noun, it can be used in a "speak-of-the-devil" way, applied to the thing you were just talking about (for example, {本人}^(ほんにん) means "the person in question," or the person we were talking about); it can also be used as a prefix to indicate "today" in the same meaning as {本日}^(ほんじつ), to qualify that the noun (such as a time of day) was today.

{本}^(ほん) similarly has a number of usages as a counter, but the most important thing to get out of the way is: **{本}^(ほん) as a counter is not used to count any of the things that {本}^(ほん) as a noun describes.** As a counter, {本}^(ほん) is most usually used to count long, thin (usually cylindrical) objects. Beyond that, dictionaries will list other, localized usages:
* It can be used to count movie reels and cassette tapes;
* In judo and kendo, it is used to count to count points;
* In falconry (falcon hunting), it is used to count falcons.

The most common items for this counter are long, skinny objects. These can be in many forms: bottles, pens, trees, walking canes, architectural columns, kitchen knives. Buildings counted with {本}^(ほん) highlight the fact that the building would be considerably taller than it is wide. Rivers, being by their nature significantly longer in length than they are in width, will usually be counted with {本}^(ほん). The magic ratio is that objects whose length is twice its width or more (1:2, width-to-length) will usually be counted with {本}^(ほん), while objects with a smaller ratio will be counted with other counters.[^1]

So, why are books counted with <counter:冊> instead of {本}^(ほん)? In pre-modern Japan before the invention of paper, writing was done on thin boards of wood or bamboo that were bound together with cord.[^2] Books made in this traditional style of Japanese bookbinding were known as {冊子}^(さっし); the legacy of this is seen today by the continued counting of all books (regardless of style) using <counter:冊>. The meaning of "book" was a much later association with {本}^(ほん). So, how _did_ {本}^(ほん) come to mean "book," then? Before the printing press, books were produced by copying them by hand. When copying by hand, the source materials that were being reproduced were referred to as {本}^(もと) (lit. origin, source).[^3] Over time, this generalization that the character 本 referred to documents or books became widespread and the character adopted a new meaning.

While {本}^(ほん) uses only {漢語}^(かんご) (Chinese-style) readings for the numbers, you''ll need to be careful as certain number-counter combinations contain sound changes; 「ほ」 will become 「ぼ」 or even 「ぽ」 depending on the number affixed to it. Luckily, this pattern of sound change is seen with many other counters as well, and once learned, the pattern can be expected. See the chart below for details.

The central feature to {本}^(ほん) as a counter is the image of something long and skinny. This provides a specific image to listeners when it is used. For example, buildings can be counted with a number of other counters, such as <counter:軒>; by choosing to refer to buildings with {本}^(ほん), you paint a picture of the building being quite tall, or very narrow. Similarly, choosing to _not_ use {本}^(ほん) to count items typically counted with {本}^(ほん) can carry meaning. By counting pencils with <counter:個>, you are describing pencils which are very short or _very_ thick.

[^1]: 「数え方の辞典」飯田 朝子　（出版：小学館）
[^2]: [Chiebukuro](https://detail.chiebukuro.yahoo.co.jp/qa/question_detail/q108182870): 昔、まだ紙が発明されていなかった頃は、人々は木や竹を細長い板状（冊、さく）にして、それに字を書いて、ヒモで編んで書物にしたよ。その、「冊」から来た数え方だよ。
[^3]: [出版 TIMES](https://kagiroi.com/publishing-times/7464/): 印刷技術が発達する以前、経典など貴重な書籍・書物は、すべて手で「書写」され、複製していました。その **「書写」のときに、「お手本」になるものを「もと（本）」と呼び**、その流れで「本」＝「書籍、書物」という概念が一般化したようです。',
    '本'
  );
INSERT INTO
  "counters" (
    counter_id,
    english_name,
    lead_in,
    notes,
    primary_kanji
  )
VALUES('分', 'minutes', NULL, NULL, '分');
INSERT INTO
  "counters" (
    counter_id,
    english_name,
    lead_in,
    notes,
    primary_kanji
  )
VALUES(
    '名',
    'people',
    'A situational counter for people, used in formal scenarios.',
    NULL,
    '名'
  );
INSERT INTO
  "counters" (
    counter_id,
    english_name,
    lead_in,
    notes,
    primary_kanji
  )
VALUES(
    '人',
    'people',
    'The ubiquitous counter for people and humanoids.',
    'As a noun, {人}^(ひと) is the Japanese word for "human." When used as a nominal suffix, **{人}^(にん)** will indicate the person who performs an action or is associated with some duty (for example, {商人}^(しょうにん) (shopkeeper) is a combination of {商}^(しょう) (store) and {人}^(にん)). Therefore, as a counter, this is _the_ literal counter for people; it is also the most commonly-used counter for people.

Unfortunately, as one of the first counters learned by beginners, it''s also one of the first introductions to variations from the general pattern. {人}^(にん) uses {和語}^(わご) (native Japanese language) counting for both "one person" and "two people," and the counter (normally read as にん) is instead read as **たり**. Originally, 1-10 were all written with たり: みったり (3), よったり (4), いつたり (5), and so on.[^1] This lasted until the Meiji era,[^2] with many native Japanese recalling memories of their grandparents born in the Meiji era (1868-1912) using みったり and よったり, among other now-defunct {和語}^(わご) words.[^3] However, over time these native Japanese readings were replaced by their {漢語}^(かんご) (Chinese language) counterpart readings. Only ひとり and ふたり, which were both already so prevalent in the everyday Japanese, survived.

To further confuse learners, "one person" is read as **ひとり** rather than the expected ひとたり. The root {和語}^(わご) counter here is still read as たり. However, when speaking it can be a tongue-twister to say ひとたり. The sounds were simply blended together in order to make it easier to say when speaking.[^4]

{人}^(にん) is most often used for talking about humans. It _can_ also be used to count non-humans humanoids (such as angels or robots) or animals, with the intent of humanizing them (either out of respect or to highlight some human-like behaviour or appearance in the animal). Some people will count their pets with {人}^(にん), elevating them to be equal members of the family;[^5] likewise, researchers working with intelligent primates like gorillas will count them using {人}^(にん) to show respect. 

[^1]: [人の数え方，「ひとり」「ふたり」の次は？／日本書紀より](http://www.kennya.jp/kotenn/hitono-kazoekat/): これが，奈良時代に完成した日本最古の勅撰の正史である『日本書紀』では，読み方が違うのです。
[^2]: [津原 泰水](https://twitter.com/tsuharayasumi/status/1035012517615943680): 日本語に余りにも頻出するひとりふたりが残存したのみ。みたり、よたり（よったり）、いつたり（いったり）、むゆたり……で明治頃までは通じた。
[^3]: [Reply to 津原 泰水](https://twitter.com/nemototakako/status/1035369345864663041): 祖母(明治45年生まれ)が三人、四人のことを「みったり」「よったり」と言っていました。
[^4]: [Chiebukuro](https://detail.chiebukuro.yahoo.co.jp/qa/question_detail/q1493388379):「ひとり」が「とり」になるのを簡単に言えは言いにくいためからきた習慣。（一人はHITARIのAがOに変化、五人も「いつたり」でなく「いくたり」と変化しています。）
[^5]: [矢吹町の公式サイト](http://www.town.yabuki.fukushima.jp/page/page003590.html): また、ペットの数え方ですが、ペットは、家族のように大切なことから「犬一匹」、「猫一匹」とは言わず、例えば年賀状などに「新しい家族が一人増えました」と、「人」を使い、人間と同じ扱いをしていることもある。同様に、チンパンジー・ゴリラでも、研究者たちは往々にして「彼」、「彼女」と表現し、人間同様に「一人、二人」と数えられている。',
    '人'
  );
INSERT INTO
  "counters" (
    counter_id,
    english_name,
    lead_in,
    notes,
    primary_kanji
  )
VALUES('時', 'hours', NULL, NULL, '時');
INSERT INTO
  "counters" (
    counter_id,
    english_name,
    lead_in,
    notes,
    primary_kanji
  )
VALUES('枚', 'flat objects', NULL, NULL, '枚');
INSERT INTO
  "counters" (
    counter_id,
    english_name,
    lead_in,
    notes,
    primary_kanji
  )
VALUES('匹', 'small animals', NULL, NULL, '匹');
INSERT INTO
  "counters" (
    counter_id,
    english_name,
    lead_in,
    notes,
    primary_kanji
  )
VALUES('頭', 'large animals', NULL, NULL, '頭');
INSERT INTO
  "counters" (
    counter_id,
    english_name,
    lead_in,
    notes,
    primary_kanji
  )
VALUES('羽', 'birds and rabbits', NULL, NULL, '羽');
INSERT INTO
  "counters" (
    counter_id,
    english_name,
    lead_in,
    notes,
    primary_kanji
  )
VALUES(
    '冊',
    'books',
    'The primary common-use counter for books.',
    '{冊}^(さつ) exists solely in the dictionary as a counter, dedicated specifically to counting books, magazines, journals, and the like. In its most literal definition, this counter is used for any object that is a bound collection of papers. However, don''t let that technicality over complicate things much -- this is the counter for books.

The first question on everybody''s mind when encountering this counter will be the same: why are books ({本}^(ほん)) not counted with <counter:本>? Prior to the invention of paper, there was not a large corpus of writing in the Japanese language.[^why-no-chikukan] In China, however, pre-paper writing was done on {竹簡}^(ちくかん) -- small, thin, flat bamboo rods just a few centimeters thick and bound together by string.

![竹簡, pre-paper ancient Chinese books](./chikukan-冊1.jpg)

It is from the appearance of the {竹簡}^(ちくかん) that the character 冊 was made.[^satsu-kanji-origin] Following the invention of paper, bookmaking in Japan followed two pathways: scrolls ({巻子本}^(かんすぼん)) and books ({冊子}^(そうし)). The link between {本}^(ほん) and "book" is an association that came later on. 本 as a character carries a meaning of "origin," and when books were copied by hand, the source materials were referred to as {本}^(もと) (lit. origin).[^hon-association] Over time, the link became widespread and entered the Japanese language with a new meaning.

[^why-no-chikukan]: 冨谷 至著『木簡・竹簡の語る中国古代』「竹簡は、中国で紙の発明される以前につかわれた書写材料であり、日本に文字が大量に伝わった時代には、すでに中国には紙があった」([citation](https://blog.goo.ne.jp/ishiseiji/e/0545ff49e2019de318f355db2c329976))
[^satsu-kanji-origin]: [世界史の窓](https://www.y-history.net/appendix/wh0203-072_1.html): 木簡・竹簡は木または竹を薄く短冊状にしてひもでつなげ、文字を書いた。それをつなげた形から作られた象形文字が「冊」である。
[^hon-association]: [出版 TIMES](https://kagiroi.com/publishing-times/7464/): 印刷技術が発達する以前、経典など貴重な書籍・書物は、すべて手で「書写」され、複製していました。その「書写」のときに、「お手本」になるものを「もと（本）」と呼び、その流れで「本」＝「書籍、書物」という概念が一般化したようです。',
    '冊'
  );
INSERT INTO
  "counters" (
    counter_id,
    english_name,
    lead_in,
    notes,
    primary_kanji
  )
VALUES(
    '台',
    'machines and large objects',
    NULL,
    NULL,
    '台'
  );
INSERT INTO
  "counters" (
    counter_id,
    english_name,
    lead_in,
    notes,
    primary_kanji
  )
VALUES('年', 'years', NULL, NULL, '年');
INSERT INTO
  "counters" (
    counter_id,
    english_name,
    lead_in,
    notes,
    primary_kanji
  )
VALUES('回', 'times (occurrences)', NULL, NULL, '回');
INSERT INTO
  "counters" (
    counter_id,
    english_name,
    lead_in,
    notes,
    primary_kanji
  )
VALUES('階', 'floors', NULL, NULL, '階');
INSERT INTO
  "counters" (
    counter_id,
    english_name,
    lead_in,
    notes,
    primary_kanji
  )
VALUES(
    '歳',
    'age',
    'The counter for expressing age in years, and thus the primary "age" counter.',
    '
歳 is a very focused kanji that has one primary meaning: year. As a counter, {歳}^(さい) is laser-focused, only being used to count age in years. And while 歳 is technically an uncommon alternate kanji for {年}^(とし) (noun: year), 歳 is not usually a word that stands on its own. It can be found as part of other words, such as {歳計}^(さいけい) (annual government-provided stipend) or {歳首}^(さいしゅ) (beginning of the year). While it''s technically the case that {歳星}^(さいせい) is an uncommon name for Jupiter, in all cases where you''re not working with ancient Chinese astrology, 歳 meaning years is appropriate.

*However*, 歳 is not the only kanji that represents this counter. Enter: {才}^(さい) (same reading). Though the counter has two distinct kanji, the meaning of the counter does not change: 17{歳}^(さい) is the same as 17{才}^(さい) (17 years old). The difference is all about complexity. The kanji 歳 is written with 13 strokes; 才 is only three. While 歳 is the "true" character for this counter, children are first taught 才 in primary school, and 歳 later in middle school.[^chigai] Because of these two factors, 才 is viewed in Japanese as more "immature," leading to the adage of: "Children receive {才}^(さい), adults receive {歳}^(さい)."[^sanseido] Confusingly, the kanji 才 actually has no relation to "year" or "age," instead having a meaning of "talent" (as seen most commonly in {才能}^(さいのう)). The origin for this alternative kanji is that the kanji 歳 contains ![戈 without 丶](./notes-歳1.png), which was originally how this was simplified.[^sanseido-origin] Over time, this simply began to be written as 才. Evidence for this theory is that elderly Japanese speakers will still often write ![戈 without 丶](./notes-歳1.png) instead of 才.

The only thing that this counter counts is age in years; to measure age in months, you would use <counter:ヶ月>. One minor point worth mentioning is that newborn children enter life at ０歳. Additionally, this counter can be used for both humans and animals: animals will have their ages counted with 歳 as well, and there do not appear to be any nuances around which kanji is used for non-humans. However, {歳}^(さい) is not used for inanimate objects such as buildings.[^je-inanimate] How long ago a building was built would be expressed with the phrase 「{築}^(ちく)X{年}^(ねん)」 (lit. "constructed X years"), like in 「{築三年}^(ちくさんねん)の{図書館}^(としょかん)」 ("a three-year old library"). For other inanimate objects, age would be specified with 「X{年物}^(ねんもの)」, or the sentence itself would be reworded to utilize dependent clauses to describe how long ago an item was built.

The one reading for {歳}^(さい) that you will need to watch out for is 20. While the expected readings of にじゅっさい and にじっさい are both valid, the most common reading for 20 years old is **はたち**.[^zatugaku-reading] This reading comes from old Japanese, when the number 20 was read as はた and was often followed by the suffix ち.[^chiebukuro-hata] Over time, the meaning of はたち narrowed to only being used to refer to "20 years old" from its broader origin. Sociolinguistically there are numerous theories as to how this came to be and why it has persisted; a generalized belief as to why はたち exclusively has survived as an irregular reading where the other readings have been replaced is 20 years old being seen as the age of maturity. Modern laws and customs focus on 20 being a sociolegal turning point, and historically 20 was seen as the age when one was able to decide to risk their life in war.[^allguide] However, to make matters more confusing, only 二十歳 (all kanji) can be read as はたち; when it is written as ２０歳, it can only be read as にじゅっさい or にじっさい.[^zatugaku-hatachi] This is because the reading as はたち is a reading strictly for the kanji compound of 二十歳; when the compound is not present, the reading is not valid.

When using this counter, the primary thing to keep in mind is 歳 versus 才. The latter is seen as somewhat slang-y and is best to avoid in formal situations. Additionally, it is safest to reserve 才 exclusively for the younger years, as some see the kanji as exclusively for children,[^sanseido] though what age *exactly* is a subjective and loosely-felt rule. 

[^chigai]: [違いがわかる事典](https://chigai-allguide.com/%E6%AD%B3%E3%81%A8%E6%89%8D/): 年齢を表す「さい」は日常で頻繁に使い、小学校低学年には覚えておきたい言葉だが、「歳」の漢字は画数が多く、小学生には難しいため、小学校では「才」と教えている。
[^sanseido]: [三省堂 辞書ウェブ編集部による](https://dictionary.sanseido-publ.co.jp/column/kanji_genzai008): 「サイ」については、「子供には才、お年寄りには歳」と感じるという人も少なからずいる。
[^sanseido-origin]: [三省堂 辞書ウェブ編集部による](https://dictionary.sanseido-publ.co.jp/column/kanji_genzai008): 「歳」の中に含まれる「![「戈」－「、」](https://dictionary.sanseido-publ.co.jp/wp/wp-content/uploads/2008/01/sasa_08_sai.jpg)」の部分を引っこ抜いてきたのだという。なるほど、今でも年配の方々に残されている字体は「才」ではなく「![「戈」－「、」](https://dictionary.sanseido-publ.co.jp/wp/wp-content/uploads/2008/01/sasa_08_sai.jpg)」という字体だったりするが、この説の当否は如何に。
[^je-inanimate]: [Japanese Language StackExchange](https://japanese.stackexchange.com/questions/67911/can-the-%E6%AD%B3-counter-be-used-for-architecture-furniture-etc-to-tell-its-age):  As you said, 「N {歳}^(さい)」 is reserved for humans and other animals.For other objects, it is not used except for when one personifies them humorously (or for other literary effects).
[^zatugaku-reading]: [二十歳の正しい読み方は「はたち」「にじゅっさい」？](https://zatugaku-gimonn.com/entry1051.html): 結論から言ってしまうと、二十歳の正しい読み方は「はたち」「にじっさい」「にじゅっさい」になります。一般的には二十歳は「はたち」と読むことが多いです。
[^zatugaku-hatachi]:  [二十歳の正しい読み方は「はたち」「にじゅっさい」？](https://zatugaku-gimonn.com/entry1051.html): ただ”二十歳”と書くと「はたち」「にじっさい」「にじゅっさい」と読みますが、”２０歳”と書くと「にじっさい」「にじゅっさい」としか読まないので注意が必要です。
[^chiebukuro-hata]: [２０歳はなぜ「はたち」](https://detail.chiebukuro.yahoo.co.jp/qa/question_detail/q1010445335): 「はた」は、非常に古くからある日本語で、「20」の意味を表します。  
「はた」を単独で使うことは少なく、多く「はたち」というように、  
「ち」という接尾語をつけて用います。... その「はたち」の意味が次第に狭まって、「二十歳」を意味するようになりました。
[^allguide]: [はたちの語源](http://gogen-allguide.com/ha/hatachi.html): その旗には「旗乳（はたち）」と呼ばれる竿を通す輪が、年齢に合わせて20個ついており、「命を賭けた決断のできる年齢（成人）」という意味で「はたち」と言うようになったという説である。',
    '歳'
  );
INSERT INTO
  "counters" (
    counter_id,
    english_name,
    lead_in,
    notes,
    primary_kanji
  )
VALUES('ヶ月', 'months', NULL, NULL, 'ヶ月');
INSERT INTO
  "counters" (
    counter_id,
    english_name,
    lead_in,
    notes,
    primary_kanji
  )
VALUES('ヶ国', 'countries', NULL, NULL, 'ヶ国');
INSERT INTO
  "counters" (
    counter_id,
    english_name,
    lead_in,
    notes,
    primary_kanji
  )
VALUES('円', 'yen', NULL, NULL, '円');
INSERT INTO
  "counters" (
    counter_id,
    english_name,
    lead_in,
    notes,
    primary_kanji
  )
VALUES('巻', 'volumes', NULL, NULL, '巻');
INSERT INTO
  "counters" (
    counter_id,
    english_name,
    lead_in,
    notes,
    primary_kanji
  )
VALUES('缶', 'cans', NULL, NULL, '缶');
INSERT INTO
  "counters" (
    counter_id,
    english_name,
    lead_in,
    notes,
    primary_kanji
  )
VALUES('曲', 'songs', NULL, NULL, '曲');
INSERT INTO
  "counters" (
    counter_id,
    english_name,
    lead_in,
    notes,
    primary_kanji
  )
VALUES('ヶ所', 'places', NULL, NULL, 'ヶ所');
INSERT INTO
  "counters" (
    counter_id,
    english_name,
    lead_in,
    notes,
    primary_kanji
  )
VALUES('軒', 'houses and buildings', NULL, NULL, '軒');
INSERT INTO
  "counters" (
    counter_id,
    english_name,
    lead_in,
    notes,
    primary_kanji
  )
VALUES('件', 'matters', NULL, NULL, '件');
INSERT INTO
  "counters" (
    counter_id,
    english_name,
    lead_in,
    notes,
    primary_kanji
  )
VALUES('組', 'groups and pairs', NULL, NULL, '組');
INSERT INTO
  "counters" (
    counter_id,
    english_name,
    lead_in,
    notes,
    primary_kanji
  )
VALUES(
    '口',
    'bites',
    'A multi-use counter which primarily counts bites of food or sips of drinks, but can also count swords or sums of money.',
    '
{口}^(くち), as a noun, means most simply "mouth;" this familiar and simplistic word is first learned when talking about the orifice on the body. But, just as with English, the word is multi-faceted and has many further meanings. Like English, this word is also used as a noun to refer to things that _look_ like mouths -- entrances and exits, openings on bottles and cans -- pretty much anything that has an opening (even the muzzle of guns). It can mean a vacancy like a job opening, or refer to flavours, or be used to talk about the amount of food. In the same way that English uses "mouths to feed" to refer to people, {口}^(くち) can also refer to the number of people that need to be fed. It''s an extremely versatile word as a noun; as a counter, it is just as nebulous:
1. Counting the number of bites of food;
2. Counting swords;
3. Counting portions/shares of donations or expenses.

In daily life, the most commonly-used usage of this counter is the first one, referring to an amount of food in terms of how many bites were involved; the reasoning for counting these using the noun for *mouth* is self-explanatory. And while the dictionary might focus on bites of food, this counter is equally capable of counting sips of a drink.

As for why {口}^(くち) is used to count swords, this dates back to the warriors of Japan''s past. The warrior''s sword was viewed as something that was swung downwards in attack ({振り下ろす}^(ふりおろす)) to cut open the opponent ({切り口}^(きりくち), "cut end/opening").[^sanabo-kuchi] From an early point, then 口 was the kanji used to count these swords (taken from the meaning "opening") but was read as ふり; the counter <counter:振り|kanji=口> is still seen today in places like museum plaques, where it''s seen as a polished and refined counter to be used.[^chiebukuro-museum-plaques] {口}^(くち) (with the reading of くち) serves as an alternative reading, as 「くち」 and 「こう」are the typical readings for the counter.[^sanabo-kuchi] In this way, the counter {口}^(くち) has come to be capable of counting swords. All the same, whether {口}^(くち) or <counter:振り|kanji=口>, counting swords with the kanji 口 is typically a writing-only style; when speaking, it''s better to use <counter:本> or <counter:振り>.[^chiebukuro-swords-usage]

The final usage of {口}^(くち) is in finance. Here, there are a couple of disjoint meanings that are all bound together by a common thread: {口}^(くち) is used to refer to an amount of money (or something of monetary value) as a single unit.[^chiebukuro-finance-usage] Most commonly, you will see it in fundraising campaigns that feature a fixed price per donation. Donation pages might say 「{一口}^(ひとくち)１０００{円}^(えん)」. In these cases, the price of each donation is fixed at ¥1000 and you as the donor determine how many donations you want to make; if you choose {三口}^(みつくち), you''ll be spending ¥3000. In the case of investment funds, shares of the fund are counted with {口}^(くち) in the same way that <counter:株> is used for counting shares of publicly-traded stock.[^kuchi-vs-kabu] For holding companies -- companies with monthly investments that will automatically purchase stock -- {口}^(くち) is used as a unit of measurement for how much money must (at minimum) be invested. If the equivalency were {一口}^(ひとくち)２０００{円}^(えん), you might choose {五口}^(ごくち) which would mean that you''d be investing ¥10,000 every month to be used to purchase stock.[^holding-company-equivalency] In similar fashion, this can go on to count other things such as monetary transactions, university tuition fees,[^matriculation-fees] or even bank accounts.[^bank-accounts]

In terms of readings, the first two readings for {口}^(くち) exclusively use {和語}^(わご) and are read as {一口}^(ひとくち) and {二口}^(ふたくち) exclusively. While three has also historically been read using {和語}^(わご), the younger generations are starting to use the {漢語}^(かんご) reading {三口}^(さんくち) instead. All numbers beyond three are read using {漢語}^(かんご).[^chiebukuro-reading]

[^sanabo-kuchi]: [アレってなんて数える？を解決：刀](https://www.sanabo.com/kazoekata/ct_ka/ka/katana/): 武士の携 (たずさ) えた刀は、振り下ろして切り口をつけることから、「口」という漢字を使って数えますが、「ふり」と読むのが一般的です。「振り」の古来の用字が「口」で、「くち」「こう」と読むこともあります。
[^chiebukuro-museum-plaques]: [日本刀の数えかたで一振と一本があるのを見たんですが、どう違うのですか？？](https://detail.chiebukuro.yahoo.co.jp/qa/question_detail/q11185226526): 美術館などで目録に記載されている単位は、「口（ふり）」が多いです。この「口（ふり）」は、いわゆる雅語（かご）と呼ばれる洗練された上品な言葉にあたります。
[^chiebukuro-swords-usage]: [刀の数え方を教えて下さい。](https://detail.chiebukuro.yahoo.co.jp/qa/question_detail/q11100671126): 口語なら振り、本。書き言葉なら腰、口。
[^chiebukuro-reading]: [「口」の読み方について日本語を勉強している外国人です。](https://detail.chiebukuro.yahoo.co.jp/qa/question_detail/q10119783700): 読み方は「ひとくち/ふたくち/みくち(若い人はさんくち)/よんくち/ごくち/ろっくち/ななくち/はっくち/きゅうくち/じゅっくち」「くちすう」「なんくち」
[^chiebukuro-finance-usage]: [「口」の読み方について日本語を勉強している外国人です。](https://detail.chiebukuro.yahoo.co.jp/qa/question_detail/q10119783700): つまりお金(あるいはお金に準ずるもの)の扱い単位を「口(くち)」と呼びます。
[^kuchi-vs-kabu]: [口数って何？](https://info.monex.co.jp/fund/beginner/faq/qa11.html): 株式の場合、「**1株**」ですが、投資信託は「**1口**」となります。
[^holding-company-equivalency]: [一株と一口の違いを教えてください](https://detail.chiebukuro.yahoo.co.jp/qa/question_detail/q13190338998): 最低限の拠出する単位を口数といいます。「毎月1万円給料天引きで買っているので10口と書けばよいのでしょうか？」
[^matriculation-fees]: [寄付の数え方は？](https://ameblo.jp/watashibon/entry-10484097094.html): 「寄付は30人から計40口集まった」とか、「入学金は、１口５万円、３口以上をお願いします」とか。
[^bank-accounts]: [数詞・助数詞の読み方 あ行](https://hiramatu-hifuka.com/onyak/onyak2/josu-aka.html): 分担の単位　寄付・口座など',
    '口'
  );
INSERT INTO
  "counters" (
    counter_id,
    english_name,
    lead_in,
    notes,
    primary_kanji
  )
VALUES(
    '切れ',
    'slices',
    'A counter used for counting slices of something, usually food.',
    '{切れ}^(きれ) derives from the verb {切る}^(きる) (to cut), and as a noun might most simplistically be translated as "cut." {切れ}^(きれ) as a noun sees many of the same usages as its English counterpart. The most common usage is to refer to anything that is cut off of a larger piece -- meats, wood, cloth. In fact, another usage of {切れ}^(きれ) as a noun is *as* "cloth" or "fabric." It can also be used to refer to sharpness -- both in the literal sense (the sharpness of a blade) and in the metaphorical (the sharpness of someone''s wit). {切れ}^(きれ) also refers to the act of draining/making something go away (eg, water, laundry detergent). Finally, as a noun {切れ}^(きれ) is a unit of measurement for concrete or stone used for building/crafting, equivalent to roughly 0.028m^3^/1ft^3^. Used as a counter, {切れ}^(きれ) retains its primary meaning as a noun, being used to count things that have been cut from a larger whole. As with many other counters, it was also used in Edo period Japan (1603-1868) to count gold coins.

When used as a counter, {切れ}^(きれ) will primarily be counting cuts/slices of some larger whole, and most commonly (though not exclusively) foods at that. A slice of bread ({一切れ}^(ひときれ)のパン); two slices of cheese ({二切れ}^(ふたきれ)のチーズ); three slices of cake; four slices of beef -- this counter is very common to see used to count individual pieces of food. How much food that is varies dramatically, from a single slice of sashimi to a slice of watermelon and beyond.

As a counter read with {訓読み}^(くんよみ) readings, {切れ}^(きれ) also uses {和語}^(わご) readings for 1-3: {一切れ}^(ひときれ), {二切れ}^(ふたきれ), and {三切れ}^(みきれ).[^hinative-readings] Recently, the {漢語}^(かんご) reading of {三切れ}^(さんきれ) has started to take off. After three, it will exclusively use {漢語}^(かんご) readings for the numbers, though with numerous (but predictable) sound changes. As an interesting aside, the many of these early readings produce violent homophones: {一切れ}^(ひときれ) could be read the same as {人}^(ひと){切れ}^(きれ) ("cutting a person") or sounding like {人}^(ひと)を{斬れ}^(きれ) ("kill him!"); {三切れ}^(みきれ) could be read the same as {身}^(み){切れ}^(きれ) ("slicing the body"), evoking thoughts of {切腹}^(せっぷく) (ritual suicide for samurai); and though 4 is read as {四切れ}^(よきれ), superstition surrounding 4={四}^(し)={死}^(し) (death) invokes thoughts of {死}^(し){切れ}^(きれ) ("hacked to death").[^omen-breakdown] Because of these ominous readings, the superstition goes that it''s safest to always use two pieces of {お漬物}^(おつけもの) (pickled vegetable) on dishes.[^chiebukuro-otsukemono] While this superstition is still going strong today, it''s seen as only typically applying to {お漬物}^(おつけもの), and other toppings are exempt from this.[^omen-exemption]

[^hinative-readings]: [「～切れ」を数えるときは、下のように発音して大丈夫ですか。](https://hinative.com/ja/questions/6692862) 
＊「みきれ」が本来的な言い方だが、最近は「さんきれ」と言う人もいる。  
＊「よきれ」。ただし、「よんきれ」もかなり多い。  
＊「ろっきれ」です。  
＊「ななきれ」が普通。  
＊「はっきれ」「はちきれ」どちらも言う。  
＊「きゅうきれ」です。  
＊「じっきれ」が本来の言い方だか、今は「じゅっきれ」が多数派。
[^omen-breakdown]: [沢庵は二切れが良い](https://ameblo.jp/hosodakouhei122/entry-11361071083.html): 私が子供の頃、両親に、「お漬物などの切り物は、一切れは、人切れ 三切れは、身切れ 四切れは、死着れで、縁起が悪い。」と教わりました。
[^chiebukuro-otsukemono]: [物の数え方について「切れ」は？](https://detail.chiebukuro.yahoo.co.jp/qa/question_detail/q1091354630) ちなみに、定食屋などで、丼物にお漬物がつきますが、それはいつも「２切れ」です。
[^omen-exemption]: [お漬物など、切り物の枚数で。](https://detail.chiebukuro.yahoo.co.jp/qa/question_detail/q1139904296) 漬物だけの話であって、かまぼこなどまでは気にしなくていいということではないでしょうか。',
    '切れ'
  );
INSERT INTO
  "counters" (
    counter_id,
    english_name,
    lead_in,
    notes,
    primary_kanji
  )
VALUES('語', 'words', NULL, NULL, '語');
INSERT INTO
  "counters" (
    counter_id,
    english_name,
    lead_in,
    notes,
    primary_kanji
  )
VALUES('皿', 'plates of food', NULL, NULL, '皿');
INSERT INTO
  "counters" (
    counter_id,
    english_name,
    lead_in,
    notes,
    primary_kanji
  )
VALUES(
    '校',
    'schools',
    'A counter used for counting schools and printer''s proofs.',
    '{校}^(こう) as a kanji has two usages. The first is to mean "school," as seen in {学校}^(がっこう) (school) or {校舎}^(こうしゃ) (school building, schoolhouse). More specifically, however, it''s defined as a place where you can acquire knowledge and be taught things. The second usage of {校}^(こう) is "proof," as in {校正}^(こうせい) ("proofreading"). In this sense, it''s about looking through early versions of something for the purpose of finding mistakes and correcting them.

As expected, school buildings are counted with {一校}^(いっこう). All levels of school -- primary, middle, junior and senior high -- up through university are capable of being counted with this counter, and this is the preferred counter for these (all things equal). For nursery school ({保育園}^(ほいくえん)) and kindergarten ({幼稚園}^(ようちえん)), the _preferred_ counter is <counter:園>, but {一校}^(いっこう) can still be used.[^youchien] Because {校}^(こう) means more broadly "a place to acquire knowledge and be taught things" however, {一校}^(いっこう) as a counter extends beyond traditional schools to also be used to count things like {塾}^(じゅく) (cram school) and {予備校}^(よびこう) (prep school).[^jyuku]

The other usage of {一校}^(いっこう) is to count proofs in the publishing sense. In order to go from initial manuscript or prototype design to the final product, there are a series of intermediary printouts and "printers proofs" whose purpose is to look for misspelled or omitted words, layout problems, and so on.[^printers-proofs] In this case, multiple iterations of the final product are one-at-a-time sent to the printer (or "printed" digitally), and once the first version has been looked over and corrected, a second proof would be made, followed by a third and so on. Each one of these proofs is counted with {校}^(こう) ordinally, which is to say that the first proof in the process is {一校}^(いっこう), the second {二校}^(にこう), and so on. *However*, the first proof is also (and more typically) referred to as {初校}^(しょこう) and the second {再校}^(さいこう).[^saikou] From the third proof ({三校}^(さんこう)) onward, there are no alternative versions for the counters.

It is also important to note that {初校}^(しょこう) and {再校}^(さいこう) as alternate versions of {一校}^(いっこう) and {二校}^(にこう) respectively are exclusive to counting proofs and are **not** used when counting schools.

[^youchien]: [ものの数え方](https://www.benricho.org/kazu/yo.html#yochien): 幼稚園：一園、一校
[^jyuku]: [数え方単位辞典](https://www.sanabo.com/kazoekata/ct_ka/ka/gakkou/): 小学校・中学校・高校は「校」で、塾や予備校も「校」で数えます。
[^printers-proofs]: [初校？初稿？デザイナーなら知っておきたい基本的なデザイン業界専門用語](https://mt-fc.net/design-term#i): クライアントからの原稿と制作したデザインを見比べて、**誤字や脱字などのミス、レイアウトの問題など確認・修正の指示を入れる作業**のことです。簡単に言うと**間違いがないかチェックすること**ですね。
[^saikou]: [初校？初稿？デザイナーなら知っておきたい基本的なデザイン業界専門用語](https://mt-fc.net/design-term#i-5): 初校戻しに書かれた朱字を反映した二回目の校正刷りを**「再校」**といいます。二回目なので**「二校」**とも。',
    '校'
  );
INSERT INTO
  "counters" (
    counter_id,
    english_name,
    lead_in,
    notes,
    primary_kanji
  )
VALUES('ゲーム', 'games', NULL, NULL, NULL);
INSERT INTO
  "counters" (
    counter_id,
    english_name,
    lead_in,
    notes,
    primary_kanji
  )
VALUES('試合', 'games', NULL, NULL, '試合');
INSERT INTO
  "counters" (
    counter_id,
    english_name,
    lead_in,
    notes,
    primary_kanji
  )
VALUES('品', 'products', NULL, NULL, '品');
INSERT INTO
  "counters" (
    counter_id,
    english_name,
    lead_in,
    notes,
    primary_kanji
  )
VALUES('社', 'companies and temples', NULL, NULL, '社');
INSERT INTO
  "counters" (
    counter_id,
    english_name,
    lead_in,
    notes,
    primary_kanji
  )
VALUES('週', 'weeks', NULL, NULL, '週');
INSERT INTO
  "counters" (
    counter_id,
    english_name,
    lead_in,
    notes,
    primary_kanji
  )
VALUES('周', 'laps and circuits', NULL, NULL, '周');
INSERT INTO
  "counters" (
    counter_id,
    english_name,
    lead_in,
    notes,
    primary_kanji
  )
VALUES('色', 'colours', NULL, NULL, '色');
INSERT INTO
  "counters" (
    counter_id,
    english_name,
    lead_in,
    notes,
    primary_kanji
  )
VALUES('席', 'seats', NULL, NULL, '席');
INSERT INTO
  "counters" (
    counter_id,
    english_name,
    lead_in,
    notes,
    primary_kanji
  )
VALUES(
    '戦',
    'battles',
    'A counter used for both conflicts in war and matches in sports/competitions.',
    'Found as a word under its kunyomi reading, {戦}^(いくさ) as a noun means conflict, battle, and warfare. Indeed, the kanji 戦 unambiguously points towards war and fighting when found in compound words. The counter {戦}^(せん) does not have a dictionary entry in any major Japanese dictionaries. {一戦}^(いっせん) is also not just a usage of this counter but a noun in its own right, meaning "a battle." It''s therefore easy to see that this counter will be used to count battles in a war.

{戦}^(せん) is used beyond counting battles, however. This counter is also (frequently) used to count games and matches in sports, or competitions. In this usage, it is very similar *(though not entirely interchangeable)*, with the counter <counter:試合>. Overall, {戦}^(せん) tends to be used more frequently than {試合}^(しあい).[^thesis-frequency] There are many instances where either counter can be used interchangeably, but {試合}^(しあい) sees more limitations in terms of *which* sports or competitions it can be used for, making {戦}^(せん) a more broadly-applicable counter. In particular, {戦}^(せん) *is* able to be used to count races (such as horse racing or auto racing), board-based games (such as Go or Shogi), or sporting competitions where participants don''t directly interact but instead compete individually and win/lose via some proxy scoring (such as figure skating).[^thesis-shiai-limitations] However, {戦}^(せん) is not without its own limitations. At its core the kanji 戦 talks about warfare and conflict, fights where the whole purpose is to win; it can''t be used to count exhibition matches, timed matches, practices, or other competitions where the goal of the encounter isn''t to determine a winner/loser.[^thesis-sen-limitations] 

The primary nuance with this counter is centered around that need-to-win aspect. While it isn''t the case that choosing {試合}^(しあい) over {戦}^(せん) automatically indicates that the matches weren''t for the purpose of deciding who won, it *is* the case that choosing {戦}^(せん) over {試合}^(しあい) *does* raise the stakes and inject that the matches were about winning/losing.[^thesis-nuance]

[^thesis-shiai-limitations]: [近現代日本語における新たな助数詞の成立と定着](http://hdl.handle.net/2241/00128666): 「-試合」は〚囲碁・将棋〛（「対局」）や〚相撲〛（「取組」）、〚競馬〛〚F1〛（「レース」）など、その勝負を「試合」以外の名詞で指示する競技には用いることができない。また、「互いに相手に対して何かをする」という意味と馴染まない〚フィギュアスケート〛のような競技には用いにくい。(p. 105)
[^thesis-sen-limitations]: [近現代日本語における新たな助数詞の成立と定着](http://hdl.handle.net/2241/00128666): 「-戦」は、文脈上、勝敗を決することを目的としないことが含意され ると用いにくくなる。これは、「-戦」が〚スポーツの勝負〛の数を表 現する前から有していた〚いくさ〛の数を表現するという用法に起因 する意味的制約である。(p. 105)
[^thesis-frequency]: [近現代日本語における新たな助数詞の成立と定着](http://hdl.handle.net/2241/00128666): 先にも述べたように、得られたデータは「-試合」が 3,326 例、「-戦」が 1,742 例であり、「-試合」の方が多く用いられている。それを基準として、比率が逆転しているもの（「-戦」の用例が「-試合」の用例よりも多いもの）を斜体で示し... (p. 92)
[^thesis-nuance]: [近現代日本語における新たな助数詞の成立と定着](http://hdl.handle.net/2241/00128666): (5.29a)は「エンジョイグループに参 戦する」という勝敗を問題にしないという文脈によって許容度が落ちているこ とが(5.29b)との対比からわかる。(p. 100)',
    '戦'
  );
INSERT INTO
  "counters" (
    counter_id,
    english_name,
    lead_in,
    notes,
    primary_kanji
  )
VALUES('足', 'pairs of footwear', NULL, NULL, '足');
INSERT INTO
  "counters" (
    counter_id,
    english_name,
    lead_in,
    notes,
    primary_kanji
  )
VALUES('束', 'bundles', NULL, NULL, '束');
INSERT INTO
  "counters" (
    counter_id,
    english_name,
    lead_in,
    notes,
    primary_kanji
  )
VALUES('杯', 'cups', NULL, NULL, '杯');
INSERT INTO
  "counters" (
    counter_id,
    english_name,
    lead_in,
    notes,
    primary_kanji
  )
VALUES('株', 'stocks', NULL, NULL, '株');
INSERT INTO
  "counters" (
    counter_id,
    english_name,
    lead_in,
    notes,
    primary_kanji
  )
VALUES('振り', 'swords', NULL, NULL, '振り');
INSERT INTO
  "counters" (
    counter_id,
    english_name,
    lead_in,
    notes,
    primary_kanji
  )
VALUES('部', 'parts, copies', NULL, NULL, '部');
COMMIT;