import {
  ConflictException,
  Injectable,
  Logger,
  OnModuleInit,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { comparePassword, hashPassword } from "src/common/utils/hash.util";
import { PrismaService } from "src/database/prisma.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";

@Injectable()
export class AuthService implements OnModuleInit {
  private readonly logger = new Logger(AuthService.name);
  private defaultRoleId: string;

  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  private generateAccessToken(userId: string): string {
    return this.jwtService.sign({ id: userId });
  }

  async onModuleInit() {
    try {
      this.logger.log("Initializing AuthService...");
      const defaultRole = await this.prisma.role.findUnique({
        where: { name: "user" },
      });

      if (!defaultRole) {
        this.logger.error(
          "Default role user not found in the database. Please run seed script: pnpm run seed:dev",
        );
        throw new Error("Default role user not found in the database");
      }

      this.defaultRoleId = defaultRole.id;
      this.logger.log("AuthService initialized successfully");
    } catch (error) {
      this.logger.error("Failed to initialize AuthService", error);
      throw error;
    }
  }

  async register({ email, password, ...rest }: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException("Email đã được đăng ký");
    }

    const role = await this.prisma.role.findUnique({ where: { name: "user" } });
    if (!role) {
      throw new ConflictException("Vai trò mặc định không tồn tại");
    }

    const hashedPassword = hashPassword(password);

    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        roleId: role.id,
        avatar: `https://api.dicebear.com/9.x/identicon/svg?seed=${encodeURIComponent(email)}&background=%23ffffff`,
        ...rest,
      },
    });

    return {
      message: "Đăng ký thành công",
      user: { id: user.id, email: user.email },
    };
  }

  async login({ email, password }: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { role: true },
    });
    if (!user) {
      throw new ConflictException("Email hoặc mật khẩu không đúng");
    }

    const isPasswordValid = comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new ConflictException("Email hoặc mật khẩu không đúng");
    }

    const accessToken = this.generateAccessToken(user.id);

    return {
      message: "Đăng nhập thành công",
      accessToken,
    };
  }
}
