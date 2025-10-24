import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
  constructor(private readonly jwtService: JwtService) {}

  async generateAccessToken(id: string): Promise<string> {
    const payload = { id };
    return this.jwtService.signAsync(payload);
  }
}
