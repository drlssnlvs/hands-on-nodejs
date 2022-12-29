import { Auth } from "@shared/infra/http/middlewares/auth";
import { CreateUsersController } from "@modules/users/useCases/createUsers/controller";
import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { Validator } from "@shared/infra/http/middlewares/validator";

export class UsersRoutes {
  static getRoutes(db: PrismaClient): Router {
    const routes = Router();

    const { handle: createUsers } = new CreateUsersController(db);

    routes.post(
      "/",
      Validator(createUsers.schema),
      Auth(createUsers.auth),
      createUsers.fn
    );

    return routes;
  }
}
