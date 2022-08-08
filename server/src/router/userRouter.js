const {Router} = require('express');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const userController = require('../controllers/userController');
const checkToken = require('../middlewares/checkToken');
const upload = require('../utils/fileUpload');

const userRouter = Router();

userRouter.post(
  '/getUser',
  checkToken.checkAuth,
);

userRouter.post(
  '/updateUser',
  checkToken.checkToken,
  // update user validation
  upload.uploadAvatar,
  userController.updateUser,
);

userRouter.post(
  '/cashout',
  checkToken.checkToken,
  basicMiddlewares.onlyForCreative,
  userController.cashout,
);


module.exports = userRouter;