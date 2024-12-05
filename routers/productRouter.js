const express = require('express');
const multer = require('multer');
const router = express.Router();
const productControllers = require('../controllers/productControllers');
const { auth, admin } = require('../middleware/auth');

// Use memory storage to handle file uploads in memory as Buffer
const storage = multer.memoryStorage();
const uploads = multer({ storage: storage });

// Correct field name in the multer middleware
router.post('/api/product', uploads.array("images", 10), productControllers.createProducts);

/**
 * @swagger
 * /api/product:
 *   get:
 *     summary: Retrieve a list of product
 *     responses:
 *       200:
 *         description: A list of product.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/api/product', productControllers.getAllProduct);

router.get('/api/products', productControllers.getOneProduct);

module.exports = router;
