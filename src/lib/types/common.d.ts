import { IncomingHttpHeaders } from 'node:http';
import { User } from '../../entities/user.d.ts';
import { Repository } from './db.d.ts';
import { Utils } from './utils.d.ts';
import { Session } from '../../useCases/types/useCase.d.ts';
import { Config } from '../../../types/config.d.ts';

interface Deps {
  userRepo: Repository<User>;
  utils: Utils;
  config: Config;
}

export class Common {
  generateSession(user: User): Promise<Session>;
  validateSession(headers: IncomingHttpHeaders): Promise<Session>;
}

export function init(deps: Deps): Common;
