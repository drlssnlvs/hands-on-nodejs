import { createClient } from "redis";
import signale from "signale";

const redisClient = createClient({
  url: process.env.REDIS_URL,
});

export const redisDb = async () => {
  try {
    await redisClient.connect();
    signale.star("redis already to up");
    redisClient.set("try", "Welcome to Express and TypeScript with Prisma");
    return redisClient;
  } catch (error) {
    console.log(error);
    setTimeout(redisDb, 5000);
  }
};
