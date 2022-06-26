
const User = require(`../models/user`);


module.exports = async (req,res)=>{ 
    try{ 
        console.log('get user info');
         const user = await User.findOne({id:req.params.id}).select({
                                                                    _id:0,
                                                                    id:1,
                                                                    first_name:1,
                                                                    last_name:1,
                                                                    birthday:1,
                                                                    marital_status:1,
                                                                    finance:1
                                                                     }).lean();
         res.status(200).json(user);
        }
        catch(err){
            res.status(500).json({err: err.message});
        }

    
};

