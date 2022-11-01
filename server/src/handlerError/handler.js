const { MulterError } = require('multer');
const { BaseError, UniqueConstraintError, ValidationError } = require('sequelize');
const { errorsLogger } = require('../Log/errorLogger');
const { logError } = require('../Log/logError');

function multerErrorHandler(err) {
  if (err instanceof MulterError) {
    err.code = 400;
  }
}

function sequelizeErrorHandler(err) {
  if (err instanceof BaseError) {
    if (err instanceof UniqueConstraintError) {
      if (
        typeof err.message === 'string' &&
        err.message.includes('Users_email_key')
      ) {
        err.code = 409;
        err.message = 'User with this email already exists';
      }
    }

    if (err instanceof ValidationError) {
      err.code = 400;
    }
  }

  if (
    typeof err.message === 'string' &&
    (err.message.includes('Banks_balance_ck') ||
      err.message.includes('Users_balance_ck'))
  ) {
    err.message = 'Not Enough money';
    err.code = 406;
  }
}  

module.exports = (err, req, res, next) => {
  
  multerErrorHandler(err);
  
  sequelizeErrorHandler(err);
 
  
  if (!err.message || (!err.code && !err.status)) {
    res.status(500).send('Server Error');
  } else {
    res.status(err.code || err.status).send(err.message);
  }
  
  logError(err);
  errorsLogger(err);
};
