const mongoose=require('mongoose')

const seatSchema=new mongoose.Schema({
    seatNumber:{type:String,
        required:true
    },
    isBooked:{type:Boolean,default:false},
    price:{type:Number}
});

const showSchema=new mongoose.Schema({
    movieId:{type:mongoose.Schema.Types.ObjectId,ref:'Movie',required:true},

    theatreId:{type:mongoose.Schema.Types.ObjectId,ref:'Theatre',required:true},

    date:{type:Date,required:true},
    time:{type:String},
    basePrice:{type:Number,required:true},
    availableSeats:{
        type:Number,
        required:true,
    },
    seats:[seatSchema]


},{
    timestamps:true
})

module.exports=mongoose.model('Show',showSchema);