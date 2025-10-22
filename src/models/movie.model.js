const mongoose =require('mongoose')

const movieSchema=new mongoose.Schema({
    title:{type:String,required:true},
    genre:String,
    duration:Number,
    language:String,
    releaseDate:Date
},{
    timestamps:true
});

module.exports=mongoose.model('Movie',movieSchema);