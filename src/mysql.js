import mysql from 'mysql2/promise'

console.log("process.env.DB_HOST => ",process.env.DB_HOST)
console.log("process.env.DB_USER => ",process.env.DB_USER)
console.log("process.env.DB_PASSWORD => ",process.env.DB_PASSWORD)
console.log("process.env.DB_DATABASE => ",process.env.DB_DATABASE)
console.log("process.env.DB_PORT => ",process.env.DB_PORT)
// Create a connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
});

const excuteQuery = (query, escap) => {
    return new Promise(async (resolve, reject) => {
        let connection;
        try {
            connection = await pool.getConnection();
            const [results, fields] = await connection.query(query, escap);
            resolve(results)
        } catch (err) {
            reject(err)
        } finally {
            if (connection) connection.release();
        }
    })
}

// Export the pool for use in other files
export default excuteQuery;
