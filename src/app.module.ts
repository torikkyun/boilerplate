import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from './core/prisma/prisma.module';
import { AuthModule } from './core/auth/auth.module';

@Module({
  imports: [UsersModule, PrismaModule, AuthModule],
})
export class AppModule {}
