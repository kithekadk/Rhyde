import app from "../../server";
import request from 'supertest'

describe('TDD for Vehicles Controller', ()=>{

    it('get all vehicles', async()=>{
        let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjJkZjU3ZTQtZjJkNy00ZGRkLTg5OGMtMDIyZjkxNTgyMTEzIiwibmFtZSI6IkphbWVzIEthcml1a2kiLCJlbWFpbCI6ImphbWVzZXcyNjA1QGdtYWlsLmNvbSIsInJvbGUiOiJkcml2ZXIiLCJpYXQiOjE3MDg1OTQ2NTksImV4cCI6MTcwODU5ODI1OX0.US7MByo3_ZfQh6Ghqd45oJv9GCt-K6yosNT8CkVIl_o'

        let res = await request(app).get('/vehicles').set('token', token)

        expect(res.status).toBe(200)

        expect(res.body.vehicles).toBeInstanceOf(Array)

    })

    it('get a single Vehicle by ID', async()=>{

        let res = await request(app).get('/vehicles/c4fd4d53-f88f-4030-b469-11595d6dc62e')

        expect(res.status).toBe(200)

        expect(res.body.vehicle).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    vehicle_id: expect.any(String),
                    driver_id: expect.any(String),
                    capacity: expect.any(Number),
                    registration_no: expect.any(String),
                    brand: expect.any(String),
                    year_of_manufacture: expect.any(Number),
                    verified: expect.any(Boolean) 
                })
            ])
        )
    })
})