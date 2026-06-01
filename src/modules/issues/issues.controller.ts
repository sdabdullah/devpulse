import type { Request, Response } from "express";
import { issuesService } from "./issues.service";

const makingIssueRequest = async (req: Request, res: Response,) => {
    const { title, description, type } = req.body

    // const reporter_id = req.user.id;
    const status = "open"
    try {
        const issuesResult = await issuesService.createIssueQuery(req.body);

        res.status(201).json({
            success: true,
            message: "Issue created successfully",
            // data: issuesResult.rows[0],
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

        const allIssuResult = await issuesService.getAllIssuesQuery();
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


export const issuesController = {
    makingIssueRequest,
    getAllIssuesRequest
}