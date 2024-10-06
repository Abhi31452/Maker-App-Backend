import user, { Iuser } from "../Model/user";

export async function verifyEmail (req, res){

    try{
        console.log(req.body)
    const {code} = req.body;
    let User=new user();
     User = await user.findOne({
        verificationToken : code,
        verificationTokenExpireAt : {$gt : Date.now()}
    }) 

    console.log(User)
    if(!User){
        return res.status(404).json({ Success : false , message : " Invalid Token or Code Expired "})
    }

    User.isVerified = true;
    User.verificationToken=undefined;
    User.verificationTokenExpireAt= undefined;

    console.log(User);
    await User.save();
    console.log("Afetr save");
    
return res.status(200).json({Success : true  , message : " Account Verified mail Sent "})

    }catch(error){
     return res.status(400).json({Success : false , message : error.message  })
    }


}