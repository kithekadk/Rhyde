CREATE TABLE Chat(
    data VARCHAR(MAX) NOT NULL, 
    isBinary BIT NOT NULL,
    userId VARCHAR(100) NOT NULL,
    messageTime DATETIME Default GETDATE()
)

DROP TABLE Chat

SELECT * FROM Chat