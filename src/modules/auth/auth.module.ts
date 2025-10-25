import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtTokenServiceImpl } from './infrastructure/jwt-token.service.impl';
import { TOKEN_SERVICE } from './application/ports/token.service.port';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET')!,
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRATION')!,
        },
      }),
    }),
  ],
  providers: [
    {
      provide: TOKEN_SERVICE,
      useClass: JwtTokenServiceImpl,
    },
  ],
  exports: [TOKEN_SERVICE],
})
export class AuthModule {}
