PRAGMA foreign_keys = OFF;
BEGIN TRANSACTION;
CREATE TABLE counters (
  counter_id STRING PRIMARY KEY,
  english_name STRING NOT NULL,
  lead_in STRING,
  notes TEXT,
  primary_kanji STRING UNIQUE
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
VALUES('冊', 'books', NULL, NULL, '冊');
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
VALUES('歳', 'age', NULL, NULL, '歳');
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
VALUES('口', 'bites', NULL, NULL, '口');
INSERT INTO
  "counters" (
    counter_id,
    english_name,
    lead_in,
    notes,
    primary_kanji
  )
VALUES('切れ', 'cuts of meat', NULL, NULL, '切れ');
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
VALUES('校', 'schools', NULL, NULL, '校');
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
VALUES('戦', 'battles', NULL, NULL, '戦');
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
COMMIT;