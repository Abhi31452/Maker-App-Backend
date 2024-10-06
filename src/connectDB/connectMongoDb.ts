import mongoose from "mongoose";

export const connection = async ()=>{
    try{
        const conn = await  mongoose.connect(process.env.MONGO_URI);
        console.log("Db connected .." );
    }catch(err){
        console.log("Db not connected .." , err)
    }
}

