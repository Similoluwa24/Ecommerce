const express = require('express');
const multer = require('multer');
const router = express.Router()
const productControllers = require('../controllers/productControllers')

// const storage = multer.diskStorage({
//     destination : (req, res, cb) =>{
//             cb(null, "uploads/")
//     },
//     filename : (req, file, cb) =>{
//             cb(null, file.originalname)
//     }
// })

// const upload = multer({ storage:storage })
const storage = multer.memoryStorage();
const uploads = multer({storage:storage})


router.post('/api/product', uploads.array("img", 10), productControllers.createProducts)
router.get('/api/product',productControllers.getAllProduct)
router.get('/api/products',productControllers.getOneProduct)

module.exports = router;