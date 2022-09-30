
let router = require("express").Router();
const controller = require('./user.controller');
    
router.get('/:id', controller.getUserByID);
router.get('/', controller.getAllUsers);

router.post('/', controller.register);

router.put('/:id', controller.updatePassword);


module.exports = router