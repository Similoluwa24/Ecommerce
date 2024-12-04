const Joi = require('joi');



const validate = (schema) => (payload) => schema.validate(payload);
const categorySchema = Joi.object({
    name: Joi.string().required().min(5).max(250),
    description: Joi.string().required()
})

//productSchema
const productSchema = Joi.object({
    category : Joi.string(),
    name : Joi.string(),
    price : Joi.number(),
    // amount : Joi.number(),
    // quantity: Joi.number(),
    // image: Joi.array().required(),
    // // .items({
    // //     img : Joi.string().required()
    // // }),
    description : Joi.string(),
    featured : Joi.boolean(),
    topSelling : Joi.boolean() 

}) 

//userSchema
const userSchema = Joi.object({
    firstName : Joi.string().required(),
    lastName : Joi.string().required(),
    email : Joi.string().required().email(),
    phone : Joi.string().required(),
    password : Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    confirmPassword: Joi.ref('password'),
    role : Joi.string().required(),
})

module.exports.validateSchema = validate(categorySchema)
module.exports.validateProducts = validate(productSchema)
module.exports.validateUser = validate(userSchema)
