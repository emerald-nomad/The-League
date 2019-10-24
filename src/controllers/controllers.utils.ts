import * as redis from "redis";
import * as bluebird from "bluebird";
import { Request, Response, NextFunction } from "express";

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

export const redisClient = redis.createClient({
  url: process.env.REDIS_URI
}) as any;

export const privateRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(400).send("Not Authorized!");

  const token = authorization.replace("Bearer ", "");

  const userId = await redisClient.getAsync(token);

  if (!userId) return res.status(400).send("Not Authorized!");

  req.body = {
    ...req.body,
    token,
    userId
  };

  next();
};
