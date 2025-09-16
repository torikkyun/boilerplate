import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import KeyvRedis from '@keyv/redis';
import { Keyv } from 'keyv';
import { CacheableMemory } from 'cacheable';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisService } from './redis.service';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          stores: [
            new Keyv({
              store: new CacheableMemory({
                ttl: configService.get<number>('CACHE_TTL')!,
                lruSize: configService.get<number>('CACHE_LRU_SIZE')!,
              }),
            }),
            new KeyvRedis(configService.get<string>('REDIS_URL')),
          ],
        };
      },
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
