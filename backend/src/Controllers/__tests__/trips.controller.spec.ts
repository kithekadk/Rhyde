import { Request } from "express";
import Connection from "../../DbHelper/dbhelper";
import { getCustomerTrips, getDriversTrips } from "../trips.controller";

jest.mock("../../DbHelper/dbhelper")

describe('Trips Test Suite', ()=>{
    let res:any;
    let trips:any

    beforeEach(()=>{
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        }

        trips = {
            recordset: [
                {
                    customer_id: "4756cf7d-ff5c-4b78-965d-864691cbe560",
                    driver_id: "62df57e4-f2d7-4ddd-898c-022f91582113",
                    trip_id: "87d0728f-d4ea-4151-bf7e-f6c098fe659d",
                    where_from: "Nyeri",
                    destination: "Nanyuki",
                    price: "1500 KSH",
                    vehicle_size: "SM",
                    pickup_time: "2024-02-08T10:09:21.287Z",
                    dropoff_time: null,
                    status: "pending",
                    user_id: "4756cf7d-ff5c-4b78-965d-864691cbe560",
                    name: "Nyambura Chomba",
                    email: "sheila@yopmail.com",
                    phone_number: "0787654321",
                    role: "customer",
                    Password: "12345678",
                    profile_image: "",
                    location: "Nyeri",
                    isDeleted: false,
                    isWelcomed: true
                  },
            ]
        };

    })

    it("gets a customers trips", async()=>{
  
        const req = {
            params:{
                customer_id: '4756cf7d-ff5c-4b78-965d-864691cbe560'
            }
        };

        (Connection.execute as jest.Mock).mockResolvedValueOnce({
            recordset: trips.recordset
        })

        await getCustomerTrips(req as any, res)

        expect(res.json).toHaveBeenCalledWith({
            trips: trips.recordset
        }) 
    })

    it('gets drivers trips', async()=>{
        const req = {
            params:{
                driver_id: '4756cf7d-ff5c-4b78-965d-864691cbe560'
            }
        };

        (Connection.query as jest.Mock).mockResolvedValueOnce({
            recordset: trips.recordset
        })

        await getDriversTrips(req as any, res)

        expect(res.json).toHaveBeenCalledWith({trips: trips.recordset})
    })
})