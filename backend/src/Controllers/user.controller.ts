import mssql from 'mssql';
import bcrypt from 'bcrypt'
import { Request, Response } from "express";
import {v4} from 'uuid'
import { User } from "../Interfaces/user";
import { sqlConfig } from '../Config/sql.config';
import { registerUserSchema } from '../Validators/users.validators';

const users: User[] = []


export const createUser = async(req: Request, res: Response)=>{
    try {
        const id = v4()

        const {name, email, phone_number, role, password, profile_image, location}:User = req.body

        const hashed_pwd = await bcrypt.hash(password, 5)

        let {error} = registerUserSchema.validate(req.body)

        if(error){
            return res.status(404).json({
                error: error.details[0].message
            })
        }

        // const newUser = {user_id:id, name, email, phone_number, role, password, profile_image, location}
 
        // users.push(newUser) 
        const pool = await mssql.connect(sqlConfig)

        let result = (await pool.request()
        .input("user_id", mssql.VarChar, id)
        .input("name", mssql.VarChar, name)
        .input("email", mssql.VarChar, email)
        .input("phone_number", mssql.VarChar, phone_number)
        .input("role", mssql.VarChar, role)
        .input("Password", mssql.VarChar, hashed_pwd)
        .input("profile_image", mssql.VarChar, profile_image)
        .input("location", mssql.VarChar, location)
        .execute('registerUser')).rowsAffected

        console.log(result);
        

        return res.status(200).json({
            message: "Account created successfully",
        })

    } catch (error) {
        return res.json({error: error})
    }
}

export const getUsers =  async(req: Request, res:Response)=>{
    try {
        // return res.json({
        //     users: users
        // })
        const pool = await mssql.connect(sqlConfig);
        let allusers = (await pool.request().execute('getAllUsers')).recordset

        return res.status(200).json({
            users: allusers
        })
    } catch (error) {
        return res.json({error})
    }
}

export const getOneUser = async(req: Request, res:Response)=>{
    try {
        const id = req.params.id

        // const singleUser = users.filter(user=> user.user_id == id)

        const pool = await mssql.connect(sqlConfig)

        let user = (await pool.request().input("user_id", id).execute('getOneUser')).recordset

        return res.json({
            user
        })
    } catch (error) {
        return res.json({error})
    }
}

export const updateUser = async(req:Request, res: Response)=>{
    try {
        const id = req.params.id

        const {name, email, phone_number, role, password, profile_image}:User = req.body

        const pool = await mssql.connect(sqlConfig)

        let result = (await pool.request()
        .input("user_id", id)
        .input("name", mssql.VarChar, name)
        .input("email", mssql.VarChar, email)
        .input("phone_number", mssql.VarChar, phone_number)
        .input("role", mssql.VarChar, role)
        .input("Password", mssql.VarChar, password)
        .input("profile_image", mssql.VarChar, profile_image)
        .execute('updateUser')).rowsAffected

        console.log(result);
        

        return res.status(200).json({
            message: "User updated successfully"
        })

        // const updatedUser = {user_id:id, name, email, phone_number, role, password, profile_image, location}

        // const user_index = users.findIndex(user=> user.user_id == id)

        // if(user_index < 0){
        //     return res.json({
        //         message:"User not found"
        //     })
        // }else{
        //     users[user_index] = updatedUser
        //     return res.json({
        //         message: "User updated successfully", 
        //         updatedUser
        //     })
        // }
    } catch (error) {
        return res.json({error})
    }
}

export const deleteUser = async(req: Request, res: Response)=>{
    try {
        const id = req.params.id

        const pool = await mssql.connect(sqlConfig)

        let result = (await pool.request()
        .input("user_id", mssql.VarChar, id)
        .execute('deleteUser')
        ).rowsAffected

        console.log(result[0]);
        
        if(result[0] == 0){
            return res.status(201).json({
                error: "User not found"
            })
        }else{
            return res.status(200).json({
                message: "Account deleted successfully"
            })
        }

        
        // let user_index = users.findIndex(user=> user.user_id == id)

        // if(user_index < 0){
        //     return res.json({
        //         message: 'User not found'
        //     })
        // }else{
        //     users.splice(user_index, 1)
        //     return res.json({
        //         message: "User deleted successfully"
        //     })
        // }
    } catch (error) {
        return res.json({error})
    }
}