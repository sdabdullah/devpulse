import express, { type Application, type Request, type Response } from "express";
import { usersRouter } from "./modules/usersRegister/users.router";
import { issuesRouter } from "./modules/issues/issues.router";
import { usersAuthRouter } from "./modules/usersAuth/usersAuth.router";
import cors from "cors"
import hadleGobalError from "./middleware/globalErrorHadler";

const app: Application = express();

app.use(express.json());
const corsOptions ={
    origin: "http://localhost:3000"
}
app.use(cors(corsOptions))

app.get("/", (req: Request, res: Response) => {
    res.send("DevPulse Server Running")
});

app.use("/api/auth/signup", usersRouter);
app.use("/api/auth/login", usersAuthRouter);
app.use("/api/issues", issuesRouter);

app.use(hadleGobalError);

export default app