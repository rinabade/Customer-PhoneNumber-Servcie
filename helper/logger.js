const winston = require('winston');

const logger = (level, message) => {
    const logger = winston.createLogger({
      level: level,
      message: message,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.metadata(),
        winston.format.json(),
        winston.format.prettyPrint(),
      ),
      defaultMeta: { 
        service: 'Diagnostic-User-Service' 
      },    
      transports: [
        new winston.transports.Console(),
      ],
    });
  
    if (level == "info"){
      logger.info(message);
    }
    else if(level == "error"){
      logger.error(message);
    }
  };


module.exports = {
  logger
}
