import { User } from '../../entities/user.d.ts';
import { Common } from '../../lib/types/common.d.ts';
import { Repository } from '../../lib/types/db.d.ts';
import { Utils } from '../../lib/types/utils.d.ts';
import { Session, UseCase } from './useCase.d.ts';

interface Deps {
  userRepo: Repository<User>;
  common: Common;
  utils: Utils;
}

interface AuthCases extends Record<string, UseCase> {
  signIn: UseCase<{ email: string; password: string }, Promise<Session>>;
  signUp: UseCase<
    { email: string; username: string; password: string },
    Promise<Session>
  >;
}

export function init(deps: Deps): AuthCases;
