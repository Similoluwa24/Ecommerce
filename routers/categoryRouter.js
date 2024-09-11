const express = require('express');
const router = express.Router();
const categoryControllers = require('../controllers/categoryControllers');
const { auth, admin } = require('../middleware/auth');

router.post('/api/category', categoryControllers.createCategories)
router.get('/api/category', categoryControllers.getAllCategories)

module.exports = router;