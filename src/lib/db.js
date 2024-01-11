/** @type {import('./types/db.d.ts').init} */
const init = (pool) => (table) => ({
  async create(definition) {
    const keys = Object.keys(definition)
      .map((key) => `"${key}"`)
      .join(', ');
    const placeholders = Object.keys(definition)
      .map((_key, index) => {
        return `$${index + 1}`;
      })
      .join(', ');
    const values = Object.values(definition);
    const insertQuery = `INSERT INTO "${table}"(${keys}) VALUES (${placeholders}) RETURNING *`;
    const result = await pool.query(insertQuery, values);

    return result.rows[0];
  },

  async update(id, definition) {
    const updateKeys = Object.keys(definition)
      .map((key, index) => `"${key}" = $${index + 1}`)
      .join(', ');
    const updateValues = Object.values(definition);
    updateValues.push(id);
    const updateQuery = `UPDATE "${table}" SET ${updateKeys} WHERE id = $${updateValues.length} RETURNING *`;
    const result = await pool.query(updateQuery, updateValues);

    return result.rows[0];
  },

  async findMany(definition = {}) {
    const conditions = Object.keys(definition)
      .map((key, index) => `"${key}" = $${index + 1}`)
      .join(' AND ');
    const values = Object.values(definition);
    const withConditions = conditions.length ? `WHERE ${conditions}` : '';
    const findQuery = `SELECT * FROM "${table}"${withConditions}`;
    const result = await pool.query(findQuery, values);

    return result.rows;
  },

  async findOne(definition = {}) {
    const conditions = Object.keys(definition)
      .map((key, index) => `"${key}" = $${index + 1}`)
      .join(' AND ');
    const values = Object.values(definition);
    const withConditions = conditions.length ? `WHERE ${conditions}` : '';
    const findQuery = `SELECT * FROM "${table}" ${withConditions} LIMIT 1`;
    const result = await pool.query(findQuery, values);

    return result.rows[0];
  },

  async remove(id) {
    const deleteQuery = `DELETE FROM "${table}" WHERE id = $1`;
    const result = await pool.query(deleteQuery, [id]);

    return result.rowCount !== null && result.rowCount > 0;
  },
});

export default { init };
