import type { Request, Response } from "express";
import { issuesService } from "./issues.service";
import handleResponse from "../../utils/handleResponse";

const makingIssueRequest = async (req: Request, res: Response,) => {
    const { title, description, type } = req.body

    const reporter_id = req.user?.id;

    try {

        const issuesResult = await issuesService.createIssueDBQuery(req.body, reporter_id);

        handleResponse(res, {
            statusCode: 201,
            success: true,
            message: "Issue created successfully",
            data: issuesResult.rows[0]
        });
    } catch (err) {
        const error = err as Error;
        handleResponse(res, {
            statusCode: 400,
            success: false,
            message: error.message,
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
    } catch (err) {
        const error = err as Error;
        handleResponse(res, {
            statusCode: 404,
            success: false,
            message: `${error.message} or Issues Not found!`,
            error: error
        });
    }
}

const getSingleIssueRequest = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {

        const result = await issuesService.getSingleIssueDBQuery(id as string)

        if (result.rows.length === 0) {
            const error = Error("Issue Not found!")
            handleResponse(res, {
                statusCode: 404,
                success: false,
                message: error.message,
                error: error
            });
        }

        handleResponse(res, {
            statusCode: 200,
            success: true,
            message: "Issue retrived successfully",
            data: result.rows[0]
        });
    } catch (err) {
        const error = err as Error;
        handleResponse(res, {
            statusCode: 404,
            success: false,
            message: `${error.message} or Issue Not found!`,
            error: error
        });
    }
}

const updateIssueRequest = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const updateIssueResult = await issuesService.updateIssueDBQuery(req.body, id as string)

        if (updateIssueResult.rows.length === 0) {
            const error = Error("Issue Not found!");
            handleResponse(res, {
                statusCode: 404,
                success: false,
                message: error.message,
                error: error
            });
        }

        handleResponse(res, {
            statusCode: 200,
            success: true,
            message: "Issue updated successfully",
            data: updateIssueResult.rows[0]
        });
    } catch (err) {
        const error = err as Error;
        handleResponse(res, {
            statusCode: 500,
            success: false,
            message: `${error.message} or Internal Server Error`,
            error: error
        });
    }
}

const deleteIssuRequest = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {

        const deleteResult = await issuesService.deleteIssueDBQuery(id as string)

        if (deleteResult.rowCount === 0) {
            const error = Error("Issue not found!");
            handleResponse(res, {
                statusCode: 404,
                success: false,
                message: error.message,
                error: error
            });
        }

        handleResponse(res, {
            statusCode: 200,
            success: true,
            message: "Issue deleted successfully",
            data: deleteResult
        });
    } catch (err) {
        const error = err as Error;
        handleResponse(res, {
            statusCode: 500,
            success: false,
            message: `${error.message} or Internal Server Error`,
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