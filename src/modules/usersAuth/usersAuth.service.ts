import { pool } from "../../db/dbIndex";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import config from "../../config";



const userLoginQuery = async (payload: { email: string; password: string }) => {
    const { email, password } = payload

    const userLoginResult = await pool.query(`
        SELECT * FROM users WHERE email=$1
    `, [email]);

    // delete userLoginResult.rows[0].password;


    if (userLoginResult.rows.length === 0) {
        throw new Error("Invalid login details")
    }

    const users = userLoginResult.rows[0]
    const matchPassword = await bcrypt.compare(password, users.password)

    if (!matchPassword) {
        throw new Error("Invalid login details")
    }

    const jwtTokenPayload = {
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        created_at: users.created_at,
        updated_at: users.updated_at
    }

    const user = jwtTokenPayload

    const token = jwt.sign(jwtTokenPayload, config.jwtsectet as string, {
        expiresIn: "1d"
    })

    return { token, user }
}

export const usersAuthService = {
    userLoginQuery,
}