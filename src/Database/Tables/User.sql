CREATE TABLE Users(
    user_id VARCHAR(100) NOT NULL, 
    name VARCHAR(100) NOT NULL, 
    email VARCHAR(255) NOT NULL UNIQUE, 
    phone_number VARCHAR(15) NOT NULL UNIQUE, 
    role VARCHAR(20), Password VARCHAR(200) NOT NULL, 
    profile_image VARCHAR(200), 
    location VARCHAR(150),
    isDeleted BIT Default 0
)

ALTER TABLE Users ADD isDeleted BIT Default 0

SELECT * FROM Users

UPDATE Users SET isDeleted = 0