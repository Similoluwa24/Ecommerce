const Product = require('../models/product');
const {validateProducts} = require('../validators')
const cloudinary = require('../config/cloudinary');
const product = require('../models/product');

// exports.createProducts = async (req,res) => {
//     try {
//         const {error} = validateProducts(req.body)
//         if (error) {
//             res.json(error.details[0].message)
//         } 
//         let images = req.files.map(file => ({img : file.path}))
//         const product = new Product({
//             category : req.body.category,
//             name : req.body.name,
//             description : req.body.description,
//             images : images,
//             price : req.body.price,
//             amount: req.body.amount,
//             topSelling : req.body.topSelling,
//             featured : req.body.featured
//         })
//         const new_product_data = await product.save()
//         res.json(new_product_data)
//     } catch (error) {
//         console.log({message: error.message});
        
//     }
// }

// exports.createProducts = async(req, res)=>{
//     try {
//         const {error} = validateProducts(req.body)
//         if(error){
//             res.json(error.details[0].message)
//         }
//         if(!req.files || req.files.length === 0){
//             return res.status(400).json({message:"no images uploaded"})
//         }
//         const images =[]
//         for(const file of req.files){
//             try {
                
//                 const result = await cloudinary.uploader.upload(`data:${file.mimetype};base64,${file.buffer.toString("base64")}`)
//                 images.push({ img: result.secure_url })
//             } catch (uploadError) {
//                 console.error("Image upload error", uploadError);
//                 return res.status(500).json({message:"Image upload failed",error: uploadError.message})
//             }}
//                 const product = new Product({
//                     category : req.body.category,
//                     name : req.body.name,
//                     description : req.body.description,
//                     images : images,
//                     price : req.body.price,
//                     amount: req.body.amount,
//                     topSelling : req.body.topSelling,
//                 featured : req.body.featured
//             })

//                 const new_product_data = await product.save()
//                 res.json(new_product_data)

//     } catch (error) {
//         console.log({message: error.message});
        
//     }
// }

exports.createProducts = async (req, res) => {
    try {
      const { error } = validateProducts(req.body);
      if (error) return res.status(400).json({ message: error.details[0].message });
  
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: "No images uploaded" });
      }
  
      const images = [];
      for (const file of req.files) {
        try {
          const result = await cloudinary.uploader.upload(
            `data:${file.mimetype};base64,${file.buffer.toString("base64")}`
          );
          images.push({ img: result.secure_url });
        } catch (uploadError) {
          console.error("Image upload error:", uploadError);
          continue; // Skip failed uploads
        }
      }
  
      if (images.length === 0) {
        return res.status(500).json({ message: "All image uploads failed" });
      }
  
      const product = new Product({
        category: req.body.category,
        name: req.body.name,
        description: req.body.description,
        images: images,
        price: req.body.price,
        amount: req.body.amount,
        topSelling: req.body.topSelling,
        featured: req.body.featured,
      });
  
      const new_product_data = await product.save();
      res.status(201).json(new_product_data);
    } catch (error) {
      console.error("Error creating product:", error.message);
      res.status(500).json({ error: error.message });
    }
  };
  

exports.getAllProduct = async (req, res) => {
    const products = await Product.find().populate("category")
    res.json(products)
}

exports.getOneProduct = async (req, res) =>{
    const produce = await Product.findOne(product._id)
    res.json(produce)
}