const {Router} = require('express');
const tasksController = require('../controllers/tasksController');

const tasksRouter = Router();

tasksRouter.get(
  '/countRoles',
  tasksController.countRoles
);

tasksRouter.patch(
  '/cashback',
  tasksController.cashback
);

tasksRouter.patch(
  '/addToBalance',
  tasksController.addToBalance
);

module.exports = tasksRouter;