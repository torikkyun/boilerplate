import { UserRole } from '@common/enums/user-role.enum';
import { EmailVO } from '../value-objects/email.vo';
import { PasswordVO } from '../value-objects/password.vo';

export class User {
  private constructor(
    public readonly id: string,
    public readonly email: EmailVO,
    public readonly password: PasswordVO,
    public readonly name: string | null,
    public readonly role: UserRole,
    public readonly isActive: boolean,
    public readonly createdAt: Date,
  ) {}

  static reconstitute(props: {
    id: string;
    email: string;
    passwordHash: string;
    name: string | null;
    role: UserRole;
    isActive: boolean;
    createdAt: Date;
  }): User {
    return new User(
      props.id,
      EmailVO.create(props.email),
      PasswordVO.fromHash(props.passwordHash),
      props.name,
      props.role,
      props.isActive,
      props.createdAt,
    );
  }

  static async create(props: {
    id: string;
    email: string;
    password: string;
    name?: string | null;
    role?: UserRole;
    isActive?: boolean;
    createdAt?: Date;
  }): Promise<User> {
    return new User(
      props.id,
      EmailVO.create(props.email),
      await PasswordVO.create(props.password),
      props.name ?? null,
      props.role ?? UserRole.USER,
      props.isActive ?? true,
      props.createdAt ?? new Date(),
    );
  }

  activate(): User {
    return new User(
      this.id,
      this.email,
      this.password,
      this.name,
      this.role,
      true,
      this.createdAt,
    );
  }

  deactivate(): User {
    return new User(
      this.id,
      this.email,
      this.password,
      this.name,
      this.role,
      false,
      this.createdAt,
    );
  }

  changeRole(role: UserRole): User {
    return new User(
      this.id,
      this.email,
      this.password,
      this.name,
      role,
      this.isActive,
      this.createdAt,
    );
  }

  changeName(name: string): User {
    return new User(
      this.id,
      this.email,
      this.password,
      name,
      this.role,
      this.isActive,
      this.createdAt,
    );
  }
}
