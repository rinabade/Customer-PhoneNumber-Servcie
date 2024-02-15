const {logger} = require("../helper/logger")

const loggerMiddleware = async(req, res, next) => {
  try {
    logger("info", "Incoming request");
    await next();
  } 
  catch (error) {
    logger("error", `Error in Logger middleware: ${error.message}`);
    await next(error);
  }
}


module.exports = {
  loggerMiddleware
}