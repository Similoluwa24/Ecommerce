const express = require('express');
const authControllers = require('../controllers/authControllers') 
const router = express.Router()
const { auth } = require("../middleware/auth");

router.post('/api/register', authControllers.register)
router.post('/api/login', authControllers.login)
router.get('/api/user',auth, authControllers.getUser)
router.get('/api/all-user', authControllers.getAllUser)
module.exports = router