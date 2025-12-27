import { PageDefinition } from "@jyosuushi/ui/types";

import ExplorePage from "./ExplorePage";
import { EXPLORE_PAGE_PATH } from "./pathing";

export const EXPLORE_PAGE: PageDefinition = {
  component: ExplorePage,
  primaryPath: EXPLORE_PAGE_PATH,
};
