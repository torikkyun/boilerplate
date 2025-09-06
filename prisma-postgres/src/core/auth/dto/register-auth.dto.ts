import { ApiProperty } from '@nestjs/swagger';
import { LoginAuthDto } from './login-auth.dto';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterAuthDto extends LoginAuthDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @MinLength(2)
  @ApiProperty({ example: 'Đức Trần' })
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 25 })
  age: number;
}
