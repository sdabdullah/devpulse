import express, { type Application, type Request, type Response } from "express";
import { Pool } from "pg"
import config from "./config";
import { pool } from "./db/dbIndex";
import { usersRouter } from "./modules/usersRegister/users.router";
import { issuesRouter } from "./modules/issues/issues.router";
import { usersAuthRouter } from "./modules/usersAuth/usersAuth.router";

const app: Application = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("Hello world!")
});

// -------------- User Registration API Endpoints --------------
app.use("/api/auth/signup", usersRouter)

// -------------- User Login --------------
app.use("/api/auth/login", usersAuthRouter);


// -------------- Create Issue --------------
app.use("/api/issues", issuesRouter);


// -------------- Get All issues --------------
app.get("/api/issues", issuesRouter);

// -------------- Get Single Issue --------------
app.get("/api/issues/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const result = await pool.query(`
            SELECT * FROM issues WHERE id=$1
        `, [id])

        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "Issue Not found!",
                // data: {}
            });
        }

        res.status(200).json({
            success: true,
            message: "Issue retrived successfully",
            data: result.rows[0],
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Issue Not found!",
            error: error
        });
    }
});

// -------------- Update Issue using patch --------------
app.patch("/api/issues/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description, type } = req.body;


    try {
        const updateIssueResult = await pool.query(`

            UPDATE issues SET 
            title=COALESCE($1, title),
            description=COALESCE($2, description),
            type=COALESCE($3, type)

            WHERE id=$4 
            RETURNING *

            `, [id, title, description, type,]
        );

        if (updateIssueResult.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "Issue Not found!"
            });
        }

        // console.log(updateIssueResult);

        res.status(200).json({
            success: true,
            message: "Issue updated successfully",
            data: updateIssueResult.rows[0],
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error
        });
    }
});


// -------------- Delete Issue --------------
app.delete("/api/issues/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const deleteResult = await pool.query(`

            DELETE FROM issues WHERE id=$1

            `, [id]
        );

        if (deleteResult.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: "Issue Not found!"
            });
        }

        res.status(200).json({
            success: true,
            message: "Issue deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error
        });
    }
});

export default app