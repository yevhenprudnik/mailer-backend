export interface Config {
  server: {
    port: number;
  };
  db: {
    host: string;
    port: number;
    database: string;
    user: string;
    password: string;
  };
  smtp: {
    host: string;
    port: number;
    secure: boolean;
    auth: {
      user: string;
      pass: string;
    };
  };
  secret: string;
}
