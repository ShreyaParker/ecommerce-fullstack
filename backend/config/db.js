import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

const connectDB = async () =>{
    try{
        await pool.connect();
        console.log("Database Connected Successfully!");

    } catch(err){
        console.error("Error connecting to Database",err.message);
        process.exit(1);
    }

}

export {pool , connectDB}