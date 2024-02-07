import dotenv from 'dotenv'

dotenv.config()

console.log(process.env.DB_NAME);


export const sqlConfig = {
    user: 'sa',
    password: 'Dante99.',
    database: 'Rhyde',
    server: "DANIEL_KITHEKA\\MSSQLSERVER1",
    pool:{
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options:{
        encrypt: false,
        trustServerCertificate: true
    }
}

console.log(sqlConfig);
