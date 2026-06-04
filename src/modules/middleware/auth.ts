import type { NextFunction, Request, Response } from "express";

const middlewareAuth = () => {
    return (req: Request, res: Response, next: NextFunction) => {

        const token = req.headers.authorization;

        if (!token) {
            res.status(401).json({
                success: false,
                message: "Unauthorized acess"
            });
        }
        next()
    };
}


export default middlewareAuth