CREATE PROCEDURE updateUser(
    @user_id VARCHAR(100),
    @name VARCHAR(200), 
    @email VARCHAR(200), 
    @phone_number VARCHAR(15), 
    @role VARCHAR(20), 
    @password VARCHAR(100), 
    @profile_image VARCHAR(200))
AS
BEGIN
    UPDATE Users SET 
        name=@name, 
        email=@email, 
        phone_number=@phone_number, 
        role=@role, 
        password=@password, 
        profile_image=@profile_image
    WHERE user_id = @user_id
END