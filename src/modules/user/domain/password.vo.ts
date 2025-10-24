import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export class PasswordVO {
  private constructor(public readonly value: string) {}

  static async create(password: string): Promise<PasswordVO> {
    if (!PasswordVO.isStrong(password)) {
      throw new BadRequestException('Mật khẩu không đủ mạnh');
    }
    const hashed = await bcrypt.hash(password, 10);
    return new PasswordVO(hashed);
  }

  static isStrong(password: string): boolean {
    // Tối thiểu 8 ký tự, có chữ hoa, chữ thường, số
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
  }

  async compare(plain: string): Promise<boolean> {
    return await bcrypt.compare(plain, this.value);
  }

  static fromHash(hashed: string): PasswordVO {
    return new PasswordVO(hashed);
  }
}
