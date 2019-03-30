import KanaDefinition, { ConversionChart } from "./definition";
import Hiragana from "./hiragana";

const CODEPOINT_KATAKANA_FIRST = 0x30a1;
const CODEPOINT_KATAKANA_LAST = 0x30ff;
const DELTA_HIRAGANA_TO_KATAKANA =
  CODEPOINT_KATAKANA_FIRST - Hiragana.codepointStart;

const conversionChart: ConversionChart = Object.keys(
  Hiragana.conversionChart
).reduce((katakana: ConversionChart, romaji: string) => {
  const characters: string[] = [];
  const hiragana = Hiragana.conversionChart[romaji];
  for (let index = 0; index < hiragana.length; ++index) {
    const code = hiragana.charCodeAt(index);
    if (code >= Hiragana.codepointStart && code <= Hiragana.codepointEnd) {
      characters.push(String.fromCharCode(code + DELTA_HIRAGANA_TO_KATAKANA));
    } else {
      characters.push(hiragana[index]);
    }
  }

  katakana[romaji] = characters.join();
  return katakana;
}, {});

const Katakana = new KanaDefinition(
  CODEPOINT_KATAKANA_FIRST,
  CODEPOINT_KATAKANA_LAST,
  conversionChart
);

export default Katakana;
