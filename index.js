const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const { connectDB } = require("./src/lib/db");
dotenv.config();
const authRoutes=require('./src/routes/authRoutes.route')

const app = express();

app.use(express.json())
app.use(cookieParser());
// app.use(bodyParser.json())
 

app.use("/api/auth",authRoutes)

const PORT=process.env.PORT || 8000;
app.listen(PORT, ()=>{
    console.log("Server is running in port "+PORT)
connectDB();
 
})