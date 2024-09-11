const Cart = require('../models/cart');
const Order = require('../models/order');
const {v4: uuidv4} = require('uuid');
const dotenv = require('dotenv');

dotenv.config()


const FLUTTERWAVE_SECRET_KEY = process.env.FLUTTERWAVE_SECRET_KEY

exports.initiatePayment = async (req, res) =>{
    const {user} = req;
    const {amount, currency, firstName, lastName, email, address, phone} = req.body;

    try {
        //to  find cart by user id
        const cart = await Cart.findOne({user:user.id})
        //if cart doesnt exist
        if(!cart){
            res.json("Cart not Found")
        }
        //to generate orderid
        const orderId = uuidv4();
        //from flutterwave website.
        const paymentData = {
            tx_ref: orderId,
            amount,
            currency,
            // redirect_url: 'http://localhost:8000/api/payment/verify',
             redirect_url: 'http://localhost:5173/thankyou',
            customer: {
              email: `${user.email}`,
              name: `${user.firstName} ${user.lastName}`,
              phonenumber: phone
            },
            meta:{
                firstName,
                lastName,
                email,
                phone,
                address
            },
            customizations: {
              title: 'Bimbscollections payment for cart items',
              description: 'payment success'
            }
          }
        const response = await fetch("https://api.flutterwave.com/v3/payments",{
            method: "POST",
            headers:{
                Authorization: `Bearer ${FLUTTERWAVE_SECRET_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(paymentData)

        })
        const data = await response.json();
        //if payment was successful
        if (data.status === "success") {
            res.json({link : data.data.link, orderId})
        } else {
            res.json("payment failed")
        }
          
    } catch (error) {
        console.log({message: error.message});
        
    }
}


exports.verifyPayment = async (req, res) => {
    const {transaction_id, orderId} = req.body
    try {
        //to fetch payment verification
        const response = await fetch(`https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`,{
            method: "GET",
            headers:{
                Authorization: `Bearer ${FLUTTERWAVE_SECRET_KEY}`
            }
        })
        const data = await response.json()
        if (data.status === "success") {
            //to check if user has no cart
            const cart = await Cart.findOne({user: req.user.id}).populate("products.product")
            // if user has no cart
            if (!cart || cart.products.length === 0) {
                res.json("cart not found")
            }
            //if user has a cart
            const order = new Order({
                user:req.user.id,
                orderId,
                firstName:data.data.meta.firstName,
                lastName:data.data.meta.lastName,
                email:data.data.meta.email,
                phone:data.data.meta.phone,
                address:data.data.meta.address,
                products:cart.products,
                status:"complete",
                amount:data.data.amount,
                quantity:data.data.quantity,
                
            });

            
            await order.save()
            console.log(order);
            await Cart.findOneAndDelete({user: req.user.id})
            res.json({message: "Payment Successful", order})
        }else{
            res.json({message:"Payment Failed"})
        }
    } catch (error) {
        console.log({message:error.message});
        
    }
}

// exports.getOrder = async(req, res)=>{
//     const order = await Order.find(req.user._id)
//     if(!order) {
//         res.status(400).json("Oga go and register now!..")
//     }
//     res.json(order)
// }

exports.getOrder = async (req, res) => {
    try {
      const order = await Order.findOne({ userId: req.user._id });
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

exports.getAllOrders =  async(req, res)=>{
    const order = await Order.find()
    res.status(200).json({
        
    })
}