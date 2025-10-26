import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '@core/database/base.entity';
import { Role } from '@modules/role/entities/role.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({ unique: true })
  @ApiProperty({
    example: 'user@example.com',
  })
  email: string;

  @Column()
  @ApiProperty({
    example: 'password123',
  })
  password: string;

  @Column()
  @ApiProperty({
    example: 'John',
  })
  firstName: string;

  @Column()
  @ApiProperty({
    example: 'Doe',
  })
  lastName: string;

  @Column({ nullable: true })
  @ApiProperty({
    example: '+1234567890',
    required: false,
  })
  phoneNumber?: string;

  @Column({ default: true })
  @ApiProperty({
    example: true,
    default: true,
  })
  isActive: boolean;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role_id' })
  @ApiProperty({ type: () => Role })
  role: Role;
}
