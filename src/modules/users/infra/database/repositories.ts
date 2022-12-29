import { PrismaClient } from "@prisma/client";
import { UserEntities } from "./entities";

export interface IUsersRepositories {
  create(user: UserEntities, projection: Object): Promise<UserEntities>;
  findOne(email: string): Promise<UserEntities>
}

export class UsersRepositories implements IUsersRepositories {
  db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db
  }
  async findOne(email: string): Promise<UserEntities> {
    const user = await this.db.user.findUnique({ where: { email } });
    return user
  }

  async create(payload: UserEntities): Promise<UserEntities> {
    const user = await this.db.user.create({ data: { ...new UserEntities({ ...payload }) } })
    return user;
  }
}