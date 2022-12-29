import { Request, Response } from "express";

import { IAuthType } from "@shared/infra/http/middlewares/auth";
import { ISchemaType } from "@shared/infra/http/middlewares/validator";

export type ControllerMethodType = {
  schema: ISchemaType;
  auth: IAuthType;
  fn: (req: Request, resp: Response) => Promise<unknown>;
};

export default class BaseController {
  Ok(res: Response, result: any): void {
    res.status(200).send({
      r: true,
      data: result,
    });
  }

  Fail(res: Response, result: any, errors: Array<string>): void {
    res.status(400).send({
      r: false,
      errors,
    });
  }

  BadRequest(res: Response, errors: any): void {
    const errorType = errors?.name;
    let error = null;

    switch (errorType) {
      case "ValidationError":
        error = errors.errors;
        break;
      default:
        error = errors;
        break;
    }

    res.status(400).json({
      r: false,
      errors: error,
    });
  }
}
