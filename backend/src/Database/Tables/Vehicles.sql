CREATE TABLE Vehicles (
    vehicle_id VARCHAR(100) NOT NULL,
    driver_id VARCHAR(100) NOT NULL UNIQUE,
    capacity INT NOT NULL,
    registration_no VARCHAR(10) NOT NULL UNIQUE,
    brand VARCHAR(50) NOT NULL,
    year_of_manufacture INT NOT NULL,
    verified BIT DEFAULT 0
)
