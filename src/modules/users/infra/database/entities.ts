import { IRolesTypes } from "@shared/infra/http/middlewares/auth";

export class UserEntities {
  id?: string;

  createdAt?: Date;

  updatedAt?: Date;

  role?: IRolesTypes;

  name: string;

  email: string;

  password: string;

  constructor({
    name,
    email,
    password,
    role = "user"
  }: UserEntities) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
  }
}