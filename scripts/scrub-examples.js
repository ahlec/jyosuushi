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
    return parseHtml(contents);
  }

  const response = await request({
    uri: `${URL_BASE}/${page}.html`
  });
  fs.writeFileSync(cachePath, response);
  return parseHtml(response);
}

async function scrubPage(page) {
  const root = await getPageRoot(page);
  console.log(`[${page}] firstChild:`, root.firstChild);
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
