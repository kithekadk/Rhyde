CREATE OR ALTER PROCEDURE getMyTrips(@user_id VARCHAR(100))
AS
BEGIN
    SELECT * FROM Trip WHERE customer_id = @user_id OR driver_id = @user_id
END