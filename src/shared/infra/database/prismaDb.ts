import { PrismaClient } from "@prisma/client";
import signale from "signale";

export const prismaDb = async () => {
  signale.star("prisma already to up");
  return new PrismaClient();
};
