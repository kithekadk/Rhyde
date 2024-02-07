CREATE PROCEDURE registerUser(
    @user_id VARCHAR(100), 
    @name VARCHAR(200),
    @email VARCHAR(255),
    @phone_number VARCHAR(15),
    @role VARCHAR(20),
    @Password VARCHAR(200),
    @profile_image VARCHAR(200),
    @location VARCHAR(100)
    )
AS
BEGIN 
    INSERT INTO Users(user_id, name, email, phone_number, role, Password, profile_image, location)
    VALUES(@user_id, @name, @email, @phone_number, @role, @Password, @profile_image, @location)
END
