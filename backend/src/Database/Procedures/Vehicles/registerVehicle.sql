CREATE OR ALTER PROCEDURE registerVehicle(
    @vehicle_id VARCHAR(100),
    @driver_id VARCHAR(100),
    @capacity INT,
    @registration_no VARCHAR(10),
    @brand VARCHAR(50),
    @year_of_manufacture INT
)
AS
BEGIN
    IF NOT EXISTS (SELECT * FROM Users WHERE user_id=@driver_id AND role ='driver' AND isDeleted=0)
        BEGIN 
            DECLARE @error VARCHAR(100) = 'Driver not found';
            RAISERROR(@error, 16, 1);
            RETURN;
        END
    ELSE
        BEGIN
            INSERT INTO Vehicles (vehicle_id, driver_id, capacity, registration_no, brand, year_of_manufacture)
            VALUES(@vehicle_id, @driver_id, @capacity, @registration_no, @brand, @year_of_manufacture)
        END
END