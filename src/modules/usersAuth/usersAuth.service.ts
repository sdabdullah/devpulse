import { pool } from "../../db/dbIndex";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import config from "../../config";

const userLoginQuery = async (payload: { email: string; password: string }) => {
    const { email, password } = payload

    const userLoginResult = await pool.query(`
        SELECT * FROM users WHERE email=$1
    `, [email]);

    if (userLoginResult.rows.length === 0) {
        throw new Error("Invalid login details")
    }

    const user = userLoginResult.rows[0]
    const matchPassword = await bcrypt.compare(password, user.password)

    if (!matchPassword) {
        throw new Error("Invalid login details")
    }

    const jwtTokenPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        created_at: user.created_at,
        updated_at: user.updated_at
    }

    const token = jwt.sign(jwtTokenPayload, config.jwtsectet as string, {
        expiresIn: "1d"
    })

    delete userLoginResult.rows[0].password
    return { token, user }
}

export const usersAuthService = {
    userLoginQuery,
}