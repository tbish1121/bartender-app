const authRouter = require("express").Router();
const auth = require('./auth.controller');
const jwt = require('../middleware/jwt');

authRouter.post('/', auth.logIn);

module.exports = authRouter