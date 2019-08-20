const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.js')
const checkAuth = require('../auth/check-auth.js')


router.post('/signin', userController.userSignUp);

router.post('/login', userController.userLogin);

router.delete('/delete/:id', checkAuth, userController.deleteUser);

module.exports = router;
