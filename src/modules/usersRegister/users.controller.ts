import type { Request, Response } from "express";
import { usersService } from "./users.service";
import handleResponse from "../../utils/handleResponse";

const userSignupRequest = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    try {
        const registrationResult = await usersService.insertSignupQuery(req.body)

        handleResponse(res, {
            statusCode: 201,
            success: true,
            message: "User registered successfully",
            data: registrationResult.rows[0]
        })
 
    } catch (error) {
        handleResponse(res, {
            statusCode: 400,
            success: false,
            message: "User alredy exists",
            error: error
        })

    }
}

export const userController = {
    userSignupRequest,
}