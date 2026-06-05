import type { Request, Response } from "express";
import { issuesService } from "./issues.service";
import handleResponse from "../../utils/handleResponse";

const makingIssueRequest = async (req: Request, res: Response,) => {
    const { title, description, type } = req.body
    console.log(req.user);
    try {
        const issuesResult = await issuesService.createIssueDBQuery(req.body);

        handleResponse(res, {
            statusCode: 201,
            success: true,
            message: "Issue created successfully",
            data: issuesResult.rows[0]
        });
    } catch (error) {
        handleResponse(res, {
            statusCode: 400,
            success: false,
            message: "The issue alredy Submitted",
            error: error
        });
    }
}


const getAllIssuesRequest = async (req: Request, res: Response) => {
    try {

        const allIssuResult = await issuesService.getAllIssuesDBQuery();

        handleResponse(res, {
            statusCode: 200,
            success: true,
            message: "Issues retrived successfully",
            data: allIssuResult.rows
        });
    } catch (error) {
        handleResponse(res, {
            statusCode: 404,
            success: false,
            message: "Issues Not found!",
            error: error
        });
    }
}


const getSingleIssueRequest = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {

        const result = await issuesService.getSingleIssueDBQuery(id as string)

        if (result.rows.length === 0) {
            handleResponse(res, {
                statusCode: 404,
                success: false,
                message: "Issue Not found!"
            });
        }

        handleResponse(res, {
            statusCode: 200,
            success: true,
            message: "Issue retrived successfully",
            data: result.rows[0]
        });
    } catch (error) {
        handleResponse(res, {
            statusCode: 404,
            success: false,
            message: "Issue Not found!",
            error: error
        });
    }
}


const updateIssueRequest = async (req: Request, res: Response) => {
    const { id } = req.params;
    // const { title, description, type } = req.body;


    try {
        const updateIssueResult = await issuesService.updateIssueDBQuery(req.body, id as string)

        if (updateIssueResult.rows.length === 0) {
            handleResponse(res, {
                statusCode: 404,
                success: false,
                message: "Issue Not found!"
            });
        }

        // console.log(updateIssueResult);

        handleResponse(res, {
            statusCode: 200,
            success: true,
            message: "Issue updated successfully",
            data: updateIssueResult.rows[0]
        });
    } catch (error) {
        handleResponse(res, {
            statusCode: 500,
            success: false,
            message: "Internal Server Error",
            error: error
        });
    }
}


const deleteIssuRequest = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {

        const deleteResult = await issuesService.deleteIssueDBQuery(id as string)

        if (deleteResult.rowCount === 0) {
            handleResponse(res, {
                statusCode: 404,
                success: false,
                message: "Issue Not found!"
            });
        }

        handleResponse(res, {
            statusCode: 200,
            success: true,
            message: "Issue deleted successfully"
        });
    } catch (error) {
        handleResponse(res, {
            statusCode: 500,
            success: false,
            message: "Internal Server Error",
            error: error
        });
    }
}

export const issuesController = {
    makingIssueRequest,
    getAllIssuesRequest,
    getSingleIssueRequest,
    updateIssueRequest,
    deleteIssuRequest
}