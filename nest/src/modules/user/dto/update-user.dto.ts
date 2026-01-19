import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, MinLength } from "class-validator";

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  name?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  avatar?: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  @ApiPropertyOptional()
  password?: string;
}
