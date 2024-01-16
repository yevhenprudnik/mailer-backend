import { Repository } from '../../types/db.d.ts';
import { CacheStorage } from './cache-storage.d.ts';

export interface RepoWrapper<Entity> extends Repository<Entity> {
  findOneCached(definition: Partial<Entity>, ttl?: number): Promise<Entity>;
}

export function init(
  storage: CacheStorage
): (repository: Repository<any>) => RepoWrapper<any>;
