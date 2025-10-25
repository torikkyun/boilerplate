import { Command, CommandRunner } from 'nest-commander';
import { Injectable } from '@nestjs/common';
import { RegisterUserUseCase } from '@modules/user/application/use-cases/register-user.usecase';

@Command({
  name: 'seed-database',
  description: 'Seed dữ liệu mẫu vào database',
})
@Injectable()
export class SeedDatabaseCommand extends CommandRunner {
  constructor(private readonly registerUserUseCase: RegisterUserUseCase) {
    super();
  }

  async run(): Promise<void> {
    try {
      console.log('🌱 Bắt đầu seed dữ liệu...');

      // Seed admin user
      const adminUser = await this.registerUserUseCase.execute({
        email: 'admin@gmail.com',
        name: 'System Admin',
        password: 'Password123',
      });

      console.log(`✅ Admin user đã được tạo: ${adminUser.email.value}`);

      // Seed sample users
      const sampleUsers = [
        { email: 'user1@gmail.com', name: 'John Doe', password: 'Password123' },
        {
          email: 'user2@gmail.com',
          name: 'Jane Smith',
          password: 'Password123',
        },
      ];

      for (const userData of sampleUsers) {
        try {
          await this.registerUserUseCase.execute(userData);
          console.log(`👤 Người dùng đã được tạo: ${userData.email}`);
        } catch {
          console.log(`⚠️  User ${userData.email} đã tồn tại, bỏ qua...`);
        }
      }

      console.log('🎉 Quá trình seed dữ liệu đã hoàn tất!');
      process.exit(0);
    } catch (error) {
      console.error('❌ Lỗi khi seed dữ liệu:', error);
      process.exit(1);
    }
  }
}
