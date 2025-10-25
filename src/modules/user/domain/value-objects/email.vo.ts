export class EmailVO {
  private constructor(public readonly value: string) {}

  static create(email: string): EmailVO {
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      throw new Error('Email không hợp lệ');
    }
    return new EmailVO(email.toLowerCase());
  }
}
