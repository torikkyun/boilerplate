import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './models/users/users.module';
import { AuthModule } from './authentication/auth.module';
import { MySQLProviderModule } from './providers/database/mysql/provider.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV || 'development.local'}`],
      expandVariables: true,
    }),
    UsersModule,
    AuthModule,
    MySQLProviderModule,
  ],
})
export class AppModule {}
