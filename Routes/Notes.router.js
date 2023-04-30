const express=require("express");
const { noteModel } = require("../model/Notes.model");
const notesroute=express.Router();

notesroute.get("/",async(req,res)=>{
const users=await noteModel.find({author_id:req.body.author_id});
res.send(users);

});

notesroute.post("/post",async(req,res)=>{
try {
    const note=new noteModel(req.body);
await note.save();
res.send({"mag":"new note has been added"});
} catch (error) {
    res.send({"msg":error.message});
}
});

notesroute.patch("/update/:id",async(req,res)=>{
try {
    const {id}=req.params;
    const note=await noteModel.findOne({_id:id});
    if(note.author_id==req.body.author_id)
    {
        await noteModel.findByIdAndUpdate({_id:id},req.body);
        res.send(`note with id ${id} has been updated.`);
    }else{
        res.send({"msg":"you are not authorised to do this"});
    }
   
} catch (error) {
    res.send({"msg":error.message})
}
});

notesroute.delete("/delete/:id",async(req,res)=>{
    try {
        const {id}=req.params;
        await noteModel.findByIdAndDelete({_id:id});
        res.send(`note with id ${id} has been deleted.`);
    } catch (error) {
        res.send({"msg":error.message})
    }
});


module.exports={notesroute};