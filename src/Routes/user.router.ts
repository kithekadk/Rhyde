import { Router } from "express";
import { createUser, deleteUser, getOneUser, getUsers, updateUser } from "../Controllers/user.controller";

const userRouter = Router()

userRouter.post('/', createUser)
userRouter.get('/', getUsers)
userRouter.put('/update/:id', updateUser)
userRouter.get('/:id', getOneUser)
userRouter.delete('/delete/:id', deleteUser)

export default userRouter