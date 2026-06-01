import { pool } from "../../db/dbIndex";

const userLoginQuery = async () => {
    const loginResult = await pool.query(`
        SELECT * FROM users
    `)

    return loginResult;
}

export const usersAuthService = { 
    userLoginQuery
}