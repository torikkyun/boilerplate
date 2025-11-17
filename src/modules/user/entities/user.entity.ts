import { Exclude, Type } from "class-transformer";
import { RoleEntity } from "src/modules/role/entities/role.entity";

export class UserEntity {
  id: string;
  email: string;
  name: string;
  @Exclude()
  password: string;
  @Exclude()
  roleId: string;
  @Type(() => RoleEntity)
  role: RoleEntity;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
