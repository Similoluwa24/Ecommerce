const express = require('express');
router = express.Router()
const {auth} = require("../middleware/auth")
const paymentControllers = require("../controllers/paymentControllers")

router.post('/api/payment/initiate', auth, paymentControllers.initiatePayment)
router.post('/api/payment/verify', auth, paymentControllers.verifyPayment)
router.get('/api/payment/order', auth, paymentControllers.getOrder)
router.get('/api/payment/allorder', paymentControllers.getAllOrders)
module.exports = router