import { ProductionVariable } from "../utils";

export interface CounterComponentsLookup {
  disambiguationComponents: { [otherCounterId: string]: ProductionVariable };
  notesComponent: ProductionVariable | null;
}
