import express, { type Application, type Request, type Response } from "express";
import { Pool } from "pg"

const app: Application = express();
const port = 5000;

app.use(express.json());

const pool = new Pool({
    connectionString: "postgresql://neondb_owner:npg_hixQWEmUVI94@ep-late-term-aoi8i72v-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
});

const initDB = async () => {
    try {
        await pool.query(`

            CREATE TABLE IF NOT EXISTS users(

                id SERIAL PRIMARY KEY,
                name VARCHAR(20) NOT NULL,
                email VARCHAR(30) UNIQUE NOT NULL,
                password VARCHAR(20) NOT NULL,
                role VARCHAR(20),

                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            )
        `)
        console.log("Databse Connected");
    } catch (error) {
        console.log(error);
    }
}

initDB();

app.get("/", (req: Request, res: Response) => {
    res.send("Hello world!")
});

// -------------- User Registration --------------
app.post("/api/auth/signup", async (req: Request, res: Response) => {
    const { name, email, password, role } = req.body;

    try {
        const registrationResult = await pool.query(`
            INSERT INTO users(name,email,password,role) VALUES($1,$2,$3,$4) RETURNING *
        `, [name, email, password, role])

        // console.log(registrationResult);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: registrationResult.rows[0],
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "User alredy exists",
            error: error
        });
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});