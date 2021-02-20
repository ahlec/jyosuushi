PRAGMA foreign_keys = OFF;
BEGIN TRANSACTION;
CREATE TABLE item_counters (
  item_id STRING REFERENCES items (item_id),
  counter_id STRING REFERENCES counters (counter_id),
  relevance STRING CHECK (
    relevance IN (
      'rare',
      'situational',
      'common',
      'best',
      'unknown'
    )
  )
);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('cow', '頭', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('horse', '頭', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('gorilla', '頭', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('whale', '頭', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('rabbit', '匹', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('dog', '匹', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('cat', '匹', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('sheep', '匹', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('deer', '匹', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('otter', '匹', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('credit card', '枚', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('playing card', '枚', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('paper', '枚', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('photo', '枚', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('chicken', '羽', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('penguin', '羽', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('rabbit', '羽', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('origami crane', '羽', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('elephant', '頭', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('washing machine', '台', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('oven', '台', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('microwave', '台', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('car', '台', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('bed', '台', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('textbook', '冊', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('dictionary', '冊', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('notebook', '冊', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('magazine', '冊', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('book', '冊', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('bat', '羽', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('year', '年', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('month', 'ヶ月', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('floor (building)', '階', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('storey', '階', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('years old', '歳', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('time (occurrences)', '回', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('occurrence', '回', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('soda can', '缶', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('beer can', '缶', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('empty can', '缶', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('can of bug spray', '缶', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('can of hair spray', '缶', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('spray paint', '缶', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('can of soup', '缶', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('song', '曲', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('tune', '曲', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('bathroom', 'ヶ所', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('shopping mall', 'ヶ所', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('cinema', 'ヶ所', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('location', 'ヶ所', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('place', 'ヶ所', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('country', 'ヶ国', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('nation', 'ヶ国', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('yen', '円', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('slice of pizza', '切れ', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('filet', '切れ', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('slice of cake', '切れ', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('cut of meat', '切れ', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('slice of sashimi', '切れ', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('bite of food', '口', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('sip of water', '口', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('couple (people)', '組', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('group of friends', '組', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('melody', '曲', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('jingle', '曲', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('radio', '台', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('receipt', '枚', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('week', '週', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('lap', '周', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('circuit', '周', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('round', '周', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('tint', '色', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('hue', '色', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('colour', '色', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('seat', '席', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('meeting', '席', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('assembly', '席', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('banquet', '席', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('bar of chocolate', '枚', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('man', '人', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('woman', '人', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('coworker', '人', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('roommate', '人', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('person', '人', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('person', '名', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('minute', '分', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('bottle', '本', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('tree', '本', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('rod', '本', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('river', '本', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('pen', '本', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('line', '本', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('o''clock', '時', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('day of the month', '日', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('company', '社', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('shinto shrine', '社', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('office building', 'ヶ所', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('street', '本', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('high school', '校', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('elementary school', '校', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('middle school', '校', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('university', '校', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('cram school', '校', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('pair of mittens', '組', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('pair of gloves', '組', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('drumset', '組', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('deck of cards', '組', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('baseball game', '試合', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('game', '試合', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('match (sports)', '試合', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('basketball game', 'ゲーム', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('fur pelt', '枚', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('blanket', '枚', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('word', '語', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('straw', '本', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('bookstore', '軒', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('shop', '軒', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('store', '軒', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('tea house', '軒', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('house', '軒', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('home', '軒', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('barn', '軒', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('izakaya', '軒', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('apartment', '軒', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('cinema', '軒', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('arcade', '軒', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('nightclub', '軒', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('law', '件', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('loan', '件', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('task', '件', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('appointment', '件', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('registration', '件', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('request', '件', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('recommendation', '件', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('proverb', '語', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('saying', '語', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('keyword', '語', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('idiom', '語', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('serving of yakisoba', '皿', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('bowl of soup', '皿', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('bowl of fried rice', '皿', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('plate of food', '皿', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('side dish', '皿', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('bank', '社', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('battle', '戦', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('skirmish', '戦', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('boss fight', '戦', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('pair of shoes', '足', 'best');
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('pair of sandals', '足', 'best');
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('pair of socks', '足', 'best');
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('bundle of wood', '束', 'best');
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('bundle of green onions', '束', 'best');
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('sutra', '巻', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('fire extinguisher', '本', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('conflict', '戦', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('Shogi match', '戦', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('horse race', '戦', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('basketball game', '戦', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('baseball game', '戦', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('Go game', '戦', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('figure skating competition', '戦', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('sword', '口', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('katana', '口', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('sword', '本', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('katana', '本', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('sword', '振り', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('katana', '振り', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('cup of coffee', '杯', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('glass of milk', '杯', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('glass of water', '杯', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('alcoholic cocktail', '杯', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('bowl of soup', '杯', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('bowl of fried rice', '杯', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('bowl of rice', '杯', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('flower', '株', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('leaf', '枚', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('twig', '本', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('train ticket', '枚', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('tree stump', '株', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('shrub', '株', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('bush', '株', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('cloud ear mushroom', '株', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('cloud ear mushroom', '枚', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('mushroom', '株', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('mushroom', '本', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('cucumber', '株', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('cucumber', '本', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('stock certificate', '枚', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('stock certificate', '株', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('share of stock', '株', NULL);
INSERT INTO
  "item_counters" (item_id, counter_id, relevance)
VALUES('decorative plant', '株', NULL);
COMMIT;