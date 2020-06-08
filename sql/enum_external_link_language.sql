PRAGMA foreign_keys = OFF;
BEGIN TRANSACTION;
CREATE TABLE enum_external_link_language (language STRING PRIMARY KEY);
INSERT INTO
  "enum_external_link_language" (language)
VALUES('japanese');
INSERT INTO
  "enum_external_link_language" (language)
VALUES('english');
COMMIT;