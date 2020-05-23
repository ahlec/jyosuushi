PRAGMA foreign_keys = OFF;
BEGIN TRANSACTION;
CREATE TABLE enum_word_origin (word_origin STRING PRIMARY KEY);
INSERT INTO
  "enum_word_origin" (word_origin)
VALUES('漢語');
INSERT INTO
  "enum_word_origin" (word_origin)
VALUES('和語');
INSERT INTO
  "enum_word_origin" (word_origin)
VALUES('外来語');
COMMIT;