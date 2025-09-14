import { Command, CommandRunner } from 'nest-commander';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@core/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Command({
  name: 'seed-database',
  description: 'Seed dữ liệu mẫu vào database',
})
@Injectable()
export class SeedDatabaseCommand extends CommandRunner {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async run(
    passedParams: string[],
    options?: Record<string, any>,
  ): Promise<void> {
    const passwordHash = bcrypt.hashSync('123456', 10);

    try {
      await this.prisma.profile.deleteMany();
      await this.prisma.user.deleteMany();

      const adminUser = await this.prisma.user.create({
        data: {
          email: 'admin@example.com',
          name: 'System Admin',
          password: passwordHash,
          Profile: {
            create: {
              age: 30,
              bio: 'System administrator account',
            },
          },
        },
        include: { Profile: true },
      });

      console.log(`✅ Admin user đã được tạo: ${adminUser.email}`);

      const sampleUsers = [
        { email: 'user1@example.com', name: 'John Doe', age: 25 },
        { email: 'user2@example.com', name: 'Jane Smith', age: 28 },
      ];

      for (const userData of sampleUsers) {
        await this.prisma.user.create({
          data: {
            email: userData.email,
            name: userData.name,
            password: passwordHash,
            Profile: {
              create: { age: userData.age },
            },
          },
        });
        console.log(`👤 Người dùng đã được tạo: ${userData.email}`);
      }

      console.log('🎉 Quá trình seed dữ liệu đã hoàn tất!');
    } catch (error) {
      console.error('❌ Lỗi khi seed dữ liệu:', error);
      process.exit(1);
    }
  }
}
