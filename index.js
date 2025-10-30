const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const { connectDB } = require("./src/lib/db");
dotenv.config();
const authRoutes=require('./src/routes/auth.route')
const movieRoutes=require('./src/routes/movie.route')
const theatreRoutes=require("./src/routes/theatre.route")
const showRoutes=require("./src/routes/show.route")
const bookingRoutes=require('./src/routes/booking.route')
const app = express();

app.use(express.json())
app.use(cookieParser());
// app.use(bodyParser.json())
 

app.use("/api/auth",authRoutes)
app.use("/api/movies",movieRoutes)
app.use("/api/theatres",theatreRoutes)
app.use("/api/shows",showRoutes)
app.use("/api/booking",bookingRoutes)


const PORT=process.env.PORT || 8000;
app.listen(PORT, ()=>{
    console.log("Server is running in port "+PORT)
connectDB();
 
})