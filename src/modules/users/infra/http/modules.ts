import { Application } from "express";
import { PrismaClient } from "@prisma/client";
import { UsersRoutes } from "./routes";

export class UsersModules {
  static configure(app: Application, db: PrismaClient): void {
    app.use("/users", UsersRoutes.getRoutes(db));
  }
}
