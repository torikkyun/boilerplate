import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from '@core/auth/auth.module';
import { AuthController } from './presentation/auth.controller';
import { PrismaService } from '@core/database/prisma/prisma.service';
import { RegisterUserUseCase } from './application/use-cases/register-user.usecase';
import { LoginUserUseCase } from './application/use-cases/login-user.usecase';
import { PrismaUserRepositoryImpl } from './infrastructure/prisma-user.repository.impl';
import { USER_REPOSITORY } from './application/ports/user.repository.port';
import { AuthRepositoryImpl } from './infrastructure/auth.repository.impl';
import { AUTH_SERVICE } from '@core/auth/interfaces/auth-service.interface';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [AuthController],
  providers: [
    PrismaService,
    {
      provide: USER_REPOSITORY,
      useClass: PrismaUserRepositoryImpl,
    },
    {
      provide: AUTH_SERVICE,
      useClass: AuthRepositoryImpl,
    },
    RegisterUserUseCase,
    LoginUserUseCase,
  ],
  exports: [AUTH_SERVICE],
})
export class UserModule {}
