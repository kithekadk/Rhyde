import { Router } from "express";
import { createUser, deleteUser, getOneUser, getUsers, updateUser } from "../Controllers/user.controller";
import { verifyToken } from "../Middlewares/verifyToken";

const userRouter = Router()

userRouter.post('/', createUser)
userRouter.get('/', verifyToken, getUsers)
userRouter.put('/update/:id', verifyToken, updateUser)
userRouter.get('/:id', verifyToken, getOneUser)
userRouter.delete('/delete/:id', verifyToken, deleteUser)

export default userRouter