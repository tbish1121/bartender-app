const earningRouter = require("express").Router();
const earning = require('./earnings.controller');
const jwtCheck = require('../middleware/jwt');

earningRouter.post('/:id', jwtCheck.authenticateToken, earning.createEarning);

module.exports = earningRouter;