const express = require('express');
const app =express();
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const categoryRouters = require('./routers/categoryRouter');
const productRouters = require('./routers/productRouter');
const authRouters = require('./routers/authRouters');
const cartRouters = require('./routers/cartRouters');
const paymentRouters = require('./routers/paymentRouters');

connectDB()
dotenv.config()

app.use(express.json())
app.use(cors({
    origin:["http://localhost:5173"],
    allowedHeaders : ["Content-Type" ,"Authorization","auth-token"],
    methods : ["GET", "POST","PUT","PATCH", "DELETE"],
    credentials : true
}))

app.use("/uploads", express.static("uploads"))
app.use("/", categoryRouters)
app.use("/", productRouters)
app.use("/", authRouters)
app.use("/", cartRouters)
app.use("/", paymentRouters)

const port = process.env.PORT || 5000;
app.listen(port, ()=>console.log(`listening on port ${port}`)
)
