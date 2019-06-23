const express = require('express');
const router = express.Router();

var users = require('../controllers/user');

router.post('/register', users.registerUser);
router.post('/login', users.loginUser);
router.delete('/users/:id', users.deleteUser);
router.get('/users?', users.listUsers)

module.exports = router;
