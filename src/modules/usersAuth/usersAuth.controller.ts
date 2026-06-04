import type { Request, Response } from "express";
import { usersAuthService } from "./usersAuth.service";

const userLoginRequest = async (req: Request, res: Response) => {

    try {

        const userLoginResult = await usersAuthService.userLoginQuery(req.body);

        res.status(200).json({
            success: true,
            message: "Login successful",
            data: userLoginResult
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Invalid login details",
            error: error
        });
    }
}


export const usersAuthController = {
    userLoginRequest
}