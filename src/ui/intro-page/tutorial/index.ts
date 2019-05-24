import Localization from "../../../localization";

import KyotoJpg from "./kyoto.jpg";

export interface TutorialPage {
  getText: (localization: Localization) => string;
  image: string;
}

export const TUTORIAL_PAGES: ReadonlyArray<TutorialPage> = [
  {
    getText: localization => localization.tutorialPage1,
    image: KyotoJpg
  },
  {
    getText: localization => localization.tutorialPage2,
    image: KyotoJpg
  },
  {
    getText: localization => localization.tutorialPage3,
    image: KyotoJpg
  },
  {
    getText: localization => localization.tutorialPage4,
    image: KyotoJpg
  },
  {
    getText: localization => localization.tutorialPage5,
    image: KyotoJpg
  },
  {
    getText: localization => localization.tutorialPage6,
    image: KyotoJpg
  }
];
