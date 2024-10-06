import { Response, Request } from "express";
import user, { Iuser } from "../Model/user";
import { generateTokenAndSetCookie } from '../util/genarateTokenAndSetCookie';
// import bcryptjs from "bcryptjs";
const bcryptjs = require('bcryptjs');


export async function signup(req: Request, res: Response): Promise<Response> {
    console.log("Request :" ,req.body)
    const { username, email, phoneno, password, confirmPassword, profileImage } = req.body;
    try {
        if (!username || !email || !password ) {
            console.log(username, email, password)
            throw new Error("All feilds are required")
        }

        const userAlreadyExist: Iuser | null = await user.findOne({ email });
        if (userAlreadyExist) {

            return res.status(400).json({ Success: true, message: "User Already Exist" });
        }
console.log("password :", password);
        const hashPassword = await bcryptjs.hash(password, 10);
        const newuser = new user({
            username,
            email,
            password: hashPassword,
            phoneno,
           
        })
        console.log(user);
        await newuser.save();

        generateTokenAndSetCookie(res,{id : newuser._id})
        const userResp = newuser.toObject();
        delete userResp.password;
        res.status(200).json({
            success: true,
            message: "User Created successfully ",
            user1:userResp
        })
    } catch (err) {

        console.log(err);
        res.status(400).json({ Success: false, message: err.message });

    }

}

