import { PrismaClient } from "@prisma/client";
import BaseCommand from "@shared/commons/BaseCommand";

interface IRequest { }

export class CreateUsersCommand extends BaseCommand {
  db: PrismaClient

  constructor(db: PrismaClient) {
    super();

    this.db = db
  }

  async execute({  }: IRequest): Promise<boolean> {
    return true;
  }
}
