import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken"
import config from "../../config";
import { pool } from "../../db/dbIndex";
import { error } from "node:console";
import type { ROLES } from "../../types";

const middlewareAuth = (...roles: ROLES[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        console.log(roles);
        try {
            const token = req.headers.authorization;

            if (!token) {
                res.status(401).json({
                    success: false,
                    message: "Unauthorized access"
                });
            }

            const decoded = jwt.verify(token as string, config.jwtsectet as string) as JwtPayload

            const usersData = await pool.query(`
            SELECT * FROM users WHERE email=$1
        `, [decoded.email])

            const users = usersData.rows[0];

            if (usersData.rows.length === 0) {
                res.status(404).json({
                    success: false,
                    message: "User not found!",
                });
            }

            if (roles.length && !roles.includes(users.role)) {
                res.status(401).json({
                    success: false,
                    message: "Access Denied",
                });
            }

            req.user = decoded

            next()

        } catch (error) {
            next(error)
        }
    };
}


export default middlewareAuth