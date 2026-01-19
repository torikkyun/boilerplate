import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";
import { JwtGuard } from "./common/guards/jwt.guard";
import { RolesGuard } from "./common/guards/roles.guard";
import configuration from "./config/configuration";
import jwtConfig from "./config/jwt.config";
import redisConfig from "./config/redis.config";
import { PrismaModule } from "./database/prisma.module";
import { HealthModule } from "./infrastructure/health/health.module";
import { LoggerModule } from "./infrastructure/logging/logger.module";
import { AuthModule } from "./modules/auth/auth.module";
import { RoleModule } from "./modules/role/role.module";
import { UserModule } from "./modules/user/user.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration, redisConfig, jwtConfig],
    }),
    PrismaModule,
    // RedisModule,
    LoggerModule,
    HealthModule,
    AuthModule,
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
