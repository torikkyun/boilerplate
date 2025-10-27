import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../entities/user.entity';
import { FindOptionsWhere, ILike } from 'typeorm';
import { QueryUserDto } from '../dto/query-user.dto';
import { RoleRepository } from '@modules/role/repositories/role.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly roleRepository: RoleRepository,
  ) {}

  async onModuleInit() {
    const existingUser = await this.userRepository.findOne({
      email: 'admin@gmail.com',
    });

    const adminRole = await this.roleRepository.findOne({
      name: 'admin',
    });

    if (!existingUser) {
      await this.userRepository.create({
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('Thisisapassword123', 10),
        firstName: 'Admin',
        lastName: 'User',
        role: adminRole!,
      });
    }
  }

  async findAll({ page, limit, search }: QueryUserDto): Promise<{
    data: User[];
    total: number;
    page: number;
    limit: number;
  }> {
    let where: FindOptionsWhere<User> | FindOptionsWhere<User>[] = {};
    if (search) {
      where = [
        { email: ILike(`%${search}%`) },
        { firstName: ILike(`%${search}%`) },
        { lastName: ILike(`%${search}%`) },
      ] as FindOptionsWhere<User>[];
    }
    return this.userRepository.paginate(page, limit, where);
  }
}
