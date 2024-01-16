/** @type {import('./types/cache-wrapper.d.ts').init} */
const init = (storage) => (repo) => ({
  findOneCached: async (definition, ttl = 60) => {
    if (!definition.id) return repo.findOne(definition);
    const key = `${repo.table}:${definition.id}`;
    const cached = await storage.get(key);
    if (cached) return cached;
    const record = await repo.findOne(definition);
    await storage.set(key, record, ttl);

    return record;
  },

  ...repo,
});

export default { init };
