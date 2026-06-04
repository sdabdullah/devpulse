import type { Request, Response } from "express";
import { usersService } from "./users.service";

const userSignupRequest = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    try {
        const registrationResult = await usersService.insertSignupQuery(req.body)

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
}

export const userController = {
    userSignupRequest,
}