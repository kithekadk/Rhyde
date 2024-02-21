import mssql from 'mssql'
import {v4} from 'uuid'
import { Request, Response } from "express";
import { sqlConfig } from '../Config/sql.config';
import Connection from '../DbHelper/dbhelper';

// const dbhelper = new Connection

export const createTrip = async(req:Request, res:Response)=>{
    try {
        const {customer_id, driver_id, where_from, destination, price, vehicle_size} = req.body

        let trip_id = v4()

        // const pool = await mssql.connect(sqlConfig)

        // let result = (await pool.request()
        // .input("customer_id", customer_id)
        // .input("driver_id", driver_id)
        // .input("trip_id", trip_id)
        // .input("where_from", where_from)
        // .input("destination", destination)
        // .input("price", price)
        // .input("vehicle_size", vehicle_size)
        // .execute("orderRhide")).rowsAffected

        let result = await (Connection.execute("orderRhide", {
            customer_id, driver_id, trip_id, where_from, destination, price, vehicle_size
        }))

        if(result.rowsAffected[0] < 1){
            return res.json({
                error: "Trip creation failed"
            })
        }else{
            return res.json({
                message: "Your driver is on the way"
            })
        }
        

    } catch (error:any) {
        return res.json({
            error: error.originalError.info.message
        })
    }
}

export const getCustomerTrips = async(req:Request, res: Response)=>{
    try {
        const id = req.params.customer_id

        // const pool = await mssql.connect(sqlConfig)

        // const trips = await(await pool.request()
        // .input("user_id", id)
        // .execute("getMyTrips")).recordset

        // console.log(trips);

        let trips = await (await Connection.execute("getMyTrips", {user_id:id})).recordset
        

        if(trips.length > 0){
            return res.json({
                trips
            })
        }else{
            return res.json({
                message: "No trips found"
            })
        }
        
    } catch (error:any) {
        return res.json({
            error: error.originalError.info.message
        })
    }
}

export const getDriversTrips = async(req:Request, res: Response)=>{
    try {
        const id = req.params.driver_id

        console.log(id);
        

        let query = `SELECT * FROM Trip WHERE driver_id = '${id}'`

        let driver_trips = await Connection.query(query)

        console.log(driver_trips);
        

        if(driver_trips.recordset.length > 0){
            return res.json({
                trips: driver_trips.recordset
            })
        }else{
            return res.json({
                message: "No trips found"
            })
        }

    } catch (error:any) {
        return res.json({
            error: error.originalError.info.message
        })
    }
}