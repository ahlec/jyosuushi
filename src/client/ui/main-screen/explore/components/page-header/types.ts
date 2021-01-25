import { MessageDescriptor } from "react-intl";

export type HeaderColorTheme = "pink" | "blue" | "green";

export type AcceptedValueType = string | Date | number;

export interface HeaderSubtitleEntryDefinition {
  /**
   * A localized text descriptor that will be used to render this entry, and
   * which has various features provided to it natively.
   *
   * VARIABLES:
   * - `{value}`: A complex React node that is the localized and styled
   *   representation of {@link HeaderSubtitleEntryDefinition.value}
   *
   * RICH TEXT ELEMENTS:
   * - `<bold>`: Will make whatever text it wraps bold.
   */
  text: MessageDescriptor;

  /**
   * A unique ID that can be used for performance benefits and for uniquely
   * identifying this item when diffing (eg. React keys).
   */
  uniqueId: string;

  /**
   * The value of this entry. This will be provided to
   * {}
   */
  value: AcceptedValueType;
}
