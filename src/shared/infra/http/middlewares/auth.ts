import { NextFunction, Request, Response } from "express";

import { ERRORS } from "@shared/commons/constants";
import { verify } from "jsonwebtoken";

export type IAuthType = {
  roles: string[];
};

export type IDecodedTokenType = {
  id: string;
  role: string
}

declare global {
  namespace Express {
    export interface Request {
      user: {
        id: string;
        role: string;
      };
    }
  }
}

export const Auth = (auth: IAuthType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { roles } = auth;

    if (!roles.length) return next();

    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(ERRORS.UNAUTHORIZED.code).json(ERRORS.UNAUTHORIZED.json)
    }

    const [_, token] = authorization.split(" ");

    try {
      const decoded = verify(token, process.env.PRIVATE_KEY)

      const { id, role } = decoded as IDecodedTokenType

      if (!roles.includes(role)) {
        return res.status(ERRORS.FORBIDDEN.code).json(ERRORS.FORBIDDEN.json)
      }

      req.user = {
        id,
        role,
      }

      next()
    } catch (error) {
      return res.status(ERRORS.UNAUTHORIZED.code).json(ERRORS.UNAUTHORIZED.json)
    }
  };
};
