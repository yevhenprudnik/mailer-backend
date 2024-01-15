import { Repository } from './db.d.ts';

export interface RepoWrapper<Entity> extends Repository<Entity> {
  findOneCached(definition: Partial<Entity>): Promise<Entity>;
}

export function init(repository: Repository<any>): RepoWrapper<any>;
