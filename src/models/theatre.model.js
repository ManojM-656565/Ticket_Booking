const mongoose=require('mongoose')

const theatreSchema=new mongoose.Schema({
    name:{type:String,required:true},
    location:String,
    totalSeats:{type:Number,required:true}
},{
    timestamps:true
});

module.exports=mongoose.model('Theatre',theatreSchema);