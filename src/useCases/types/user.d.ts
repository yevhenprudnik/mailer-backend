import { Utils } from '../../lib/types/utils.d.ts';
import { User } from '../../entities/user.d.ts';
import { Repository } from '../../lib/types/db.d.ts';
import { UseCase } from './useCase.d.ts';

interface Deps {
  userRepo: Repository<User>;
  utils: Utils;
}

interface UserCases {
  me: UseCase<{}, Promise<Partial<User>>>;
  search: UseCase<Partial<User>, Promise<User[]>>;
}

export function init(deps: Deps): UserCases;
