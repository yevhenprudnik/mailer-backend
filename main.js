import * as fsp from 'node:fs/promises';
import path from 'node:path';
import pg from 'pg';
// import { createClient } from 'redis';
import config from './config.js';
import dbInitializer from './src/lib/db/db.js';
import utilsInitializer from './src/lib/utils.js';
import commonInitializer from './src/lib/common.js';
import serverInitializer from './src/lib/transport/http-server.js';
import mailerInitializer from './src/lib/mailer.js';
// import redisStorageInitializer from './src/lib/db/cache/redis-storage.js';
// import cacheWrapperInitializer from './src/lib/db/cache/cache-wrapper.js';
/**
 * @typedef {import('./src/lib/db/types/db.d.ts').Repository<any>} Repository
 * @typedef {import('./src/useCases/types/useCase.js').UseCasesContainer} UseCasesContainer
 */

// const client = createClient();
// client.on('error', (err) => console.log('Redis Client Error', err));
// await client.connect();
// const redis = redisStorageInitializer.init(client);
// const cacheWrapper = cacheWrapperInitializer.init(redis);
// NOSONAR
// import mapStorageInitializer from './src/lib/db/cache/map-storage.js'
// const mapStorage = mapStorageInitializer.init(new Map())
// const cacheWrapper = cacheWrapperInitializer.init(mapStorage);

const db = dbInitializer.init(new pg.Pool(config.db));
/** @type {Record<string, Repository>} */
const repositories = {};
const entitiesFiles = await fsp.readdir('./src/entities');
for (const name of entitiesFiles) {
  const tableName = path.basename(name, '.d.ts');
  const repoKey = tableName + 'Repo';
  repositories[repoKey] = db(tableName); // repositories[repoKey] = cacheWrapper(db(tableName));
}

const mailer = mailerInitializer.init({ config: config.smtp });
const utils = utilsInitializer.init();
const common = commonInitializer.init({
  userRepo: repositories.userRepo,
  config,
  utils,
});

/** @type {Record<string, UseCasesContainer>} */
const useCasesContainer = {};
const useCasesFiles = await fsp.readdir('./src/useCases');
for (const name of useCasesFiles) {
  if (name.endsWith('.js')) {
    const caseName = path.basename(name, '.js');

    useCasesContainer[caseName] = (await import(`./src/useCases/${name}`)).init(
      { common, utils: { ...utils, mailer }, ...repositories },
    );
  }
}

const server = serverInitializer.init({ useCasesContainer, common, utils });

server.listen(config.server.port, () => {
  console.log('Server started on port 8080...');
});
