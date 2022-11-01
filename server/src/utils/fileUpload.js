const fs = require('fs');
const path = require('path');
const multer = require('multer');

const env = process.env.NODE_ENV || 'development';
const devFilePath = path.resolve(__dirname, '..', '..', 'public/images');


const filePath = env === 'production' ? '/var/www/html/images/' : devFilePath;

if (!fs.existsSync(filePath)) {
  fs.mkdirSync(filePath, {
    recursive: true,
  });
}

const storageContestFiles = multer.diskStorage({
  destination (req, file, cb) {
    cb(null, filePath);
  },
  filename (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const multerWithStorage = multer({ storage: storageContestFiles });

const uploadAvatar = multerWithStorage.single('file');
const uploadContestFile = multerWithStorage.single('file');
const updateContestFile = multerWithStorage.single('file');
const uploadLogoFiles = multerWithStorage.single('offerData');    


module.exports.uploadAvatar = uploadAvatar;

module.exports.uploadContestFile = uploadContestFile; 

module.exports.updateContestFile = updateContestFile;

module.exports.uploadLogoFiles = uploadLogoFiles;

