import mysql from 'mysql2/promise';  // Importing mysql2 with promise support
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();
// Create a connection to the database using promises
const dbConn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

// Test the connection asynchronously
async function testConnection() {
  try {
    const connection = await dbConn;
    console.log('Connected to the database.');
  } catch (err: any) {
    console.error('Database connection failed: ' + err.stack);
  }
}

testConnection();

export default dbConn;
