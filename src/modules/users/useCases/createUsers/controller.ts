import BaseController, {
  ControllerMethodType,
} from "@shared/commons/BaseController";
import { Request, Response } from "express";

import { CreateUsersCommand as Command } from "./command";
import Joi from "joi";
import { PrismaClient } from "@prisma/client";

export class CreateUsersController extends BaseController {
  db: PrismaClient;

  constructor(db: PrismaClient) {
    super();

    this.db = db;
  }

  get handle(): ControllerMethodType {
    return {
      auth: {
        roles: [],
      },
      schema: {
        body: Joi.object({
          name: Joi.string().required(),
          email: Joi.string().required().email(),
          password: Joi.string().required(),
        }),
      },
      fn: async (req: Request, res: Response): Promise<unknown> => {
        try {
          const { name, email, password } = req.body;

          const command = new Command(this.db);

          const result = await command.execute({ name, email, password });

          if (command.isValid()) {
            return this.Ok(res, result);
          }

          return this.Fail(res, result, command.errors);
        } catch (error) {
          return this.BadRequest(res, JSON.stringify(error));
        }
      },
    };
  }
}
