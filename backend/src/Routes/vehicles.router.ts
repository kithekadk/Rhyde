import { Router } from "express";
import { getAllVehicles, getOneVehicle, registerVehicle } from "../Controllers/vehicles.controller";
import { verifyToken } from "../Middlewares/verifyToken";

let vehicle_router = Router()

vehicle_router.post('/', registerVehicle)
vehicle_router.get('/' , verifyToken, getAllVehicles)
vehicle_router.get('/:vehicle_id', getOneVehicle)

export default vehicle_router