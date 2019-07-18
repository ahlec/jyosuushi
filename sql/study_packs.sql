PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE study_packs (pack_id STRING PRIMARY KEY NOT NULL, english_name STRING NOT NULL);
INSERT INTO study_packs VALUES('n5','JLPT N5');
INSERT INTO study_packs VALUES('n4','JLPT N4');
INSERT INTO study_packs VALUES('essential','Essential');
INSERT INTO study_packs VALUES('common','Common');
COMMIT;
