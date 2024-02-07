import { Router } from "express";
import { createTrip, getMyTrips } from "../Controllers/trips.controller";

const trips_router = Router()

trips_router.post('/order_rhide', createTrip)
trips_router.get('/:id', getMyTrips)


export default trips_router