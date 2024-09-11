const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name:{
        type : String,
        required : true,
        maxlength : 250,
        minlength : 5
    },
    description:{
        type : String,
        required : true
    }
})

module.exports = new mongoose.model("Categories",categorySchema)