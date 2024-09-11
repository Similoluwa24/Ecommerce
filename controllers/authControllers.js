const User = require('../models/user')
const {validateUser} = require('../validators')
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
   const {firstName, lastName, password, confirmPassword, email, phone, role} = req.body
   
   if (password !== confirmPassword) {
    return res.status(400).json("password do not match")
}
    let { error } = validateUser(req.body) 
    if (error) {
        return res.status(400).json({ message: error.details[0].message})
    }
    try {
       let user = await User.findOne({email})
       if (user) {
        return res.status(400).json("User already exist!!")
       } 
       user = new User({firstName, lastName, password, confirmPassword, email, phone, role});
       const salt = await bcrypt.genSalt(10)
       user.password = await bcrypt.hash(user.password, salt)
       await user.save()
    
       const token = user.generateAuthToken()
       res.header("auth-token", token).json(user)
    } catch (error) {
        console.log({ message:error.message });
    }
}

exports.login = async (req,res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email})
        if (!user) {
            return res.json({ message: "invalid username"}).status(400)
        }
        const validatePassword = await bcrypt.compare(password, user.password)
        if (!validatePassword) {
            return res.json({ message: "invalid password" }).status(400)
        }
        const token = user.generateAuthToken()
        res.header("auth-token", token).json({token})
    } catch (error) {
        console.log({message: error.message});
        
    }
}


exports.getUser = async(req, res) =>{
    try{
        const user = await User.findById(req.user._id).populate("firstName");
        if(!user) {
            res.status(400).json("Oga go and register now!..")
        }
        res.json(user)
    }catch (error) {
        console.log({ message: error.message })
    }

}

exports.getAllUser = async(req, res) =>{
    const user = await User.find()
    res.status(200).json({
        success:true,
        count: user.length,
        user
    })
}