import { Request, Response } from "express";
import user, { Iuser } from "../Model/user";
// import bcryptjs from "bcryptjs";
const bcryptjs = require('bcryptjs')

export const login = async (req: Request, res: Response):Promise<Response> => {

  console.log(req.body);
    const { username, password } = req.body;
    try {
        if (!username || !password) {
            throw new Error("All fields Required")
        }

        const User: Iuser | null = await user.findOne({ username });
        if (!User) {
            return res.status(401).json({ Success: false, message: "Invalid Credentials" })
        }
        console.log("password", password, User.password);

        const hashPassword2 = await bcryptjs.hash(password, 10);
        
        console.log(hashPassword2);

        const hashPassword = await bcryptjs.compare(password, User.password);

        console.log("hasshPassword", hashPassword)
        if (!hashPassword) {
            return res.status(401).json({ Success: false, message: "Invalid password" })
        }

        const userResponse = {
            username,
            password: undefined
        }

        return res.status(200).json({ Success: true, message: " Login Succesfully ", user: userResponse })

    } catch (err) {
        console.log(err);
        res.status(400).json({
            Success: false,
            message: err.message
        })
    }


}
