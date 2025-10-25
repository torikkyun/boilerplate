import { Module } from '@nestjs/common';
import { AuthModule } from '@modules/auth/auth.module';
import { AuthController } from './presentation/auth.controller';
import { PrismaService } from '@core/database/prisma/prisma.service';
import { RegisterUserUseCase } from './application/use-cases/register-user.usecase';
import { LoginUserUseCase } from './application/use-cases/login-user.usecase';
import { PrismaUserRepositoryImpl } from './infrastructure/prisma-user.repository.impl';
import { USER_REPOSITORY } from './application/ports/user.repository.port';
import { JwtStrategy } from '@common/strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [AuthModule, PassportModule],
  controllers: [AuthController],
  providers: [
    PrismaService,
    {
      provide: USER_REPOSITORY,
      useClass: PrismaUserRepositoryImpl,
    },
    RegisterUserUseCase,
    LoginUserUseCase,
    JwtStrategy,
  ],
  exports: [USER_REPOSITORY],
})
export class UserModule {}
