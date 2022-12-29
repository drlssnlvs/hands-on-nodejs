import BaseCommand from "@shared/commons/BaseCommand";
import { PrismaClient } from "@prisma/client";
import { UTILS } from "@shared/commons/constants";
import { UserEntities } from "@modules/users/infra/database/entities";
import { UsersRepositories } from "@modules/users/infra/database/repositories";
import { hash } from "bcryptjs";

interface IRequest {
  name: string;
  email: string;
  password: string
}

export class CreateUsersCommand extends BaseCommand {
  db: PrismaClient

  usersRepositories: UsersRepositories

  constructor(db: PrismaClient) {
    super();

    this.db = db

    this.usersRepositories = new UsersRepositories(db)
  }

  async execute({ email, name, password }: IRequest): Promise<UserEntities | boolean> {
    const checkIfUserAlreadyRegister = await this.usersRepositories.findOne(email);

    if (checkIfUserAlreadyRegister) {
      return this.addError("this email already register")
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepositories.create({ email, name, password: hashedPassword });

    return UTILS.PROJECTION(user, { password: 0 }) as UserEntities
  }
}
