const cartControllers = require('../controllers/cartControllers');
const express = require('express');
const router = express.Router();
const { auth } = require("../middleware/auth");

router.post("/api/addcart", auth, cartControllers.addToCart );
router.get("/api/cart", auth, cartControllers.getCart );
router.put("/api/update-cart", auth, cartControllers.updateCart );
router.delete("/api/delete", auth, cartControllers.deleteCart );

module.exports= router 