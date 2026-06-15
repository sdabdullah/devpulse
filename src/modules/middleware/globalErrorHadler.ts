import type { NextFunction, Request, Response } from "express";

type error = Error;

const hadleGobalError = (err: error, req: Request, res: Response, next: NextFunction) => {

    res.status(500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
}

export default hadleGobalError