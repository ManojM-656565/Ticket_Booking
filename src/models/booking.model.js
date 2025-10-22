const mongoose=require('mongoose')

const bookingSchema=new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    showId:{type:mongoose.Schema.Types.ObjectId,ref:'Show',
        required:true
    },
    seatsBooked:{type:Number,required},
    seatNumbers:[{type:String}],
    totalAmount:{type:Number,required:true},
    status:{type:String,enum:["booked","cancelled"],default:"booked"},
    bookedAt:{type:Date,default:Date.now}


},{
    timestamps:true
});

module.exports=mongoose.model("Booking",bookingSchema);