import { Router } from "express";
import { createTrip } from "../Controllers/trips.controller";

const trips_router = Router()

trips_router.post('/order_rhide', createTrip)


export default trips_router