const Cart = require('../models/cart');
const Product = require('../models/product');

exports.addToCart = async (req, res)=>{
    const { productId, quantity } = req.body;
    try {
        // Find the cart for the current user
        let cart = await Cart.findOne({ user: req.user.id }).populate("products.product");
    
        // If the cart does not exist, create a new one
        if (!cart) {
            cart = new Cart({ user: req.user.id, products: [] });
        }
    
        // Find the product by its ID
        const product = await Product.findById(productId);
    
        // If the product does not exist, return an error response
        if (!product) {
            return res.status(400).json({ message: "Product Not Found!!!" });
        }
    
        // Check if the product is already in the cart
        const productItems = cart.products.findIndex(item => item.product._id.toString() === productId);
    
        // If the product is found in the cart, update its quantity and amount
        if (productItems !== -1) {
            cart.products[productItems].quantity += quantity;
            if (product.price && typeof product.price === 'number') {
                cart.products[productItems].amount = product.price * cart.products[productItems].quantity;
                
            } else {
                // Handle the case where product.price is not a valid number
                    console.error(`Invalid product price: ${product.price}`);
                    return res.status(400).json({ message: "Invalid product price" });
            }
        } else {
            // Otherwise, add the new product to the cart
            cart.products.push({
                product: productId,
                quantity: quantity,
                amount: product.price * quantity
            });
        }
    
        // Save the updated cart to the database
        const storedcart = await cart.save()
        await storedcart.populate("products.product");
    
        // Send the updated cart as the response
        res.json(storedcart);
    } catch (error) {
        // Log the error and return a 500 status with the error message
        console.error({ message: error.message });
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

 exports.getCart = async(req, res)=>{
    try {
        const cart = await Cart.findOne({user : req.user.id}).populate("products.product");
        if (!cart) {
            res.status(400).json({message : "Cart does not exist"})
        }
        res.json(cart)
    } catch (error) {
        console.log({message : error.message});  
    }
 }


 exports.updateCart = async (req, res) => {
    const { productId, quantity } = req.body;
    try{
      const cart = await Cart.findOne({ user: req.user.id });
      const product = await Product.findById(productId);
      if (!product){
         return res.status(400).json({message: "Product not found"})
        }
        if (!cart) {
          return res.status(400).json({message: "Cart not found!.."})
        }
        const cartItem = cart.products.find(items => items.product._id.toString() === productId)
  
        if (cartItem) {
          cartItem.quantity = quantity
          cartItem.amount = product.price * cartItem.quantity
          await cart.save()
  
          const updatedCart = await Cart.findOne({ user: req.user.id}).populate("products.product")
          res.json(updatedCart)
        }else{
          res.json({message: "Cart does not exists"})
        }
    }catch (error) {
      console.log({message: error.message});
      
    }
  }




 exports.deleteCart = async (req,res)=> {
    const {productId} = req.body
    try {
       const cart = await Cart.findOne({user : req.user.id}) 
       const product = await Product.findById(productId)
       if (!product) {
        return res.status(400).json({message : "Product is not found"})
       }
       if (cart) {
        cart.products = cart.products.filter(items => items.product.toString() !== productId)
        await cart.save();

        const updatedCart = await Cart.findOne({user : req.user.id}).populate("products.product")
        res.json(updatedCart)
       } else {
        return res.status(400).json({message : "Cart not Found!!"})
       }
    } catch (error) {
        console.log({message : error.message});
        
    }
 }