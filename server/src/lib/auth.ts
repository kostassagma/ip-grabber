import { sign } from "jsonwebtoken";
import { refreshTokenSecret, accessTokenSecret } from "./constants";

export const createAccessToken = (userId: string) => {
  return sign({ userId }, accessTokenSecret!, {
    expiresIn: "15m",
  });
};

export const createRefreshToken = (username: string, tokenVersion: number) => {
  return sign({ username, tokenVersion }, refreshTokenSecret, {
    expiresIn: "7d",
  });
};
