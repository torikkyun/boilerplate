import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { AuthenticationModule } from '@core/authentication/authentication.module';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { UserRepository } from './repositories/user.repository';
import { PrismaService } from '@core/prisma/prisma.service';

@Module({
  imports: [AuthenticationModule],
  controllers: [UsersController, AuthController],
  providers: [PrismaService, UsersService, AuthService, UserRepository],
})
export class UsersModule {}
