const mongoose = require(`mongoose`);

//althogh there is a one-to-many connection between user and cost , the decission to make an embedded schema
//was a part of the computed pattern strategy , it's more likly that user will ask for a report than inesert a cost.


const MonthSchema = new mongoose.Schema({
        month:{type:Number},
        food:{type:Number,default:0},
        health:{type:Number,default:0},
        housing:{type:Number,default:0},
        sport:{type:Number,default:0},
        education:{type:Number,default:0},
        total:{type:Number,default:0},
        costs: {
                 food:[{type: mongoose.Types.ObjectId,ref:'Cost'}],
                 health:[{type: mongoose.Types.ObjectId,ref:'Cost'}],
                 housing:[{type: mongoose.Types.ObjectId,ref:'Cost'}],
                 sport:[{type: mongoose.Types.ObjectId,ref:'Cost'}],
                 education:[{type: mongoose.Types.ObjectId,ref:'Cost'}],
               }
}); 
const YearSchame = new mongoose.Schema({
        year:{type:Number},
        food:{type:Number,default:0},
        health:{type:Number,default:0},
        housing:{type:Number,default:0},
        sport:{type:Number,default:0},
        education:{type:Number,default:0},
        total:{type:Number,default:0},
        monthlyReports:[MonthSchema]     
                         
});

const UserSchema = new mongoose.Schema({
        id:{type:String , required:true },
        first_name:{type:String,required:true},
        last_name:{type:String,required:true}, 
        birthday:{type:Date,required:true},
        marital_status:{type:String,required:true},
        finance:{
                food:{type:Number,default:0},
                health:{type:Number,default:0},
                housing:{type:Number,default:0},
                sport:{type:Number,default:0},
                education:{type:Number,default:0},
                total:{type:Number,default:0},
        },
        fiancialReports:[YearSchame]    
});

const User = mongoose.model(`User`, UserSchema );

module.exports=User;






