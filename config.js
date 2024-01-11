/** @type {import('./types/config.d.ts').Config} */
export default {
  server: {
    port: 3000,
  },
  db: {
    host: '127.0.0.1',
    port: 5432,
    database: 'mailer',
    user: 'postgres',
    password: 'postgres',
  },
  secret: 'SUPER_SECRET',
};
