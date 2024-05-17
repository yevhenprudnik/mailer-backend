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
  smtp: {
    host: process.env.SMTP_HOST || '',
    port:  parseInt(process.env.SMTP_PORT || '0'),
    secure: process.env.SMTP_PORT === 'true',
    auth: {
      user: process.env.SMTP_USER || '',
      pass: process.env.SMTP_PASS || '',
    },
  },
  secret: 'SUPER_SECRET',
};
