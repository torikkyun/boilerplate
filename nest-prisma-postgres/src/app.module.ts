import { SeedDatabaseCommand } from '@commands/seed-database.command';
import { JwtGuard } from '@core/authentication/guards/jwt.guard';
import { RolesGuard } from '@core/authentication/guards/roles.guard';
import { PrismaService } from '@core/prisma/prisma.service';
import { ProfilesModule } from '@modules/profiles/profiles.module';
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
    UsersModule,
    ProfilesModule,
    // RedisModule,
  ],
  providers: [
    SeedDatabaseCommand,
    PrismaService,
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
