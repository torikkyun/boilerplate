import { SeedDatabaseCommand } from '@commands/seed-database.command';
import { AuthenticationModule } from '@core/authentication/authentication.module';
import { JwtGuard } from '@core/authentication/guards/jwt.guard';
import { RolesGuard } from '@core/authentication/guards/roles.guard';
import { PrismaService } from '@core/database/prisma/prisma.service';
import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}.local`],
      expandVariables: true,
    }),
    UserModule,
  ],
  providers: [
    SeedDatabaseCommand,
    PrismaService,
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
