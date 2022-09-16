const winston = require('winston');

const fileTransport = new winston.transports.File({ filename: './logs/error.log'});

const myWinstonOptions = {
    transports: [fileTransport]
}
const logger = new winston.createLogger(myWinstonOptions)

function logError(err, req, res, next) {
    logger.error(err)
    next()
}

module.exports.logError = logError;