export class User {
  constructor(
    public id: string,
    public email: string,
    public name: string | null,
    public role: 'user' | 'admin',
    public isActive: boolean,
    public createdAt: Date,
    public password?: string,
  ) {}
}
