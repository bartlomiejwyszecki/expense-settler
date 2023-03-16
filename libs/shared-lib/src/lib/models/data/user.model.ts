export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export class User implements IUser {
  constructor (
    public id: string,
    public name: string,
    public email: string,
    public password: string,
    public role: string,
    public createdAt: Date,
    public updatedAt: Date) {}
}
