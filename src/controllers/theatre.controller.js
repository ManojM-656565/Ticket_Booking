const Theatre=require('../models/theatre.model')

const getAll=async(req,res)=>{
    const theatres=await Theatre.find();
    res.json(theatres);
};

const create=async (req,res)=>{
    const theatre =await Theatre.create(req.body);
    res.status(201).json(theatre);
}

const update=async (req,res)=>{
    const theatre=await Theatre.findByIdAndUpdate(req.params.id);
    if(!theatre) return res.status(404).json({message:'Not found'});
    res.json(theatre);
}

const del=async(req,res) =>{
    await Theatre.findByIdAndDelete(req.params.id);
    res.json({message:"deleted"});
}

module.exports={getAll,create,update,del};