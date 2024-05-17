import * as env from 'dotenv';
env.config({ path: './.env' });

/** @type {import('./types/config.d.ts').Config} */
export default {
  server: {
    port: 8080,
  },
  db: {
    host: process.env.DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME || 'postgres',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
  },
  secret: 'SUPER_SECRET',
};
