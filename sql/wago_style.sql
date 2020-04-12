PRAGMA foreign_keys = OFF;
BEGIN TRANSACTION;
CREATE TABLE wago_style (
  wago_style_handle STRING PRIMARY KEY,
  range_end_inclusive INTEGER,
  also_uses_kango_one BOOLEAN DEFAULT (0),
  also_uses_kango_two BOOLEAN DEFAULT (0),
  also_uses_kango_three BOOLEAN DEFAULT (0)
);
INSERT INTO
  "wago_style"
VALUES('ひと、ふた', 2, 0, 0, 0);
INSERT INTO
  "wago_style"
VALUES('ひと、ふた、み(サン)', 3, 0, 0, 1);
INSERT INTO
  "wago_style"
VALUES('ひと(イチ)、ふた(二)', 2, 1, 1, 0);
COMMIT;