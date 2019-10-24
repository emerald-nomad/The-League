import { sign } from "jsonwebtoken";

import { redisClient } from "../controllers.utils";

export interface AuthUser {
  _id: string;
  email: string;
  password: string;
}

interface CreateSession {
  userId: string;
  email: string;
}

export const createSession = async ({
  email,
  userId
}: CreateSession): Promise<string> => {
  const token = await sign({ email }, process.env.JWT_SECRET!);

  try {
    await redisClient.setAsync(token, userId);
    return token;
  } catch (error) {
    console.log(error);
    throw Error("Error trying to create session");
  }
};
