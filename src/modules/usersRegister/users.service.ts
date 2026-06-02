import { pool } from "../../db/dbIndex";
import type { IsignupUser } from "./users.interface";
import bcrypt from "bcryptjs";

const insertSignupQuery = async (payload: IsignupUser) => {

    const { name, email, password, role } = payload

    const userPassInHash = await bcrypt.hash(password, 12)

    console.log(userPassInHash);

    const registrationResult = await pool.query(`
            INSERT INTO users(name,email,password,role) VALUES($1,$2,$3,$4) RETURNING *
        `, [name, email, userPassInHash, role]);
    // RETURNING id,name,email,role,updated_at,created_at
    // console.log(registrationResult);

    delete registrationResult.rows[0].password;

    return registrationResult;
}


export const usersService = {
    insertSignupQuery,
}