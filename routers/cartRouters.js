const cartControllers = require('../controllers/cartControllers');
const express = require('express');
const router = express.Router();
const { auth } = require("../middleware/auth");

router.post("/api/addcart", auth, cartControllers.addToCart );
router.get("/api/cart", auth, cartControllers.getCart );
router.put("/api/update-cart", auth, cartControllers.updateCart );
/**
 * @swagger
 * /api/delete-cart:
 *   delete:
 *     summary: Delete Cart
 *     responses:
 *       200:
 *         description: To delete cart.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.delete("/api/delete-cart", auth, cartControllers.deleteCart );

module.exports= router 