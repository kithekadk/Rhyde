import { Router } from "express";
import { createTrip, getCustomerTrips, getDriversTrips } from "../Controllers/trips.controller";

const trips_router = Router()

trips_router.post('/order_rhide', createTrip)
trips_router.get('/customer/:customer_id', getCustomerTrips)
trips_router.get('/driver/:driver_id', getDriversTrips)

export default trips_router