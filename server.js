const express = require('express');
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
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


const swaggerOptions = {
    swaggerDefinition: {
      openapi: "3.0.0",
      info: {
        title: "Ecommerce API",
        version: "1.0.0",
        description: "API information for your Ecommerce Express app",
        contact: {
          name: "Ojo Oluwapelumi",
          email: "wuraolami2001@gmail.com",
        },
        servers: [
          {
            url: "http://localhost:8000",
          },
        ],
      },
    },
    apis: ["./routers/*.js"], // Path to your API files
  };

app.use("/uploads", express.static("uploads"))
app.use("/", categoryRouters)
app.use("/", productRouters)
app.use("/", authRouters)
app.use("/", cartRouters)
app.use("/", paymentRouters)

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const port = process.env.PORT || 5000;
app.listen(port, ()=>console.log(`listening on port ${port}`)
)
