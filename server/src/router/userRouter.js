const {Router} = require('express');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const userController = require('../controllers/userController');
const checkToken = require('../middlewares/checkToken');
const upload = require('../utils/fileUpload');

const userRouter = Router();

userRouter.get(
  '/getUser',
  checkToken.checkAuth,
);

userRouter.patch(
  '/updateUser',
  checkToken.checkToken,
  // update user validation
  upload.uploadAvatar,
  userController.updateUser,
);

userRouter.post(
  '/cashout',
  checkToken.checkToken,
  userController.cashout,
);


module.exports = userRouter;