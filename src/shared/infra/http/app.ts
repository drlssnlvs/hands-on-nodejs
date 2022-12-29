import express, { Application } from "express";

import { PrismaClient } from "@prisma/client";
import { UsersModules } from "@modules/users/infra/http/modules";
import { prismaDb } from "../database/prismaDb";
import { redisDb } from "../database/redisDb";

export class App {
  app: Application;

  constructor() {
    this.app = express();
  }

  async databases(): Promise<{ prisma: PrismaClient; redis: any }> {
    const prisma = await prismaDb();
    const redis = await redisDb();

    return { prisma, redis };
  }

  middlewares(): void {
    this.app.use(express.json());
  }

  modules(db: PrismaClient): void {
    UsersModules.configure(this.app, db);
  }

  async setup(): Promise<Application> {
    const { prisma } = await this.databases();

    this.middlewares();
    this.modules(prisma);

    return this.app;
  }
}
