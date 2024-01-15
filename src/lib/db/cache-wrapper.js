/** @type {Record<string, any>} */
const cache = {};

/** @type {import('./types/cache-wrapper.d.ts').init} */
export const wrapper = (repo) => ({
  findOneCached: async (definition) => {
    if (!definition.id) return repo.findOne(definition);
    const key = `${repo.table}:${definition.id}`;
    if (key in cache) return cache[key];
    cache[key] = await repo.findOne(definition);

    return cache[key];
  },

  ...repo,
});
