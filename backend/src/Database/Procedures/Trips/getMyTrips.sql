CREATE OR ALTER PROCEDURE getMyTrips(@user_id VARCHAR(100))
AS
BEGIN
    SELECT * FROM Trip t LEFT JOIN Users u ON u.user_id = t.customer_id 
    WHERE customer_id = @user_id
END