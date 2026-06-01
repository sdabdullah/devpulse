import { Router } from "express";
import { issuesController } from "./issues.controller";



const router = Router();

router.post("/", issuesController.makingIssueRequest)
router.get("/", issuesController.getAllIssuesRequest)

export const issuesRouter = router