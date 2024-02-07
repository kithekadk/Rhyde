CREATE TABLE Trip(
    customer_id VARCHAR(100) NOT NULL, 
    driver_id VARCHAR(100) NOT NULL, 
    trip_id VARCHAR(100) NOT NULL,
    where_from VARCHAR(500) NOT NULL,
    destination VARCHAR(100) NOT NULL,
    price VARCHAR(10) NOT NULL,
    vehicle_size VARCHAR(50) NOT NULL,
    pickup_time DATETIME Default GETDATE(),
    dropoff_time DATETIME
)

SELECT * FROM Trip