import { Router } from "express";
import { loginUser } from "../Controllers/auth.controller";

const auth_router = Router()

auth_router.post('/login', loginUser)

export default auth_router