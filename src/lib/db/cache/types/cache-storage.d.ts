import { createClient } from 'redis';

export interface CacheStorage {
  get(key: string): object | null | Promise<object | null>;
  set(key: string, value: object, ttl?): object | Promise<object>;
}

export function mapStorageInitializer(storage: Map<string, any>): CacheStorage;

export function redisStorageInitializer(
  storage: ReturnType<typeof createClient>
): CacheStorage;
