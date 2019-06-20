const chalk = require("chalk");
const fs = require("fs");
const parseHtml = require("node-html-parser").parse;
const path = require("path");
const request = require("request-promise-native");

const CACHE_DIRECTORY = path.resolve(__dirname, "./scrubber_cache");
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

function parseRows(rows) {
  const parsed = [];
  for (const row of rows) {
    // We can't rely on the rowspan attribute here because some of them
    // apply to the sakuhin rows we stripped out already. This works just fine
    // though.
    const tds = row.querySelectorAll("td");
    if (tds.length === 2) {
      parsed.push({
        kana: parsed[parsed.length - 1].kana,
        kanji: tds[0].innerHTML,
        counters: tds[1].innerHTML
      });
    } else {
      parsed.push({
        kana: tds[0].innerHTML,
        kanji: tds[1].innerHTML,
        counters: tds[2].innerHTML
      });
    }
  }

  return parsed;
}

async function scrubPage(page) {
  const root = await getPageRoot(page);
  const rows = root.querySelectorAll("tr").filter(isValidTr);
  const data = parseRows(rows);
  console.log(`[${page}] data:`, data);
}

async function main() {
  if (!fs.existsSync(CACHE_DIRECTORY)) {
    fs.mkdirSync(CACHE_DIRECTORY);
  }

  const scrubbers = PAGES.map(scrubPage);
  await Promise.all(scrubbers);
  console.log("done");
}

main();
