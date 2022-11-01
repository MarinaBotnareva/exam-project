const {Router} = require('express');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const validators = require('../middlewares/validators');
const userController = require('../controllers/userController');
const contestController = require('../controllers/contestController');
const checkToken = require('../middlewares/checkToken');
const upload = require('../utils/fileUpload');

const contestRouter = Router();

contestRouter.post(
  '/dataForContest',
  checkToken.checkToken,
  contestController.dataForContest,
);

contestRouter.post(
  '/pay',
  checkToken.checkToken,
  basicMiddlewares.onlyForCustomer,
  upload.uploadContestFile,
  basicMiddlewares.parseBody,
  validators.validateContestCreation,
  userController.payment,
);

contestRouter.post(
  '/getCustomersContests',
  checkToken.checkToken,
  contestController.getCustomersContests,
);

contestRouter.get(
  '/getContestById',
  checkToken.checkToken,
  basicMiddlewares.canGetContest,
  contestController.getContestById,
);

contestRouter.post(
  '/getAllContests',
  checkToken.checkToken,
  basicMiddlewares.onlyForCreative,
  contestController.getContests,
);


contestRouter.get(
  '/downloadFile/:fileName',
  checkToken.checkToken,
  contestController.downloadFile,
);

contestRouter.post(
  '/updateContest',
  checkToken.checkToken,
  upload.updateContestFile,
  contestController.updateContest,
);

module.exports = contestRouter;