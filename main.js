import * as fsp from 'node:fs/promises';
import path from 'node:path';
import pg from 'pg';
import config from './config.js';
import dbInitializer from './src/lib/db/db.js';
import utilsInitializer from './src/lib/utils.js';
import commonInitializer from './src/lib/common.js';
import serverInitializer from './src/lib/transport/http-server.js';
import { wrapper } from './src/lib/db/cache-wrapper.js';
/**
 * @typedef {import('./src/lib/db/types/db.d.ts').Repository<any>} Repository
 * @typedef {import('./src/useCases/types/useCase.js').UseCasesContainer} UseCasesContainer
 */

const db = dbInitializer.init(new pg.Pool(config.db));
/** @type {Record<string, Repository>} */
const repositories = {};
const entitiesFiles = await fsp.readdir('./src/entities');
for (const name of entitiesFiles) {
  const tableName = path.basename(name, '.d.ts');
  const repoKey = tableName + 'Repo';
  const repo = db(tableName);
  repositories[repoKey] = { ...repo, ...wrapper(repo) };
}

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
      { common, utils, ...repositories }
    );
  }
}

const server = serverInitializer.init({ useCasesContainer, common, utils });

server.listen(config.server.port, () => {
  console.log('Server started on port 3000...');
});
