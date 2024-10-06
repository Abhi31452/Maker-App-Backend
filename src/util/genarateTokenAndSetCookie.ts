const jwt=require('jsonwebtoken');
import { Response } from 'express';
const dotenv= require('dotenv');

// Load environment variables from .env file
dotenv.config();

interface Payload {
    // Define the structure of your payload here
    [key: string]: any; // Example: { userId: string; }
}

export const generateTokenAndSetCookie = (res: Response, payload: Payload): string => {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new Error("JWT_SECRET is not defined");
    }

    const token = jwt.sign(payload, secret, {
        expiresIn: "7d",
    });

    res.cookie("token", token, {
        httpOnly: true, // XSS protection
        secure: process.env.NODE_ENV === "production", // HTTPS only in production
        sameSite: "Strict", // CSRF protection
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    });

    return token;
};
