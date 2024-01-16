/** @type {import('./types/cache-storage.d.ts').mapStorageInitializer}  */
const init = (storage) => ({
  get(key) {
    const record = storage.get(key);
    if (!record) return null;
    if (record.ttl < Date.now()) {
      storage.delete(key);
      return null;
    }

    return record ?? null;
  },

  set(key, value, ttl) {
    const record = { ...value, ttl: Date.now() + ttl * 1000 };

    storage.set(key, record);
    return record;
  },
});

export default { init };
