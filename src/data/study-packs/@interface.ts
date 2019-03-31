import { Counter, Item } from "../../redux";

export { Counter, Item };

export interface StudyPack {
  packId: string;
  name: string;
  counters: ReadonlyArray<Counter>;
}
