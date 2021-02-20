PRAGMA foreign_keys = OFF;
BEGIN TRANSACTION;
CREATE TABLE items (
  item_id STRING PRIMARY KEY,
  english_singular STRING NOT NULL,
  english_plural STRING NOT NULL,
  custom_min_amount INTEGER,
  custom_max_amount INTEGER,
  japanese_kana STRING,
  japanese_kanji STRING
);
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'day of the month',
    'day of the month',
    'days of the month',
    1,
    31,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES('line', 'line', 'lines', NULL, NULL, NULL, NULL);
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'minute',
    'minute',
    'minutes',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES('pen', 'pen', 'pens', NULL, NULL, NULL, NULL);
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'bottle',
    'bottle',
    'bottles',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'river',
    'river',
    'rivers',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'person',
    'person',
    'people',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES('tree', 'tree', 'trees', NULL, NULL, NULL, NULL);
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES('rod', 'rod', 'rods', NULL, NULL, NULL, NULL);
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'photo',
    'photo',
    'photos',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'otter',
    'otter',
    'otters',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES('deer', 'deer', 'deer', NULL, NULL, NULL, NULL);
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'sheep',
    'sheep',
    'sheep',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES('cat', 'cat', 'cats', NULL, NULL, NULL, NULL);
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES('dog', 'dog', 'dogs', NULL, NULL, NULL, NULL);
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'paper',
    'paper',
    'paper',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'playing card',
    'playing card',
    'playing cards',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'credit card',
    'credit card',
    'credit cards',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'origami crane',
    'origami crane',
    'origami cranes',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'rabbit',
    'rabbit',
    'rabbits',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'penguin',
    'penguin',
    'penguins',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'chicken',
    'chicken',
    'chickens',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'whale',
    'whale',
    'whales',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'gorilla',
    'gorilla',
    'gorillas',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'horse',
    'horse',
    'horses',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES('cow', 'cow', 'cows', NULL, NULL, NULL, NULL);
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'elephant',
    'elephant',
    'elephants',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'washing machine',
    'washing machine',
    'washing machines',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES('oven', 'oven', 'ovens', NULL, NULL, NULL, NULL);
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'microwave',
    'microwave',
    'microwaves',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES('car', 'car', 'cars', NULL, NULL, NULL, NULL);
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES('bed', 'bed', 'beds', NULL, NULL, NULL, NULL);
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'textbook',
    'textbook',
    'textbooks',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'dictionary',
    'dictionary',
    'dictionaries',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'notebook',
    'notebook',
    'notebooks',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'magazine',
    'magazine',
    'magazines',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES('book', 'book', 'books', NULL, NULL, NULL, NULL);
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'roommate',
    'roommate',
    'roommates',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'coworker',
    'coworker',
    'coworkers',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'woman',
    'woman',
    'women',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES('man', 'man', 'men', NULL, NULL, NULL, NULL);
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES('bat', 'bat', 'bats', NULL, NULL, NULL, NULL);
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES('year', 'year', 'years', NULL, NULL, NULL, NULL);
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'month',
    'month',
    'months',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'floor (building)',
    'floor',
    'floors',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'storey',
    'storey',
    'stories',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'years old',
    'year old',
    'years old',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'occurrence',
    'occurrence',
    'occurrences',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'time (occurrences)',
    'time',
    'times',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'o''clock',
    'o''clock',
    'o''clock',
    1,
    24,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'can of soup',
    'can of soup',
    'cans of soup',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'spray paint',
    'spray paint',
    'spray paints',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'can of hair spray',
    'can of hair spray',
    'cans of hair spray',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'can of bug spray',
    'can of bug spray',
    'cans of bug spray',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'empty can',
    'empty can',
    'empty cans',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'beer can',
    'beer can',
    'beer cans',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'soda can',
    'soda can',
    'soda cans',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES('tune', 'tune', 'tunes', NULL, NULL, NULL, NULL);
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES('song', 'song', 'songs', NULL, NULL, NULL, NULL);
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES('yen', 'yen', 'yen', NULL, NULL, NULL, NULL);
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'bathroom',
    'bathroom',
    'bathrooms',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'shopping mall',
    'shopping mall',
    'shopping malls',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'cinema',
    'cinema',
    'cinemas',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'location',
    'location',
    'locations',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'place',
    'place',
    'places',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'nation',
    'nation',
    'nations',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'country',
    'country',
    'countries',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'sip of water',
    'sip of water',
    'sips of water',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'bite of food',
    'bite of food',
    'bites of food',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'slice of pizza',
    'slice of pizza',
    'slices of pizza',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'filet',
    'filet',
    'filets',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'slice of cake',
    'slice of cake',
    'slices of cake',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'cut of meat',
    'cut of meat',
    'cuts of meat',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'slice of sashimi',
    'slice of sashimi',
    'slices of sashimi',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'group of friends',
    'group of friends',
    'groups of friends',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'couple (people)',
    'couple',
    'couples',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'jingle',
    'jingle',
    'jingles',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'melody',
    'melody',
    'melodies',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'receipt',
    'receipt',
    'receipts',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'radio',
    'radio',
    'radios',
    NULL,
    NULL,
    'ラジオ',
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES('week', 'week', 'weeks', NULL, NULL, NULL, NULL);
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'round',
    'round',
    'rounds',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'circuit',
    'circuit',
    'circuits',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES('lap', 'lap', 'laps', NULL, NULL, NULL, NULL);
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES('tint', 'tint', 'tints', NULL, NULL, NULL, NULL);
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES('hue', 'hue', 'hues', NULL, NULL, NULL, NULL);
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'colour',
    'colour',
    'colours',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'banquet',
    'banquet',
    'banquets',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'assembly',
    'assembly',
    'assemblies',
    NULL,
    NULL,
    'かいごう',
    '会合'
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'meeting',
    'meeting',
    'meetings',
    NULL,
    NULL,
    'かいごう',
    '会合'
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES('seat', 'seat', 'seats', NULL, NULL, 'ざせき', '座席');
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'bar of chocolate',
    'bar of chocolate',
    'bars of chocolate',
    NULL,
    NULL,
    'いたチョコ',
    '板チョコ'
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'shinto shrine',
    'Shinto shrine',
    'Shinto shrines',
    NULL,
    NULL,
    'じんじゃ',
    '神社'
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'office building',
    'office building',
    'office buildings',
    NULL,
    NULL,
    'じむしょ',
    '事務所'
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'company',
    'company',
    'companies',
    NULL,
    NULL,
    'かいしゃ',
    '会社'
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'street',
    'street',
    'streets',
    NULL,
    NULL,
    'とおり',
    '通り'
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'cram school',
    'cram school',
    'cram schools',
    NULL,
    NULL,
    'じゅく',
    '塾'
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'university',
    'university',
    'universities',
    NULL,
    NULL,
    'だいがく',
    '大学'
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'middle school',
    'middle school',
    'middle schools',
    NULL,
    NULL,
    'ちゅうがっこう',
    '中学校'
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'elementary school',
    'elementary school',
    'elementary schools',
    NULL,
    NULL,
    'しょうがっこう',
    '小学校'
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'high school',
    'high school',
    'high schools',
    NULL,
    NULL,
    'こうこう',
    '高校'
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'pair of gloves',
    'pair of gloves',
    'pairs of gloves',
    NULL,
    NULL,
    'ぐんて',
    '軍手'
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'pair of mittens',
    'pair of mittens',
    'pairs of mittens',
    NULL,
    NULL,
    'ミトン',
    'ミトン'
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'deck of cards',
    'deck of cards',
    'decks of cards',
    NULL,
    NULL,
    'トランプ',
    'トランプ'
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'drumset',
    'drumset',
    'drumsets',
    NULL,
    NULL,
    'ドラムセット',
    'ドラムセット'
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'match (sports)',
    'match',
    'matches',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'baseball game',
    'baseball game',
    'baseball games',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES('game', 'game', 'games', NULL, NULL, NULL, NULL);
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'fur pelt',
    'fur pelt',
    'fur pelts',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'basketball game',
    'basketball game',
    'basketball games',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES('word', 'word', 'words', NULL, NULL, NULL, NULL);
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'blanket',
    'blanket',
    'blanket',
    NULL,
    NULL,
    'もうふ',
    '毛布'
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'straw',
    'straw',
    'straws',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES('home', 'home', 'homes', NULL, NULL, NULL, NULL);
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'house',
    'house',
    'houses',
    NULL,
    NULL,
    'いえ',
    '家'
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'tea house',
    'tea house',
    'tea houses',
    NULL,
    NULL,
    'ちゃや',
    '茶屋'
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'store',
    'store',
    'stores',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES('shop', 'shop', 'shops', NULL, NULL, NULL, NULL);
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'bookstore',
    'bookstore',
    'bookstores',
    NULL,
    NULL,
    'ほんや',
    '本屋'
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'apartment',
    'apartment',
    'apartments',
    NULL,
    NULL,
    'アパート',
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'izakaya',
    'izakaya',
    'izakaya',
    NULL,
    NULL,
    'いざかや',
    '居酒屋'
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES('barn', 'barn', 'barns', NULL, NULL, 'うまや', '厩');
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'nightclub',
    'nightclub',
    'nightclubs',
    NULL,
    NULL,
    'ナイトクラブ',
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'arcade',
    'arcade',
    'arcades',
    NULL,
    NULL,
    'ゲームセンター',
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'recommendation',
    'recommendation',
    'recommendations',
    NULL,
    NULL,
    'ていげん',
    '提言'
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'request',
    'request',
    'requests',
    NULL,
    NULL,
    'ちゅうもん',
    '注文'
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'registration',
    'registration',
    'registrations',
    NULL,
    NULL,
    'とうき',
    '登記'
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'appointment',
    'appointment',
    'appointments',
    NULL,
    NULL,
    'よやく',
    '予約'
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES('task', 'task', 'tasks', NULL, NULL, 'ようじ', '用事');
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES('loan', 'loan', 'loans', NULL, NULL, 'ゆうし', '融資');
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES('law', 'law', 'laws', NULL, NULL, 'ほうれい', '法令');
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'idiom',
    'idiom',
    'idioms',
    NULL,
    NULL,
    'かんようく',
    '慣用句'
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'keyword',
    'keyword',
    'keywords',
    NULL,
    NULL,
    'キーワード',
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'saying',
    'saying',
    'sayings',
    NULL,
    NULL,
    'かくげん',
    '格言'
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'proverb',
    'proverb',
    'proverbs',
    NULL,
    NULL,
    'ことわざ',
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'side dish',
    'side dish',
    'side dishes',
    NULL,
    NULL,
    'ふくしょくぶつ',
    '副食物'
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'plate of food',
    'plate of food',
    'plates of food',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'bowl of fried rice',
    'bowl of fried rice',
    'bowls of fried rice',
    NULL,
    NULL,
    'チャーハン',
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'bowl of soup',
    'bowl of soup',
    'bowls of soup',
    NULL,
    NULL,
    'スープ',
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'serving of yakisoba',
    'serving of yakisoba',
    'servings of yakisoba',
    NULL,
    NULL,
    'やきそば',
    '焼きそば'
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'bank',
    'bank',
    'banks',
    NULL,
    NULL,
    'ぎんこう',
    '銀行'
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'boss fight',
    'boss fight',
    'boss fights',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'skirmish',
    'skirmish',
    'skirmishes',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'battle',
    'battle',
    'battles',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'pair of sandals',
    'pair of sandals',
    'pairs of sandals',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'pair of shoes',
    'pair of shoes',
    'pairs of shoes',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'pair of socks',
    'pair of socks',
    'pairs of socks',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'bundle of green onions',
    'bundle of green onions',
    'bundles of green onions',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'bundle of wood',
    'bundle of wood',
    'bundles of wood',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'sutra',
    'sutra',
    'sutra',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'fire extinguisher',
    'fire extinguisher',
    'fire extinguishers',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'horse race',
    'horse race',
    'horse races',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'Shogi match',
    'Shogi match',
    'Shogi matches',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'conflict',
    'conflict',
    'conflicts',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'Go game',
    'Go game',
    'Go games',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'figure skating competition',
    'figure skating competition',
    'figure skating competitions',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'katana',
    'katana',
    'katanas',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'sword',
    'sword',
    'swords',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'alcoholic cocktail',
    'alcoholic cocktail',
    'alcoholic cocktails',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'glass of water',
    'glass of water',
    'glasses of water',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'glass of milk',
    'glass of milk',
    'glasses of milk',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'cup of coffee',
    'cup of coffee',
    'cups of coffee',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'bowl of rice',
    'bowl of rice',
    'bowls of rice',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'flower',
    'flower',
    'flowers',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES('twig', 'twig', 'twigs', NULL, NULL, NULL, NULL);
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES('leaf', 'leaf', 'leaves', NULL, NULL, NULL, NULL);
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'tree stump',
    'tree stump',
    'tree stumps',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'train ticket',
    'train ticket',
    'train tickets',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'shrub',
    'shrub',
    'shrubs',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES('bush', 'bush', 'bushes', NULL, NULL, NULL, NULL);
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'cloud ear mushroom',
    'cloud ear mushroom',
    'cloud ear mushrooms',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'mushroom',
    'mushroom',
    'mushrooms',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'cucumber',
    'cucumber',
    'cucumbers',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'share of stock',
    'share of stock',
    'shares of stock',
    NULL,
    NULL,
    'かぶしき',
    '株式'
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'stock certificate',
    'stock certificate',
    'stock certificates',
    NULL,
    NULL,
    'かぶけん',
    '株券'
  );
INSERT INTO
  "items" (
    item_id,
    english_singular,
    english_plural,
    custom_min_amount,
    custom_max_amount,
    japanese_kana,
    japanese_kanji
  )
VALUES(
    'decorative plant',
    'decorative plant',
    'decorative plants',
    NULL,
    NULL,
    'かんようしょくぶつ',
    '観葉植物'
  );
COMMIT;