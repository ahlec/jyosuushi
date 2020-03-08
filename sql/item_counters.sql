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
  "item_counters"
VALUES('cow', '頭', NULL);
INSERT INTO
  "item_counters"
VALUES('horse', '頭', NULL);
INSERT INTO
  "item_counters"
VALUES('gorilla', '頭', NULL);
INSERT INTO
  "item_counters"
VALUES('whale', '頭', NULL);
INSERT INTO
  "item_counters"
VALUES('rabbit', '匹', NULL);
INSERT INTO
  "item_counters"
VALUES('dog', '匹', NULL);
INSERT INTO
  "item_counters"
VALUES('cat', '匹', NULL);
INSERT INTO
  "item_counters"
VALUES('sheep', '匹', NULL);
INSERT INTO
  "item_counters"
VALUES('deer', '匹', NULL);
INSERT INTO
  "item_counters"
VALUES('otter', '匹', NULL);
INSERT INTO
  "item_counters"
VALUES('credit card', '枚', NULL);
INSERT INTO
  "item_counters"
VALUES('playing card', '枚', NULL);
INSERT INTO
  "item_counters"
VALUES('paper', '枚', NULL);
INSERT INTO
  "item_counters"
VALUES('photo', '枚', NULL);
INSERT INTO
  "item_counters"
VALUES('chicken', '羽', NULL);
INSERT INTO
  "item_counters"
VALUES('penguin', '羽', NULL);
INSERT INTO
  "item_counters"
VALUES('rabbit', '羽', NULL);
INSERT INTO
  "item_counters"
VALUES('origami crane', '羽', NULL);
INSERT INTO
  "item_counters"
VALUES('elephant', '頭', NULL);
INSERT INTO
  "item_counters"
VALUES('washing machine', '台', NULL);
INSERT INTO
  "item_counters"
VALUES('oven', '台', NULL);
INSERT INTO
  "item_counters"
VALUES('microwave', '台', NULL);
INSERT INTO
  "item_counters"
VALUES('car', '台', NULL);
INSERT INTO
  "item_counters"
VALUES('bed', '台', NULL);
INSERT INTO
  "item_counters"
VALUES('textbook', '冊', NULL);
INSERT INTO
  "item_counters"
VALUES('dictionary', '冊', NULL);
INSERT INTO
  "item_counters"
VALUES('notebook', '冊', NULL);
INSERT INTO
  "item_counters"
VALUES('magazine', '冊', NULL);
INSERT INTO
  "item_counters"
VALUES('book', '冊', NULL);
INSERT INTO
  "item_counters"
VALUES('bat', '羽', NULL);
INSERT INTO
  "item_counters"
VALUES('year', '年', NULL);
INSERT INTO
  "item_counters"
VALUES('month', 'ヶ月', NULL);
INSERT INTO
  "item_counters"
VALUES('floor (building)', '階', NULL);
INSERT INTO
  "item_counters"
VALUES('storey', '階', NULL);
INSERT INTO
  "item_counters"
VALUES('years old', '歳', NULL);
INSERT INTO
  "item_counters"
VALUES('time (occurrences)', '回', NULL);
INSERT INTO
  "item_counters"
VALUES('occurrence', '回', NULL);
INSERT INTO
  "item_counters"
VALUES('soda can', '缶', NULL);
INSERT INTO
  "item_counters"
VALUES('beer can', '缶', NULL);
INSERT INTO
  "item_counters"
VALUES('empty can', '缶', NULL);
INSERT INTO
  "item_counters"
VALUES('can of bug spray', '缶', NULL);
INSERT INTO
  "item_counters"
VALUES('can of hair spray', '缶', NULL);
INSERT INTO
  "item_counters"
VALUES('spray paint', '缶', NULL);
INSERT INTO
  "item_counters"
VALUES('can of soup', '缶', NULL);
INSERT INTO
  "item_counters"
VALUES('song', '曲', NULL);
INSERT INTO
  "item_counters"
VALUES('tune', '曲', NULL);
INSERT INTO
  "item_counters"
VALUES('bathroom', 'ヶ所', NULL);
INSERT INTO
  "item_counters"
VALUES('shopping mall', 'ヶ所', NULL);
INSERT INTO
  "item_counters"
VALUES('cinema', 'ヶ所', NULL);
INSERT INTO
  "item_counters"
VALUES('location', 'ヶ所', NULL);
INSERT INTO
  "item_counters"
VALUES('place', 'ヶ所', NULL);
INSERT INTO
  "item_counters"
VALUES('country', 'ヶ国', NULL);
INSERT INTO
  "item_counters"
VALUES('nation', 'ヶ国', NULL);
INSERT INTO
  "item_counters"
VALUES('yen', '円', NULL);
INSERT INTO
  "item_counters"
VALUES('slice of pizza', '切れ', NULL);
INSERT INTO
  "item_counters"
VALUES('filet', '切れ', NULL);
INSERT INTO
  "item_counters"
VALUES('slice of cake', '切れ', NULL);
INSERT INTO
  "item_counters"
VALUES('cut of meat', '切れ', NULL);
INSERT INTO
  "item_counters"
VALUES('slice of sashimi', '切れ', NULL);
INSERT INTO
  "item_counters"
VALUES('bite of food', '口', NULL);
INSERT INTO
  "item_counters"
VALUES('sip of water', '口', NULL);
INSERT INTO
  "item_counters"
VALUES('couple (people)', '組', NULL);
INSERT INTO
  "item_counters"
VALUES('group of friends', '組', NULL);
INSERT INTO
  "item_counters"
VALUES('melody', '曲', NULL);
INSERT INTO
  "item_counters"
VALUES('jingle', '曲', NULL);
INSERT INTO
  "item_counters"
VALUES('radio', '台', NULL);
INSERT INTO
  "item_counters"
VALUES('receipt', '枚', NULL);
INSERT INTO
  "item_counters"
VALUES('week', '週', NULL);
INSERT INTO
  "item_counters"
VALUES('lap', '周', NULL);
INSERT INTO
  "item_counters"
VALUES('circuit', '周', NULL);
INSERT INTO
  "item_counters"
VALUES('round', '周', NULL);
INSERT INTO
  "item_counters"
VALUES('tint', '色', NULL);
INSERT INTO
  "item_counters"
VALUES('hue', '色', NULL);
INSERT INTO
  "item_counters"
VALUES('colour', '色', NULL);
INSERT INTO
  "item_counters"
VALUES('seat', '席', NULL);
INSERT INTO
  "item_counters"
VALUES('meeting', '席', NULL);
INSERT INTO
  "item_counters"
VALUES('assembly', '席', NULL);
INSERT INTO
  "item_counters"
VALUES('banquet', '席', NULL);
INSERT INTO
  "item_counters"
VALUES('bar of chocolate', '枚', NULL);
INSERT INTO
  "item_counters"
VALUES('man', '人', NULL);
INSERT INTO
  "item_counters"
VALUES('woman', '人', NULL);
INSERT INTO
  "item_counters"
VALUES('coworker', '人', NULL);
INSERT INTO
  "item_counters"
VALUES('roommate', '人', NULL);
INSERT INTO
  "item_counters"
VALUES('person', '人', NULL);
INSERT INTO
  "item_counters"
VALUES('person', '名', NULL);
INSERT INTO
  "item_counters"
VALUES('minute', '分', NULL);
INSERT INTO
  "item_counters"
VALUES('bottle', '本', NULL);
INSERT INTO
  "item_counters"
VALUES('tree', '本', NULL);
INSERT INTO
  "item_counters"
VALUES('rod', '本', NULL);
INSERT INTO
  "item_counters"
VALUES('river', '本', NULL);
INSERT INTO
  "item_counters"
VALUES('pen', '本', NULL);
INSERT INTO
  "item_counters"
VALUES('line', '本', NULL);
INSERT INTO
  "item_counters"
VALUES('o''clock', '時', NULL);
INSERT INTO
  "item_counters"
VALUES('day of the month', '日', NULL);
INSERT INTO
  "item_counters"
VALUES('company', '社', NULL);
INSERT INTO
  "item_counters"
VALUES('shinto shrine', '社', NULL);
INSERT INTO
  "item_counters"
VALUES('office building', 'ヶ所', NULL);
INSERT INTO
  "item_counters"
VALUES('street', '本', NULL);
INSERT INTO
  "item_counters"
VALUES('high school', '校', NULL);
INSERT INTO
  "item_counters"
VALUES('elementary school', '校', NULL);
INSERT INTO
  "item_counters"
VALUES('middle school', '校', NULL);
INSERT INTO
  "item_counters"
VALUES('university', '校', NULL);
INSERT INTO
  "item_counters"
VALUES('cram school', '校', NULL);
INSERT INTO
  "item_counters"
VALUES('pair of mittens', '組', NULL);
INSERT INTO
  "item_counters"
VALUES('pair of gloves', '組', NULL);
INSERT INTO
  "item_counters"
VALUES('drumset', '組', NULL);
INSERT INTO
  "item_counters"
VALUES('deck of cards', '組', NULL);
INSERT INTO
  "item_counters"
VALUES('baseball game', '試合', NULL);
INSERT INTO
  "item_counters"
VALUES('game', '試合', NULL);
INSERT INTO
  "item_counters"
VALUES('match (sports)', '試合', NULL);
INSERT INTO
  "item_counters"
VALUES('basketball game', 'ゲーム', NULL);
INSERT INTO
  "item_counters"
VALUES('fur pelt', '枚', NULL);
INSERT INTO
  "item_counters"
VALUES('blanket', '枚', NULL);
INSERT INTO
  "item_counters"
VALUES('word', '語', NULL);
INSERT INTO
  "item_counters"
VALUES('straw', '本', NULL);
INSERT INTO
  "item_counters"
VALUES('bookstore', '軒', NULL);
INSERT INTO
  "item_counters"
VALUES('shop', '軒', NULL);
INSERT INTO
  "item_counters"
VALUES('store', '軒', NULL);
INSERT INTO
  "item_counters"
VALUES('tea house', '軒', NULL);
INSERT INTO
  "item_counters"
VALUES('house', '軒', NULL);
INSERT INTO
  "item_counters"
VALUES('home', '軒', NULL);
INSERT INTO
  "item_counters"
VALUES('barn', '軒', NULL);
INSERT INTO
  "item_counters"
VALUES('izakaya', '軒', NULL);
INSERT INTO
  "item_counters"
VALUES('apartment', '軒', NULL);
INSERT INTO
  "item_counters"
VALUES('cinema', '軒', NULL);
INSERT INTO
  "item_counters"
VALUES('arcade', '軒', NULL);
INSERT INTO
  "item_counters"
VALUES('nightclub', '軒', NULL);
INSERT INTO
  "item_counters"
VALUES('law', '件', NULL);
INSERT INTO
  "item_counters"
VALUES('loan', '件', NULL);
INSERT INTO
  "item_counters"
VALUES('task', '件', NULL);
INSERT INTO
  "item_counters"
VALUES('appointment', '件', NULL);
INSERT INTO
  "item_counters"
VALUES('registration', '件', NULL);
INSERT INTO
  "item_counters"
VALUES('request', '件', NULL);
INSERT INTO
  "item_counters"
VALUES('recommendation', '件', NULL);
INSERT INTO
  "item_counters"
VALUES('proverb', '語', NULL);
INSERT INTO
  "item_counters"
VALUES('saying', '語', NULL);
INSERT INTO
  "item_counters"
VALUES('keyword', '語', NULL);
INSERT INTO
  "item_counters"
VALUES('idiom', '語', NULL);
INSERT INTO
  "item_counters"
VALUES('serving of yakisoba', '皿', NULL);
INSERT INTO
  "item_counters"
VALUES('bowl of soup', '皿', NULL);
INSERT INTO
  "item_counters"
VALUES('bowl of fried rice', '皿', NULL);
INSERT INTO
  "item_counters"
VALUES('plate of food', '皿', NULL);
INSERT INTO
  "item_counters"
VALUES('side dish', '皿', NULL);
INSERT INTO
  "item_counters"
VALUES('bank', '社', NULL);
INSERT INTO
  "item_counters"
VALUES('battle', '戦', NULL);
INSERT INTO
  "item_counters"
VALUES('skirmish', '戦', NULL);
INSERT INTO
  "item_counters"
VALUES('boss fight', '戦', NULL);
INSERT INTO
  "item_counters"
VALUES('pair of shoes', '足', 'best');
INSERT INTO
  "item_counters"
VALUES('pair of sandals', '足', 'best');
INSERT INTO
  "item_counters"
VALUES('pair of socks', '足', 'best');
INSERT INTO
  "item_counters"
VALUES('bundle of wood', '束', 'best');
INSERT INTO
  "item_counters"
VALUES('bundle of green onions', '束', 'best');
INSERT INTO
  "item_counters"
VALUES('sutra', '巻', NULL);
COMMIT;