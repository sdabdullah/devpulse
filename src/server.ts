import express, { type Application, type Request, type Response } from "express"
const app: Application = express();
const port = 5000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("Hello world!")
});


app.post("/", async (req: Request, res: Response) => {
    const { name, email, role, password } = req.body;

    res.status(201).json({
        message: "User registered successfully",
        data: {
            name,
            email,
            role
        },
    });
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});