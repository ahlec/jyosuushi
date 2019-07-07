module.exports = {
  name: "Counters without packs",
  run: async function countersWithoutPacks(db) {
    const dbPackContents = await db.all(
      "SELECT counter_id FROM study_pack_contents"
    );
    const counters = await db.all("SELECT counter_id FROM counters");

    const packContents = new Set();
    for (const { counter_id } of dbPackContents) {
      packContents.add(counter_id);
    }

    const results = [];
    for (const { counter_id } of counters) {
      if (!packContents.has(counter_id)) {
        results.push({
          id: counter_id,
          message: "Does not belong to any study packs",
          type: "warning"
        });
      }
    }

    return results;
  }
};
