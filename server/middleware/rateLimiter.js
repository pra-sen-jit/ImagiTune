import rateLimit from "express-rate-limit";

export const rateLimit = (maxRequests, windowMinutes) =>
  rateLimit({
    windowMs: windowMinutes * 60 * 1000,
    max: maxRequests,
    message: `Too many requests, please try again after ${windowMinutes} minutes`,
    standardHeaders: true,
    legacyHeaders: false,
  });
