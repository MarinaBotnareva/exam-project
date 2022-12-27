let fs = require('fs');
const path = require('path');
const CronJob = require('cron').CronJob;

const targetPath = path.resolve(__dirname, '..', '..', 'LOG/errors.json');

const now = new Date();

const fileName =
  now.getFullYear() +
  '-' +
  (now.getMonth() + 1) +
  '-' +
  now.getDate() +
  '.json';

const filePath = path.resolve(__dirname, '..', '..', 'LOG/' + fileName);

const job = new CronJob('0 0 * * *', () => {
  const file = fs.readFileSync(targetPath, 'utf8');
  const json = JSON.parse(file.toString());
  let array = [];
  json.forEach((error) => {
    const data = {
      message: error.message,
      code: error.code,
      time: error.time,
    };
    array.push(data);
  });

  fs.writeFileSync(filePath, JSON.stringify(array, null, 2));

  fs.truncateSync(targetPath, 0);
});

job.start();
