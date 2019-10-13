PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE counter_disambiguations (
    counter1_id STRING NOT NULL
                       REFERENCES counters (counter_id) 
                       CHECK (counter1_id <> counter2_id),
    counter2_id STRING NOT NULL
                       REFERENCES counters (counter_id) 
                       CHECK (counter1_id <> counter2_id),
    distinction TEXT   NOT NULL,
    PRIMARY KEY (counter1_id, counter2_id)
);
INSERT INTO "counter_disambiguations" VALUES('人','名','While both are acceptable publicly, 名 is more polite than 人 and so is used in more formal situations, especially within the service industry.');
COMMIT;
