/* eslint-disable @typescript-eslint/no-explicit-any */
// Changes from Jyosuushi v4.0.1 -> v4.1.0:
//   - Added settings.failOnUncommonReadings

export default function migrateV2(state: any): any {
  const { ...rest } = state ?? {};
  return {
    ...rest,
    settings: {
      ...state.settings,
      failOnUncommonReadings: true,
    },
  };
}
