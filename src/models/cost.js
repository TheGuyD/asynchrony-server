const mongoose = require(`mongoose`);

const CostSchema= new mongoose.Schema({
    category:String,
    description:String,
    sum:{type:Number,default:0},
    date: {type:Date,default:()=>Date.now()},
});

const Cost = mongoose.model(`Cost`, CostSchema);

module.exports = Cost;



