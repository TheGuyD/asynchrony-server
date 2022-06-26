
const User = require(`../models/user`);


module.exports = async (req,res)=>{ 
    
    const {body}=req;
    const userValues = Object.fromEntries(Object.entries(body).slice(0, 5)); 
    
   
    try{
        const user=new User({...userValues});
        await user.save();
        console.log('user registerd');
        res.status(200).json(user);
   }
   catch(err){
    res.status(500).json({err: err.message});
   }
    
};
