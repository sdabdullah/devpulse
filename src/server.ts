import express, { type Application, type Request, type Response } from "express";
import { Pool } from "pg"
import config from "./config";

const app: Application = express();
const port = config.port;

app.use(express.json());

const pool = new Pool({
    connectionString: config.connection_string
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

// -------------- User Login --------------
app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {

        // const loginResult = await pool.query(`
        //     SELECT * FROM issues
        //     `)

        res.status(201).json({
            success: true,
            message: "Login successful",
            // data: registrationResult.rows[0],
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Invalid login details",
            error: error
        });
    }
})


// -------------- Create Issue --------------
app.post("/api/issues", async (req: Request, res: Response) => {
    const { title, description, type } = req.body
    try {
        const issuesResult = await pool.query(`
            INSERT INTO issues(title,description,type) VALUES($1,$2,$3) RETURNING *
        `, [title, description, type])

        res.status(201).json({
            success: true,
            message: "Issue created successfully",
            data: issuesResult.rows[0],
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "The issue alredy Submitted",
            error: error
        });
    }
})


// -------------- Get All issues --------------
app.get("/api/issues?sort=newest", async (req: Request, res: Response) => {
    try {

        const allIssuResult = await pool.query(`
                SELECT * FROM issues
            `)

        res.status(201).json({
            success: true,
            message: "Issues retrived successfully",
            data: allIssuResult.rows,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Issus Not found!",
            error: error
        });
    }
})



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});