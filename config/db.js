const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config()

const connectDB= async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected To Database!!!");
        
    } catch (error) {
        console.log("Couldn't Connect to Database", error);
        
    }
}
module.exports = connectDB;