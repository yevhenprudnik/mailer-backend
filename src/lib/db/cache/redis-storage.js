/** @type {import('./types/cache-storage.d.ts').redisStorageInitializer}  */
const init = (storage) => ({
  async get(key) {
    const record = await storage.get(key);
    if (record) return JSON.parse(record);

    return null;
  },

  async set(key, value, ttl) {
    await storage.set(key, JSON.stringify(value));
    await storage.expire(key, ttl);

    return value;
  },
});

export default { init };
