
const User = require(`../models/user`);


module.exports = async (req,res)=>{ 
    try{ 
        const prefixPopulate=`fiancialReports.monthlyReports.costs`;
        const populateQuery=[{path:`${prefixPopulate}.food`},{path:`${prefixPopulate}.health`},{path:`${prefixPopulate}.housing`},{path:`${prefixPopulate}.sport`},{path:`${prefixPopulate}.education`}];
        
        const user = await User.findOne({id:req.params.id}).select({fiancialReports:{$elemMatch:{year:req.params.year}}}).populate(populateQuery).lean();
         
        if (req.params.month>=0)  
            {
            console.log('get user info by date');                           
             res.status(200).json(user.fiancialReports[0].monthlyReports[req.params.month-1]);
            }
        else
            {
             console.log('get user info by year');            
             res.status(200).json(user);   
            }                                                                         
        }
        catch(err){
            res.status(500).json({err: err.message});
        }

    
};


