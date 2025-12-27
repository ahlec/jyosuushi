import { ActionDefinition } from "@jyosuushi/ui/components/Action";

export type TileActionCreatorFn = (
  counterId: string,
) => ActionDefinition<unknown>;
