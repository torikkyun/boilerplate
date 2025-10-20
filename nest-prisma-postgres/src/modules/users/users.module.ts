import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { RedisModule } from '@core/redis/redis.module';
import { AuthenticationModule } from '@core/authentication/authentication.module';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { UserRepository } from './repositories/user.repository';

@Module({
  imports: [AuthenticationModule, RedisModule],
  controllers: [UsersController, AuthController],
  providers: [UsersService, AuthService, UserRepository],
})
export class UsersModule {}
