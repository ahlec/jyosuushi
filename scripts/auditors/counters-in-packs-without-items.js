module.exports = {
  name: "Counters without packs",
  run: async function countersWithoutPacks(db) {
    const packContents = await db.all(
      "SELECT counter_id FROM study_pack_contents"
    );
    const itemCounters = await db.all("SELECT counter_id FROM item_counters");
    const counters = await db.all("SELECT counter_id FROM counters");

    const inStudyPack = new Set();
    for (const { counter_id } of packContents) {
      inStudyPack.add(counter_id);
    }

    const hasItem = new Set();
    for (const { counter_id } of itemCounters) {
      hasItem.add(counter_id);
    }

    const results = [];
    for (const { counter_id } of counters) {
      if (!inStudyPack.has(counter_id)) {
        continue;
      }

      if (!hasItem.has(counter_id)) {
        results.push({
          id: counter_id,
          message: "Included in a study pack but does not define any items",
          type: "error"
        });
      }
    }

    return results;
  }
};
