import { User } from '../../entities/user.d.ts';
import { Common } from '../../lib/types/common.d.ts';
import { RepoWrapper } from '../../lib/db/cache/types/cache-wrapper.d.ts';
import { Utils } from '../../lib/types/utils.d.ts';
import { Session, UseCase } from './useCase.d.ts';

interface Deps {
  userRepo: RepoWrapper<User>;
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
