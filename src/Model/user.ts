import mongoose, {Schema} from "mongoose";

export interface Iuser  extends Document {  
    username : String,
    email : String,
    phoneno : Number,
    password : String, 
   isVerified : Boolean
   verificationToken : String,
   verificationTokenExpireAt : Date
}

const  UserSchema=  new Schema<Iuser>({
    username : {type : String , required : true},
    email : {type:String , required : true},
    phoneno : {type:Number  },
    password : {type : String , required:true},
    verificationToken : String,
    verificationTokenExpireAt : Date
},{timestamps:true})

const user = mongoose.model<Iuser>("user",UserSchema);
export default user;