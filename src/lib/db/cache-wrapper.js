/** @type {import('./types/cache-wrapper.d.ts').init} */
const init = (redis) => (repo) => ({
  findOneCached: async (definition, ttl = 60) => {
    if (!definition.id) return repo.findOne(definition);
    const key = `${repo.table}:${definition.id}`;
    const cached = await redis.get(key);
    if (cached)return JSON.parse(cached);
    const record = await repo.findOne(definition);
    await redis.set(key, JSON.stringify(record));
    await redis.expire(key, ttl);

    return record;
  },

  ...repo,
});

export default { init };
