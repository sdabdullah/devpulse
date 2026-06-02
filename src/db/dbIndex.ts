import { Pool } from "pg";
import config from "../config";

export const pool = new Pool({
    connectionString: config.connection_string
});

export const initDB = async () => {
    try {
        await pool.query(`

            CREATE TABLE IF NOT EXISTS users(

                id SERIAL PRIMARY KEY,
                name VARCHAR(20) NOT NULL,
                email VARCHAR(30) UNIQUE NOT NULL,
                password VARCHAR(60) NOT NULL,
                role VARCHAR(20) ,

                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            )
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS issues(

                id SERIAL PRIMARY KEY,
                title VARCHAR(150) NOT NULL,
                description VARCHAR(100) NOT NULL,
                type VARCHAR(50) NOT NULL,
                status VARCHAR(50) NOT NULL,
                reporter_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,

                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            )  
        `);


        console.log("Database Connected");

    } catch (error) {
        console.log(error);
    }
}