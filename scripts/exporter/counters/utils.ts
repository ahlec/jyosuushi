import { DbCounterDisambiguation } from "../../database/schemas";

export function getOtherCounterId(
  counterId: string,
  disambiguation: DbCounterDisambiguation,
): string {
  return disambiguation.counter1_id === counterId
    ? disambiguation.counter2_id
    : disambiguation.counter1_id;
}
