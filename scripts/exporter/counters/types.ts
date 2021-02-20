import { DbCounterExternalLink } from "../../database/schemas";
import { ProductionVariable } from "../utils";

export interface CounterComponentsLookup {
  disambiguationComponents: { [otherCounterId: string]: ProductionVariable };
  notesComponent: ProductionVariable | null;
}

export interface PreparedCounterExternalLink
  extends Omit<DbCounterExternalLink, "description"> {
  description: ProductionVariable;
}
