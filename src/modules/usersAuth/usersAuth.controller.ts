import type { Request, Response } from "express";
import { usersAuthService } from "./usersAuth.service";
import handleResponse from "../../utils/handleResponse";

const userLoginRequest = async (req: Request, res: Response) => {

    try {

        const userLoginResult = await usersAuthService.userLoginQuery(req.body);

        handleResponse(res, {
            statusCode: 200,
            success: true,
            message: "Login successful",
            data: userLoginResult
        })
    } catch (error) {
        handleResponse(res, {
            statusCode: 400,
            success: true,
            message: "Invalid login details",
            error: error
        })
    }
}

export const usersAuthController = {
    userLoginRequest
}