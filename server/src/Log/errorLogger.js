const fs = require('fs');
const path = require('path');

const dirPath = path.resolve(__dirname, '..', '..', 'LOG');
const filePath = path.resolve(__dirname, '..', '..', 'LOG/errors.json');

if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath, {
    recursive: true,
  });

  fs.closeSync(fs.openSync(filePath, 'w'));
}

const file = fs.readFileSync(filePath, 'utf8')


function errorsLogger(err, req, res, next) {

  const error = {
    message: err.message,
    time: new Date(), 
    code: err.code, 
    stackTrace: err.stack
  };

  if (file.length === 0) {
    fs.writeFileSync('./LOG/errors.json', JSON.stringify([error], null, 2));
  }else {
    const json = JSON.parse(file.toString());
    json.push(error);

    fs.writeFileSync('./LOG/errors.json', JSON.stringify(json, null, 2));
  }
}

module.exports.errorsLogger = errorsLogger;