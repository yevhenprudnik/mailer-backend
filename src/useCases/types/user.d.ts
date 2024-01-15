import { Utils } from '../../lib/types/utils.d.ts';
import { User } from '../../entities/user.d.ts';
import { RepoWrapper } from '../../lib/db/types/cache-wrapper.d.ts';
import { UseCase } from './useCase.d.ts';

interface Deps {
  userRepo: RepoWrapper<User>;
  utils: Utils;
}

interface UserCases {
  me: UseCase<{}, Promise<Partial<User>>>;
  search: UseCase<Partial<User>, Promise<User[]>>;
}

export function init(deps: Deps): UserCases;
