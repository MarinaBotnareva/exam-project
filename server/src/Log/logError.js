const winston = require('winston');

const DailyRotateFile = require('winston-daily-rotate-file');

const logFormat = winston.format.combine(
 winston.format.colorize(),
 winston.format.timestamp(),
 winston.format.align(),
 winston.format.printf(
  err => `message: ${err.message}, code: ${err.code}, time: ${err.timestamp}`,
),);

const transport = new DailyRotateFile({
 level: 'error',
 filename: './logs/error-%DATE%.log',
 datePattern: 'YYYY-MM-DD',
 zippedArchive: true,
 maxSize: '20m',
});

const logger = winston.createLogger({
format: logFormat,
transports: [
     transport,
]});

function logError(err, req, res, next) {
    
    logger.error(err);
}

module.exports.logError = logError;