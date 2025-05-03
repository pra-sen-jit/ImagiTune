import expressRateLimit from "express-rate-limit"; // Rename imported function

// Export YOUR custom rate limiter with desired name
export const rateLimit = (maxRequests, windowMinutes) =>
  expressRateLimit({
    // Use the renamed import here
    windowMs: windowMinutes * 60 * 1000,
    max: maxRequests,
    message: `Too many requests, please try again after ${windowMinutes} minutes`,
    standardHeaders: true,
    legacyHeaders: false,
  });
