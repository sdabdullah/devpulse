import { pool } from "../../db/dbIndex";
import type { Iisseu, IupdateIssue } from "./issue.interface";


const createIssueDBQuery = async (payload: Iisseu) => {

    const { title, description, type, reporter_id } = payload;

    const status = "open"

    const user = await pool.query(`
        SELECT * FROM users WHERE id=$1
    `, [reporter_id]);

    // console.log(user);

    if (user.rows.length === 0) {
        throw new Error("User Not Exists!")
    }

    const issuesResult = await pool.query(`
        INSERT INTO issues(title, description, type, status, reporter_id) VALUES($1,$2,$3,$4,$5) RETURNING *
    `, [title, description, type, status, reporter_id]);

    return issuesResult;

}


const getAllIssuesDBQuery = async () => {

    const allIssuResult = await pool.query(`
        SELECT * FROM issues
    `)
    
    return allIssuResult;
}

const getSingleIssueDBQuery = async (id: string) => {
    const result = await pool.query(`
        SELECT * FROM issues WHERE id=$1
    `, [id]);

    return result;
}


const updateIssueDBQuery = async (payload: IupdateIssue, id: string) => {
    const { title, description, type } = payload

    const status = "in_progress"

    const updateIssueResult = await pool.query(`

        UPDATE issues SET 
        title=COALESCE($1, title),
        description=COALESCE($2, description),
        type=COALESCE($3, type),
        status=COALESCE($4, status)
        WHERE id=$5 RETURNING *

        `, [title, description, type, status, id]
    );

    return updateIssueResult;
}

const deleteIssueDBQuery = async (id: string) => {

    const deleteResult = await pool.query(`

        DELETE FROM issues WHERE id=$1

        `, [id]
    );

    return deleteResult;
}


export const issuesService = {
    createIssueDBQuery,
    getAllIssuesDBQuery,
    getSingleIssueDBQuery,
    updateIssueDBQuery,
    deleteIssueDBQuery
}