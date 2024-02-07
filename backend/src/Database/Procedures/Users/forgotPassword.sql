CREATE OR ALTER PROCEDURE resetPassword(@email VARCHAR(200), @password VARCHAR(100), @phone_number VARCHAR(15))
AS
BEGIN
    UPDATE Users SET Password = @password WHERE email=@email AND phone_number = @phone_number
END