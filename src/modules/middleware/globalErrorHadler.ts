import type { NextFunction, Request, Response } from "express";

interface IError {
    success: boolean,
    message: string,
}

const hadleGobalError = (error: IError, req: Request, res: Response, next: NextFunction) => {

    res.status(500).json({
        success: false,
        message: error.message || "Internal Server Error",
    });
}

export default hadleGobalError