
const Cost = require(`../models/cost`);
const User = require(`../models/user`);
module.exports = async (req,res)=>{ 
  
  const {body}=req;
    try{
        
        //create cost 
        const cost = new Cost({...body});
        await cost.save();

        
        //query parameters and options
        //outer = year , inner = month 
        const optiens = {arrayFilters:[{'outer.year':cost.date.getFullYear()},{'inner.month':(cost.date.getMonth()+1)}],new:true};
        const totalCategory = `finance.${cost.category}`;
        const totalYear =`fiancialReports.$[outer].total`; 
        const categoryYear = `fiancialReports.$[outer].${cost.category}`;
        const totalMonth = `fiancialReports.$[outer].monthlyReports.$[inner].total`;
        const categoryMonth = `fiancialReports.$[outer].monthlyReports.$[inner].${cost.category}`;
        const costs=`fiancialReports.$[outer].monthlyReports.$[inner].costs.${cost.category}`;
       
        
  
        
        //query 
        const findQuery = {id:req.params.id};
        const pushNewYearlyAndMonthlyReportQuery={$push:{fiancialReports:{
                                                          year:cost.date.getFullYear(),
                                                          [cost.category]:cost.sum,
                                                          total:cost.sum,
                                                          monthlyReports: [{month:1},{month:2},{month:3},{month:4},{month:5},{month:6},{month:7},{month:8},{month:9},{month:10},{month:11},{month:12}]
                                                                        }
                                                                      }
                                                                    };
        

        
       const exist = await User.findOne(findQuery).where("fiancialReports.year").all([cost.date.getFullYear()]).select({fiancialReports:{$elemMatch:{year:cost.date.getFullYear()}}}).lean();
       let out;
       
       if(exist){
           //the yearly report exist , so just update 
           out = await User.findOneAndUpdate(findQuery,{
                                                          $inc:
                                                                {
                                                                  'finance.total':cost.sum,[totalCategory]:cost.sum,[totalYear]:cost.sum,[categoryYear]:cost.sum,[totalMonth]:cost.sum,[categoryMonth]:cost.sum
                                                                },
                                                          $push:
                                                                {
                                                                  [costs]:cost._id
                                                                }
                                                              },
                                                              optiens).select({
                                                                                fiancialReports:
                                                                                                 {
                                                                                                  $elemMatch:
                                                                                                              {
                                                                                                              year:cost.date.getFullYear()
                                                                                                              }
                                                                                                           }
                                                                                                      }).lean();           
         }
         else{
           //the query execution returned null which mean it didn't found  match, hence a new yearly report will pushed. 
           await User.findOneAndUpdate(findQuery,pushNewYearlyAndMonthlyReportQuery); 
           out = await User.findOneAndUpdate(findQuery,{
                                                          $inc:
                                                                {
                                                                  'finance.total':cost.sum,[totalCategory]:cost.sum
                                                                },
                                                          $set:
                                                                {
                                                                  [totalMonth]:cost.sum,[categoryMonth]:cost.sum,[costs]:[cost._id]
                                                                }
                                                              },
                                                              optiens).select({
                                                                                fiancialReports:
                                                                                                {
                                                                                                  $elemMatch:
                                                                                                              {
                                                                                                                year:cost.date.getFullYear()
                                                                                                              }
                                                                                                            }
                                                                                                          }).lean();
        }
           

      res.status(200).json(out.fiancialReports[0].monthlyReports[cost.date.getMonth()]);    
  }
   catch(err){
    res.status(500).json({err: err.message});
   }  
};

