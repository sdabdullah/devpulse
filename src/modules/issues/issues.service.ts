import { pool } from "../../db/dbIndex";

const createIssueQuery = async (payload: any) => {

    const { title, description, type, status } = payload

    // const issuesResult = await pool.query(`
    //     INSERT INTO issues(title,description,type, status, reporter_id) VALUES($1,$2,$3,$4,$5) RETURNING *
    // `, [title, description, type, status]);

    // return issuesResult;
}


const getAllIssuesQuery = async () => {

    const allIssuResult = await pool.query(`
        SELECT * FROM issues
    `)

    return allIssuResult;
}

export const issuesService = {
    createIssueQuery,
    getAllIssuesQuery
}