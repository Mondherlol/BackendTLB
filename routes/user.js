const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const userController = require('../controllers/userController');

router.get('/',userController.getUsers);
router.get('/:id',userController.getOneUser);
router.post('/signup',  multer, userController.signup);
router.post('/login',userController.login);
router.delete('/:id',auth,userController.deleteUser);
router.put('/:id',auth,userController.updateUser);
router.post('/exist',userController.alreadyExist);
module.exports = router;