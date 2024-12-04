const express = require('express');
const router = express.Router();
const categoryControllers = require('../controllers/categoryControllers');
const { auth, admin } = require('../middleware/auth');


/**
 * @swagger
 * /api/category:
 *   post:
 *     summary: Create a category
 *     responses:
 *       200:
 *         description: Create Category.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.post('/api/category', categoryControllers.createCategories)

/**
 * @swagger
 * /api/category:
 *   get:
 *     summary: Retrieve a list of category
 *     responses:
 *       200:
 *         description: A list of category.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/api/category', categoryControllers.getAllCategories)

module.exports = router;