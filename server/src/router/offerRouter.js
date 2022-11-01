const {Router} = require('express');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const userController = require('../controllers/userController');
const contestController = require('../controllers/contestController');
const checkToken = require('../middlewares/checkToken');
const upload = require('../utils/fileUpload');

const offerRouter = Router();

offerRouter.post(
  '/setNewOffer',
  checkToken.checkToken,
  upload.uploadLogoFiles,
  basicMiddlewares.canSendOffer,
  contestController.setNewOffer,
);

offerRouter.post(
  '/setOfferStatus',
  checkToken.checkToken,
  basicMiddlewares.onlyForCustomerWhoCreateContest,
  contestController.setOfferStatus,
);

offerRouter.post(
  '/setOfferApprovement',
  checkToken.checkToken,
  basicMiddlewares.onlyForModerator,
  contestController.setOfferApproment,
);

offerRouter.post(
  '/changeMark',
  checkToken.checkToken,
  basicMiddlewares.onlyForCustomer,
  userController.changeMark,
);

offerRouter.post(
  '/getOffers',
  checkToken.checkToken,
  basicMiddlewares.onlyForModerator,
  contestController.getOffers,
);

module.exports = offerRouter;