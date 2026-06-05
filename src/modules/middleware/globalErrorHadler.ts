import type { NextFunction, Request, Response } from "express";

interface IError {
    success: boolean,
    message: string,
    stack: any
}

const hadleGobalError = (err: IError, req: Request, res: Response, next: NextFunction) => {
    console.log(err.stack);

    res.status(500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
}

export default hadleGobalError