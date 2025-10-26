import { Injectable } from '@nestjs/common';
import { RoleRepository } from './repositories/role.repository';

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async onModuleInit() {
    const adminRole = await this.roleRepository.findOne({ name: 'admin' });

    if (!adminRole) {
      await this.roleRepository.create({
        name: 'admin',
        description: 'Quản trị viên với toàn quyền hạn',
      });
    }

    const userRole = await this.roleRepository.findOne({ name: 'user' });

    if (!userRole) {
      await this.roleRepository.create({
        name: 'user',
        description: 'Người dùng bình thường với quyền hạn hạn chế',
      });
    }
  }
}
