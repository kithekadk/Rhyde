CREATE OR ALTER PROCEDURE getAllVehicles
AS
BEGIN
    IF NOT EXISTS (SELECT * FROM Vehicles)
        BEGIN 
            DECLARE @error VARCHAR(100) = 'No registered vehicles yet';
            RAISERROR(@error, 16, 1);
            RETURN;
        END
    ELSE
        BEGIN
            SELECT * FROM Vehicles
        END
END