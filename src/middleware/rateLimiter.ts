import rateLimit from "express-rate-limit";
import RedisStore from "rate-limit-redis";
import redisClient from "../config/redisClient";

// 100 Requests per second
export const apiLimiter = rateLimit({
  windowMs: 1000,       // 1 second
  max: 100,             // Limit each IP to 100 req
  message: "Too many requests, slow down!",
  standardHeaders: true,
  legacyHeaders: false,

  store: new RedisStore({
    sendCommand: (...args: string[]) => redisClient.sendCommand(args),
  }),
});
