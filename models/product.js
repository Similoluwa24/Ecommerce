
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    category : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "Categories",
        required : true
    },
    name : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },

    images: 
        [{img:{ 
            type : String,
            required : true
        }}],
    description:{
        type : String,
        required : true
    },
    featured :{
        type : Boolean
    },
    topSelling : {
        type : Boolean
    }
}, {timestamps: true})

 module.exports = mongoose.model("Product", productSchema)