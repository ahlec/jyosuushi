import Localization, {
  VARIABLE_ALEC_DEITLOFF,
  VARIABLE_ICON_CREDIT_LINK
} from "./index";

const ENGLISH: Localization = {
  alecDeitloff: "Alec Deitloff",
  countersDisplayHeader: "Counters",
  credits: [
    "Application designed and coded by ",
    VARIABLE_ALEC_DEITLOFF,
    ". Vector icons were taken from the ",
    VARIABLE_ICON_CREDIT_LINK,
    " collection."
  ],
  siteTagline: "Let's review Japanese counters!",
  startQuiz: "Start Quiz!",
  studyPackSelectionHeader: "Study Packs",
  studyPackSelectionSubheader: "(select 1 or more)",
  studyPackSize: (size: number) =>
    size === 1 ? "1 counter" : `${size} counters`
};

export default ENGLISH;
