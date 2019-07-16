const chalk = require("chalk");
const fs = require("fs");
const parseHtml = require("node-html-parser").parse;
const path = require("path");
const request = require("request-promise-native");

const CACHE_DIRECTORY = path.resolve(__dirname, "./scrubber_cache");
const OUTPUT_DIRECTORY = path.resolve(__dirname, "./kazu");
const URL_BASE = "https://www.benricho.org/kazu";
const PAGES = [
  "a",
  "a_i",
  "a_u",
  "a_e",
  "a_o",
  "ka",
  "ki",
  "ku",
  "ke",
  "ko",
  "sa",
  "shi",
  "su",
  "se",
  "so",
  "ta",
  "ti_chi",
  "tsu",
  "te",
  "to",
  "na",
  "ni",
  "nu",
  "ne",
  "no",
  "ha",
  "hi",
  "hu",
  "he",
  "ho",
  "ma",
  "mi",
  "mu",
  "me",
  "mo",
  "ya",
  "yu",
  "yo",
  "ra",
  "ri",
  "ru",
  "re",
  "ro",
  "wa"
];

async function getPageRoot(page) {
  const cachePath = path.resolve(CACHE_DIRECTORY, `${page}.html`);
  if (fs.existsSync(cachePath)) {
    const contents = fs.readFileSync(cachePath);
    return parseHtml(contents.toString());
  }

  const response = await request({
    uri: `${URL_BASE}/${page}.html`
  });
  fs.writeFileSync(cachePath, response);
  return parseHtml(response);
}

const FORBIDDEN_TR_ATTRIBUTES = ["colspan", "bgcolor", "height"];

function isValidTr(tr) {
  const firstTd = tr.querySelector("td");
  if (!firstTd) {
    return false;
  }

  if (firstTd.attributes.class === "sakuhin") {
    return false;
  }

  for (const attr of FORBIDDEN_TR_ATTRIBUTES) {
    if (firstTd.attributes[attr] !== undefined) {
      return false;
    }
  }

  const numberCells = tr.querySelectorAll("td");
  return numberCells.length >= 2;
}

function getCounters(text) {
  return text
    .replace(/ *（[^）]*）*/g, "")
    .split(/、|・/)
    .map(raw => {
      const text = raw.trim();
      const startIndex = Math.max(text.indexOf("一"), text.indexOf(" ")) + 1;
      return text.substr(startIndex);
    })
    .filter(x => !!x);
}

function parseRows(rows) {
  const parsed = [];
  for (const row of rows) {
    // We can't rely on the rowspan attribute here because some of them
    // apply to the sakuhin rows we stripped out already. This works just fine
    // though.
    const tds = row.querySelectorAll("td");
    if (tds.length === 2) {
      if (
        tds[1].firstChild.attributes &&
        tds[1].firstChild.attributes.class === "betsukoumoku_link"
      ) {
        continue;
      }

      parsed.push({
        kana: parsed[parsed.length - 1].kana,
        kanji: tds[0].innerHTML,
        counters: getCounters(tds[1].firstChild.rawText)
      });
    } else {
      if (
        tds[2].firstChild.attributes &&
        tds[2].firstChild.attributes.class === "betsukoumoku_link"
      ) {
        continue;
      }

      parsed.push({
        kana: tds[0].innerHTML,
        kanji: tds[1].innerHTML,
        counters: getCounters(tds[2].firstChild.rawText)
      });
    }
  }

  return parsed;
}

const ITEMS_BY_COUNTER = {};

async function scrubPage(page) {
  const root = await getPageRoot(page);
  const rows = root.querySelectorAll("tr").filter(isValidTr);
  const data = parseRows(rows).filter(({ counters }) => !!counters.length);
  for (const { kana, kanji, counters } of data) {
    for (let index = 0; index < counters.length; ++index) {
      const counter = counters[index];
      if (!ITEMS_BY_COUNTER[counter]) {
        ITEMS_BY_COUNTER[counter] = [];
      }

      ITEMS_BY_COUNTER[counter].push({ kana, kanji, rank: index });
    }
  }
}

async function main() {
  if (!fs.existsSync(CACHE_DIRECTORY)) {
    fs.mkdirSync(CACHE_DIRECTORY);
  }

  if (!fs.existsSync(OUTPUT_DIRECTORY)) {
    fs.mkdirSync(OUTPUT_DIRECTORY);
  }

  const scrubbers = PAGES.map(scrubPage);
  await Promise.all(scrubbers);

  for (const counter of Object.keys(ITEMS_BY_COUNTER)) {
    const filename = path.resolve(OUTPUT_DIRECTORY, `./${counter}.json`);
    fs.writeFileSync(
      filename,
      JSON.stringify(
        {
          counter,
          numItems: ITEMS_BY_COUNTER[counter].length,
          items: ITEMS_BY_COUNTER[counter]
        },
        null,
        2
      )
    );
  }
}

main();
