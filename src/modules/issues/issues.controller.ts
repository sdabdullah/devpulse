import type { Request, Response } from "express";
import { issuesService } from "./issues.service";

const makingIssueRequest = async (req: Request, res: Response,) => {
    const { title, description, type } = req.body

    try {
        const issuesResult = await issuesService.createIssueDBQuery(req.body);

        res.status(201).json({
            success: true,
            message: "Issue created successfully",
            data: issuesResult.rows[0],
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "The issue alredy Submitted",
            error: error
        });
    }
}


const getAllIssuesRequest = async (req: Request, res: Response) => {
    try {

        const allIssuResult = await issuesService.getAllIssuesDBQuery();
        res.status(200).json({
            success: true,
            message: "Issues retrived successfully",
            data: allIssuResult.rows,
        });
    } catch (error) {
        res.status(404).json({
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
            res.status(404).json({
                success: false,
                message: "Issue Not found!",
                // data: {}
            });
        }

        res.status(200).json({
            success: true,
            message: "Issue retrived successfully",
            data: result.rows[0],
        });
    } catch (error) {
        res.status(404).json({
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
            res.status(404).json({
                success: false,
                message: "Issue Not found!"
            });
        }

        // console.log(updateIssueResult);

        res.status(200).json({
            success: true,
            message: "Issue updated successfully",
            data: updateIssueResult.rows[0],
        });
    } catch (error) {
        res.status(500).json({
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
            res.status(404).json({
                success: false,
                message: "Issue Not found!"
            });
        }

        res.status(200).json({
            success: true,
            message: "Issue deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
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