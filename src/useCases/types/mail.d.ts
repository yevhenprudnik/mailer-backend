import { Mail, CreateMail, UpdateMail } from '../../entities/mail.d.ts';
import { Topic } from '../../entities/topic.d.ts';
import { UseCase } from './useCase.d.ts';
import { Utils } from '../../lib/types/utils.d.ts';
import { RepoWrapper } from '../../lib/db/cache/types/cache-wrapper.d.ts';
import { User } from '../../entities/user.js';

interface Deps {
  topicRepo: RepoWrapper<Topic>;
  mailRepo: RepoWrapper<Mail>;
  userRepo: RepoWrapper<User>;
  utils: Utils;
}

interface MailCases {
  create: UseCase<CreateMail, Promise<Mail>>;
  update: UseCase<{ id: number } & UpdateMail, Promise<Mail>>;
  search: UseCase<Partial<Mail>, Promise<Mail[]>>;
  delete: UseCase<{ id: number }, Promise<{ deleted: boolean }>>;
  publish: UseCase<{ id: number }, Promise<{ published: boolean }>>;
}

export function init(deps: Deps): MailCases;
