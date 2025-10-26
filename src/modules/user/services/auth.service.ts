import { ConflictException, Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { RegisterDto } from '../dto/register-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { Role } from '@modules/role/entities/role.entity';
import { RoleRepository } from '@modules/role/repositories/role.repository';

@Injectable()
export class AuthService {
  private defaultRole: Role;
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
    private readonly roleRepository: RoleRepository,
  ) {}

  async onModuleInit() {
    const foundRole = await this.roleRepository.findOne({
      name: 'user',
    });
    if (!foundRole) {
      throw new Error(
        "Role 'user' không tồn tại. Vui lòng khởi tạo role trước khi đăng ký người dùng.",
      );
    }
    this.defaultRole = foundRole;
  }

  async register({ email, password, ...rest }: RegisterDto) {
    const existingUser = await this.userRepository.findOne({
      email,
    });

    if (existingUser) {
      throw new ConflictException('Email đã được đăng ký');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userRepository.create({
      email,
      password: hashedPassword,
      ...rest,
      role: this.defaultRole,
    });

    return {
      message: 'Đăng ký thành công',
      user: { id: user.id, email: user.email },
    };
  }

  async login({ email, password }: LoginDto) {
    const user = await this.userRepository.findOne(
      {
        email,
      },
      ['role'],
    );
    if (!user) {
      throw new ConflictException('Email hoặc mật khẩu không đúng');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new ConflictException('Email hoặc mật khẩu không đúng');
    }

    const token = this.jwtService.sign({ id: user.id, role: user.role.name });

    return {
      message: 'Đăng nhập thành công',
      user: { id: user.id, email: user.email },
      token,
    };
  }
}
