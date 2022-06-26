
const User = require(`../models/user`);

module.exports = async (req,res)=>{ 
    try{ 
        const prefixPopulate=`fiancialReports.monthlyReports.costs`;
        const populateQuery=[{path:`${prefixPopulate}.food`},{path:`${prefixPopulate}.health`},{path:`${prefixPopulate}.housing`},{path:`${prefixPopulate}.sport`},{path:`${prefixPopulate}.education`}];
           
        const user = await User.findOne({id:req.params.id}).populate(populateQuery).lean();
                                                    
         res.status(200).json(user);
        }
        catch(err){
            res.status(500).json({err: err.message});
        }

    
};

