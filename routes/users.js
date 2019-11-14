const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.js')
const checkAuth = require('../auth/check-auth.js')

router.get('/users', userController.getAllUsers)

router.get('/:id', userController.getUser)

router.post('/signup', userController.userSignUp);

router.post('/login', userController.userLogin);

router.delete('/delete/:id', checkAuth, userController.deleteUser);

module.exports = router;
