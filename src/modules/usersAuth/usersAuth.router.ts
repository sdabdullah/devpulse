import { Router } from "express";
import { usersAuthController } from "./usersAuth.controller";


const router = Router();

router.post("/", usersAuthController.userLoginRequest)

export const usersAuthRouter = router

