import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SeedDatabaseCommand } from './seed-database.command';
import { UserModule } from '@modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}.local`,
      expandVariables: true,
    }),
    UserModule,
  ],
  providers: [SeedDatabaseCommand],
})
export class CommandModule {}
