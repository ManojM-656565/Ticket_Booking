const Movie=require('../models/movie.model')

const getAll=async(req,res)=>{
    const movies=await Movie.find();
    res.json(movies);
};

const getById=async (req,res)=>{
    const movie=await Movie.findById(req.params.id);
    if(!movie) return res.status(404).json({message:"Not found"})
    res.json(movie);
}

const create=async(req,res)=>{
   try {
    const movie = await Movie.create(req.body);
    res.status(201).json(movie);
  } catch (err) {
    console.error("Error creating movie:", err.message);
    res.status(400).json({ message: "Failed to create movie", error: err.message });
  }
}

const update=async (req,res)=>{
    const movie=await Movie.findByIdAndUpdate(req.params.id,req.body,{new:true});

    if(!movie) return res.status(404).json({message:"Not found"});

    res.json(movie);
}

const del=async(req,res)=>{
    await Movie.findByIdAndDelete(req.params.id);
    res.json({message:"deleted"});
}

module.exports={getAll,getById,create,update,del};