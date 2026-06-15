import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken"
import config from "../../config";
import { pool } from "../../db/dbIndex";
import type { ROLES } from "../../types/types";
import handleResponse from "../../utils/handleResponse";

const middlewareAuth = (...roles: ROLES[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        console.log(roles);
        try {
            const token = req.headers.authorization;

            if (!token) {
                const error = Error("Unauthorized access");
                handleResponse(res, {
                    statusCode: 401,
                    success: false,
                    message: error.message,
                    error: error
                });
            }

            const decoded = jwt.verify(token as string, config.jwtsectet as string) as JwtPayload

            const usersData = await pool.query(`
            SELECT * FROM users WHERE email=$1
        `, [decoded.email])

            const users = usersData.rows[0];

            if (usersData.rows.length === 0) {
                const error = Error("User not found!");
                handleResponse(res, {
                    statusCode: 404,
                    success: false,
                    message: error.message,
                    error: error
                })
            }

            if (roles.length && !roles.includes(users.role)) {
                const error = Error("Access Denied");
                handleResponse(res, {
                    statusCode: 401,
                    success: false,
                    message: error.message,
                    error: error
                })
            }

            req.user = decoded

            next()

        } catch (error) {
            next(error)
        }
    };
}


export default middlewareAuth