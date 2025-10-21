const mongoose=require('mongoose')
const connectDB=async() =>{
    try{
        const conn=await mongoose.connect(process.env.db_connection_string)

        console.log("MongoDB connected")
    }
    catch(error){
        console.log("MongoDB error"+error)
    }
}
module.exports={connectDB}