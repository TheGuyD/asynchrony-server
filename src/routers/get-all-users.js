
const User = require(`../models/user`);



module.exports = async (req,res)=>{ 
    try{
         const users = await User.find().select({id:1,
                                                first_name:1,
                                                last_name:1,
                                                birthday:1,
                                                marital_status:1,
                                                finance:1
                                               }).lean(); 
         
        console.log('all users');
        res.status(200).json(users);
        }
        catch(err){
            res.status(500).json({err: err.message});
        }

    
};



