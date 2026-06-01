import { pool } from "../../db/dbIndex"
import type { IsignupUser } from "./users.interface"

const insertSignupQuery = async (payload: IsignupUser) => {
    const { name, email, password, role } = payload
    const registrationResult = await pool.query(`
            INSERT INTO users(name,email,password,role) VALUES($1,$2,$3,$4) RETURNING *
        `, [name, email, password, role]);
    // RETURNING id,name,email,role,updated_at,created_at
    // console.log(registrationResult);

    return registrationResult;
}


export const usersService = {
    insertSignupQuery,
}