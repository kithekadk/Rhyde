import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { User, loginUserDetails } from "../Interfaces/user";
dotenv.config()

export interface ExtendedUserRequest extends Request{
    info?: loginUserDetails
}

export const verifyToken = (req:ExtendedUserRequest, res: Response, next: NextFunction) =>{
    try {
        const token = req.headers['token'] as string

        if(!token){
            return res.json({
                message: "You do not have access"
            })
        }

        const data = jwt.verify(token, process.env.SECRET as string) as loginUserDetails

        req.info = data
        
        
    } catch (error) {
        return res.json({
            error: error
        })
    }

    next()
}