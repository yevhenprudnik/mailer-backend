import { createClient } from 'redis';
import { Repository } from './db.d.ts';

export interface RepoWrapper<Entity> extends Repository<Entity> {
  findOneCached(definition: Partial<Entity>, ttl?: number): Promise<Entity>;
}

export function init(
  redis: ReturnType<typeof createClient>
): (repository: Repository<any>) => RepoWrapper<any>;
