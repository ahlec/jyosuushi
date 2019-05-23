import Localization from "../../../localization";

import KyotoJpg from "./kyoto.jpg";

export interface TutorialPage {
  getText: (localization: Localization) => string;
  image: string;
}

export const TUTORIAL_PAGES: ReadonlyArray<TutorialPage> = [
  {
    getText: localization => "hello world",
    image: KyotoJpg
  },
  {
    getText: localization => "then some more",
    image: KyotoJpg
  },
  {
    getText: localization => "thanks for reading!",
    image: KyotoJpg
  }
];
