const mongoose=require("mongoose");

const noteSchema=mongoose.Schema({
    title:{type:String,require:true},
    body:{type:String,require:true},
    author:{type:String,require:true},
    author_id:{type:String,require:true},
    category:{type:String,require:true}
},{
    versionKey:false
});

const noteModel=mongoose.model("note",noteSchema);

module.exports={noteModel};