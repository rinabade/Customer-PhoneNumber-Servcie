const rateLimit = require("express-rate-limit");

require("dotenv").config();

exports.limiter = rateLimit({
  windowMs: 60 * 1000,
  max: process.env.MAX_API_REQUEST || 5,
  message: "Request limit exceeded",
});
