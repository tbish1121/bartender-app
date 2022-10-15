
const userRouter = require("express").Router();
const user = require('./user.controller');
    
userRouter.get('/:id', user.getUserByID);
userRouter.get('/', user.getAllUsers);

userRouter.post('/', user.register);

userRouter.put('/:id', user.updatePassword);


module.exports = userRouter