import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable } from "@nestjs/common";
import { Cache } from "cache-manager";

@Injectable()
class CacheManager {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async get(key: string) {
    await this.cacheManager.get(key);
  }

  async set(key: string, value: string) {
    await this.cacheManager.set(key, value);

  }
}

export default CacheManager