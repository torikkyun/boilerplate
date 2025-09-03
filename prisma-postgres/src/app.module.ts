import { AuthModule } from '@core/auth/auth.module';
import { JwtGuard } from '@core/auth/guards/jwt.guard';
import { RolesGuard } from '@core/auth/guards/roles.guard';
import { UsersModule } from '@modules/users/users.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}.local`],
      expandVariables: true,
    }),
    AuthModule,
    UsersModule,
  ],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: JwtGuard,
    },
    {
      provide: 'APP_GUARD',
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
