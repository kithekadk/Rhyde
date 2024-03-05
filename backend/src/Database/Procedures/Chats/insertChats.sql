CREATE OR ALTER PROCEDURE insertChats(
    @data VARCHAR(MAX),
    @isBinary BIT,
    @userId VARCHAR(100)
)
AS
BEGIN
    INSERT INTO Chat(data, isBinary, userId) VALUES(@data, @isBinary, @userId)
END