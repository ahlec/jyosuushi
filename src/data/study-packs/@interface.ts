import { Counter, Item } from "../../redux";

export { Counter, Item };

export interface StudyPack {
  packId: string;
  englishName: string;
  counters: ReadonlyArray<Counter>;
}
