import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { DatabaseModule } from '@core/database/database.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from '@common/guards/jwt.guard';
import { RoleModule } from './modules/role/role.module';
import configuration from './config/configuration';
import { RolesGuard } from '@common/guards/roles.guard';
import { RedisModule } from '@core/cache/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    DatabaseModule,
    RedisModule,
    RoleModule,
    UserModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
