import { createServer } from 'node:http';
import { ApiException } from '../utils.js';
import { DEFAULT_SESSION, DEFAULT_HEADERS } from '../constants.js';

/** @type {import('./types/http-server.d.ts').init} */
const init = ({ useCasesContainer, common, utils }) =>
  createServer(async (req, res) => {
    try {
      const { url, headers, method } = req;
      if (method === 'OPTIONS') {
        res.writeHead(204, DEFAULT_HEADERS);
        return res.end();
      }
      if (!url) throw utils.exception.notFound();
      const [domain, action, id] = url.substring(1).split('/');
      const domainCases = useCasesContainer[domain];
      if (!domainCases) throw utils.exception.notFound();
      const useCase = domainCases[action];
      if (!useCase) throw utils.exception.notFound();
      const { handler, access } = useCase;
      if (!handler) throw utils.exception.notFound();
      const args = {};
      if (id) args.id = id;
      const session =
        access && access !== 'none'
          ? await common.validateSession(headers)
          : DEFAULT_SESSION;
      if (method !== 'GET') Object.assign(args, await utils.receiveArgs(req));
      const result = await handler(session, args);
      res.writeHead(200, DEFAULT_HEADERS);
      res.end(JSON.stringify(result));
    } catch (err) {
      console.log(err);
      if (err instanceof ApiException) {
        res.writeHead(err.statusCode || 500, DEFAULT_HEADERS);
        return res.end(err.message || 'Internal Server Error');
      }
      res.writeHead(500, DEFAULT_HEADERS);
      return res.end('Internal Server Error');
    }
  });

export default { init };
