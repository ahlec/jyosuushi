import { StudyPack } from "../data/study-packs";
import { Counter, Item } from "../redux";
import Localization, {
  VARIABLE_ALEC_DEITLOFF,
  VARIABLE_ICON_CREDIT_LINK
} from "./index";

const ENGLISH: Localization = {
  alecDeitloff: "Alec Deitloff",
  counterName: (counter: Counter) => counter.englishName,
  countersDisplayHeader: "Counters",
  credits: [
    "Application designed and coded by ",
    VARIABLE_ALEC_DEITLOFF,
    ". Vector icons were taken from the ",
    VARIABLE_ICON_CREDIT_LINK,
    " collection."
  ],
  itemPlural: (item: Item) => item.englishPlural,
  itemSingular: (item: Item) => item.englishSingular,
  resultColumnHeaderCounter: "Counter",
  resultColumnHeaderHiragana: "Hiragana",
  resultColumnHeaderKanji: "Kanji",
  resultColumnHeaderRule: "Rule",
  resultColumnHeaderStudyPack: "Study Pack",
  resultCorrectHeader: "Correct!",
  resultIncorrectHeader: "Not quite right...",
  resultSkippedHeader: "Skipped",
  resultTableIntro:
    "Here are all of the possible answers based on the sets you have enabled:",
  resultsTableIrregularLabel: "(irregular)",
  siteTagline: "Let's review Japanese counters!",
  skippedQuestionResult: "Alright! You'll see this question later in the quiz!",
  startQuiz: "Start Quiz!",
  studyPackName: (studyPack: StudyPack) => studyPack.englishName,
  studyPackSelectionHeader: "Study Packs",
  studyPackSelectionSubheader: "(select 1 or more)",
  studyPackSize: (size: number) =>
    size === 1 ? "1 counter" : `${size} counters`
};

export default ENGLISH;
