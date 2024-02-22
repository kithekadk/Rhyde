import { Request, Response } from 'express'
import {v4} from 'uuid'
import Connection from '../DbHelper/dbhelper'

export const registerVehicle = async(req:Request, res:Response)=>{
    try {
        let vehicle_id = v4()

        let {driver_id, capacity, registration_no, brand, year_of_manufacture} = req.body

        let vehicles = (await Connection.execute('registerVehicle', {vehicle_id, driver_id, capacity, registration_no, brand, year_of_manufacture})).rowsAffected

        console.log(vehicles);

        return res.status(200).json({
            message: "Ride registered successfully"
        })
        

    } catch (error) {
        return res.json({
            error
        })
    }
}

export const getAllVehicles = async(req: Request, res: Response)=>{
    try {
        let vehicles = (await Connection.execute('getAllVehicles', {})).recordset

        return res.status(200).json({
            vehicles
        })
    } catch (error) {
        return res.json({
            error
        })
    }
}

export const getOneVehicle = async(req:Request, res:Response)=>{
    try {
        let {vehicle_id} = req.params
        
        let query = `SELECT * FROM Vehicles WHERE vehicle_id = '${vehicle_id}'`

        let vehicle = (await Connection.query(query)).recordset


        return res.status(200).json({
            vehicle
        })
    } catch (error) {
        return res.json({
            error
        })
    }
}