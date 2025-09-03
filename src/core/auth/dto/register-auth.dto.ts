import { ApiProperty } from '@nestjs/swagger';
import { LoginAuthDto } from './login-auth.dto';

export class RegisterAuthDto extends LoginAuthDto {
  @ApiProperty({ example: 'Đức Trần' })
  name: string;

  @ApiProperty({ example: 25 })
  age: number;
}
