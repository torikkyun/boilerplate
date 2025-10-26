import { BaseEntity } from '@core/database/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';

@Entity('roles')
export class Role extends BaseEntity {
  @Column({ unique: true })
  @ApiProperty({
    example: 'admin',
  })
  name: string;

  @Column({ nullable: true })
  @ApiProperty({
    example: 'Quản trị viên hệ thống',
    required: false,
  })
  description?: string;
}
