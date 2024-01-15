import { Pool } from 'pg';

export interface Repository<Entity> {
  table: string,
  create(definition: Partial<Entity>): Promise<Entity>;
  update(id: number, definition: Partial<Entity>): Promise<Entity>;
  findMany(definition: Partial<Entity>): Promise<Entity[]>;
  findOne(definition: Partial<Entity>): Promise<Entity>;
  remove(id: number): Promise<boolean>;
}

export function init(pool: Pool): (table: string) => Repository<any>;
