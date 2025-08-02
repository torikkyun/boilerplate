import { Module } from '@nestjs/common';
import { UsersModule } from './models/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        process.env.NODE_ENV === 'production'
          ? '.env'
          : '.env.development.local',
      ],
      expandVariables: true,
    }),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
