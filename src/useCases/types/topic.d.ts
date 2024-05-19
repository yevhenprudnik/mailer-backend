import { CreateTopic, Topic, UpdateTopic } from '../../entities/topic.d.ts';
import { Subscription } from '../../entities/subscription.d.ts';
import { Utils } from '../../lib/types/utils.d.ts';
import { RepoWrapper } from '../../lib/db/cache/types/cache-wrapper.d.ts';
import { UseCase } from './useCase.d.ts';
import { User } from '../../entities/user.js';

interface Deps {
  topicRepo: RepoWrapper<Topic>;
  userRepo: RepoWrapper<User>,
  subscriptionRepo: RepoWrapper<Subscription>;
  utils: Utils;
}

interface TopicCases {
  create: UseCase<CreateTopic, Promise<Topic>>;
  update: UseCase<{ id: number } & UpdateTopic, Promise<Topic>>;
  search: UseCase<Partial<Topic>, Promise<Topic[]>>;
  delete: UseCase<{ id: number }, Promise<{ deleted: boolean }>>;
  subscribe: UseCase<{ id: number }, Promise<{ subscribed: boolean }>>;
  unsubscribe: UseCase<{ id: number }, Promise<{ unsubscribed: boolean }>>;
}

export function init(deps: Deps): TopicCases;
