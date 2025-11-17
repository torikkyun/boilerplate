import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { PaginationQueryDto } from "src/common/dto/pagination-query.dto";

export class QueryUserDto extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  search?: string;
}
