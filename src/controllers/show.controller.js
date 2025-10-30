const Show=require('../models/show.model')
const Theatre=require('../models/theatre.model')

const create=async(req,res)=>{
    const {movieId,theatreId,date,time,basePrice,seats}=req.body;

    try{
        const theatre =await Theatre.findById(theatreId);
        if(!theatre) return res.status(404).json({message:"Theatre not found"});

        let seatsArray=[];
       if (!Array.isArray(seats) || seats.length === 0) {
  const generatedSeats = [];
  const rows = ['A', 'B', 'C', 'D', 'E']; 
  const cols = 10;

  for (let row of rows) {
    for (let num = 1; num <= cols; num++) {
      generatedSeats.push({
        seatNumber: `${row}${num}`,
        price: basePrice,
        isBooked: false
      });
    }
  }
  seatsArray = generatedSeats;
}

        const show=await Show.create({
            movieId,
            theatreId,
            date,
            time,
            basePrice,
            seats:seatsArray,
            availableSeats:seatsArray.length,
        });

        res.status(201).json(show);
    }
    catch(err){
console.error(err);
res.status(500).json({message:"Internal server error"});
    }

};

const getAll=async (req,res)=>{
    const {movieId,theatreId,date}=req.query;
    const filter={};

    if(movieId) filter.movieId=movieId;
    if(theatreId) filter.theatreId=theatreId;
    if(date){
        const d=new Date(date);
        const dNext=new Date(d);
        dNext.setDate(d.getDate()+1);
        filter.date={$gte:d,$lt:dNext};
    }

    const shows=await Show.find(filter).populate('movieId').populate('theatreId');

    res.json(shows);
};

const getById=async (req,res)=>{
    const shows=await Show.findById(req.params.id).populate('movieId').populate('theatreId');
res.json(shows);
}

const update=async(req,res)=>{
    const show =await Show.findByIdAndUpdate(req.params.id,req.body,{new :true});

    if(!show) return res.status(404).json({message:"Not found"});

    res.json(show);
}

const del=async(req,res)=>{
    await Show.findByIdAndDelete(req.params.id);
    res.json({message:"Deleted"});
}

module.exports={create,getAll,getById,update,del}