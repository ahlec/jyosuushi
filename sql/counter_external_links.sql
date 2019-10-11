PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE counter_external_links (counter_id STRING REFERENCES counters (counter_id), url STRING NOT NULL, site_name STRING, link_text STRING NOT NULL, additional_description STRING);
INSERT INTO "counter_external_links" VALUES('本','https://www.tofugu.com/japanese/japanese-counter-hon/','Tofugu','本: Counting Long, Skinny Things',NULL);
COMMIT;
