import { Request, Response } from "express";
import {v4} from 'uuid'
import { User } from "../Interfaces/user";

const users: User[] = []


export const createUser = async(req: Request, res: Response)=>{
    try {
        const id = v4()

        const {name, email, phone_number, role, password, profile_image, location}:User = req.body

        const newUser = {user_id:id, name, email, phone_number, role, password, profile_image, location}

        users.push(newUser)

        return res.json({
            message: "Account created successfully",
            user: newUser
        })

    } catch (error) {
        return res.json({error})
    }
}

export const getUsers =  async(req: Request, res:Response)=>{
    try {
        return res.json({
            users: users
        })
    } catch (error) {
        return res.json({error})
    }
}

export const getOneUser = async(req: Request, res:Response)=>{
    try {
        const id = req.params.id

        const singleUser = users.filter(user=> user.user_id == id)

        return res.json({
            singleUser
        })
    } catch (error) {
        return res.json({error})
    }
}

export const updateUser = async(req:Request, res: Response)=>{
    try {
        const id = req.params.id

        const {name, email, phone_number, role, password, profile_image, location}:User = req.body

        const updatedUser = {user_id:id, name, email, phone_number, role, password, profile_image, location}

        const user_index = users.findIndex(user=> user.user_id == id)

        if(user_index < 0){
            return res.json({
                message:"User not found"
            })
        }else{
            users[user_index] = updatedUser
            return res.json({
                message: "User updated successfully", 
                updatedUser
            })
        }
    } catch (error) {
        return res.json({error})
    }
}

export const deleteUser = async(req: Request, res: Response)=>{
    try {
        const id = req.params.id

        let user_index = users.findIndex(user=> user.user_id == id)

        if(user_index < 0){
            return res.json({
                message: 'User not found'
            })
        }else{
            users.splice(user_index, 1)
            return res.json({
                message: "User deleted successfully"
            })
        }
    } catch (error) {
        return res.json({error})
    }
}