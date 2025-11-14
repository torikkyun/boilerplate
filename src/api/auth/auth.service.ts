import { ConflictException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { Repository } from "typeorm";
import { Role } from "../role/entities/role.entity";
import { User } from "../user/entities/user.entity";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";

@Injectable()
export class AuthService {
  private readonly jwtService: JwtService;
  private readonly userRepository: Repository<User>;
  private readonly roleRepository: Repository<Role>;

  constructor(
    jwtService: JwtService,
    @InjectRepository(User)
    userRepository: Repository<User>,
    @InjectRepository(Role)
    roleRepository: Repository<Role>
  ) {
    this.jwtService = jwtService;
    this.userRepository = userRepository;
    this.roleRepository = roleRepository;
  }

  async register({ email, password, ...rest }: RegisterDto) {
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException("Email đã được đăng ký");
    }

    const role = await this.roleRepository.findOne({ where: { name: "user" } });
    if (!role) {
      throw new ConflictException("Vai trò mặc định không tồn tại");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User();
    user.email = email;
    user.password = hashedPassword;
    user.role = role;
    Object.assign(user, rest);

    await this.userRepository.save(user);

    return {
      message: "Đăng ký thành công",
      user: { id: user.id, email: user.email },
    };
  }

  async login({ email, password }: LoginDto) {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: { role: true },
    });
    if (!user) {
      throw new ConflictException("Email hoặc mật khẩu không đúng");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new ConflictException("Email hoặc mật khẩu không đúng");
    }

    const token = this.jwtService.sign({
      id: user.id,
      role: { name: user.role.name },
    });

    return {
      message: "Đăng nhập thành công",
      token,
    };
  }
}
