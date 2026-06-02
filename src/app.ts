import express, { type Application, type Request, type Response } from "express";
import { usersRouter } from "./modules/usersRegister/users.router";
import { issuesRouter } from "./modules/issues/issues.router";
import { usersAuthRouter } from "./modules/usersAuth/usersAuth.router";

const app: Application = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("This is DevPulse project")
});

app.use("/api/auth/signup", usersRouter);
app.use("/api/auth/login", usersAuthRouter);
app.use("/api/issues", issuesRouter);

export default app