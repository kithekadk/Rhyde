import mssql from 'mssql'
import dotenv from 'dotenv'
import { sqlConfig } from '../Config/sqlconfig'
import ejs from 'ejs'
import { sendMail } from '../Helpers/emailHelpers'
dotenv.config()

export const welcomeUser = async()=>{
    const pool = await mssql.connect(sqlConfig)

    const users = (await pool.request().query('SELECT * FROM Users WHERE isWelcomed = 0 and isDeleted = 0')).recordset

    console.log(users);
    
    for(let user of users){
        ejs.renderFile('Templates/welcomeUser.ejs', {CustomerName: user.name}, async(error, data)=>{
            let mailOptions = {
                from: "gamesmy177@gmail.com",
                to: user.email,
                subject: "Welcome to Rhyde",
                html: data
            }

            try {
                await sendMail(mailOptions)

                await pool.request().query('UPDATE Users SET isWelcomed = 1 WHERE isWelcomed = 0 AND isDeleted = 0')

                console.log("Emails send to new users");
                
            } catch (error) {
                console.log(error);
            }
        })
    }
}