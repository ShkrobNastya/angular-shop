export class User {
  constructor(
    public email: string,
    public id?: number,
    public password?: string,
    public token?: string
  ) {}
}
