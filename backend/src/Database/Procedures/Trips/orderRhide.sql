CREATE OR ALTER PROCEDURE orderRhide(
    @customer_id VARCHAR(100), 
    @driver_id VARCHAR(100), 
    @trip_id VARCHAR(100),
    @where_from VARCHAR(500),
    @destination VARCHAR(100),
    @price VARCHAR(10),
    @vehicle_size VARCHAR(50)
)
AS
BEGIN
    IF NOT EXISTS (SELECT * FROM Users WHERE user_id=@customer_id AND role='customer' AND isDeleted=0)
        BEGIN
            DECLARE @ErrorMsg VARCHAR(100) = 'Customer not found'
            RAISERROR(@ErrorMsg, 16, 1);
            RETURN;
        END
    ELSE IF NOT EXISTS (SELECT * FROM Users WHERE user_id=@driver_id AND role='driver' AND isDeleted=0)
        BEGIN
            DECLARE @ErrorMessage VARCHAR(100) = 'Driver not found'
            RAISERROR(@ErrorMessage, 16, 2);
            RETURN;
        END
    ELSE
        BEGIN
            INSERT INTO Trip(customer_id, driver_id, trip_id, where_from, destination, price, vehicle_size)
            VALUES(@customer_id, @driver_id, @trip_id, @where_from, @destination, @price, @vehicle_size)
        END
END