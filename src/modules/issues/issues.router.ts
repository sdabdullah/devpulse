import { Router } from "express";
import { issuesController } from "./issues.controller";



const router = Router();

router.post("/", issuesController.makingIssueRequest);
router.get("/", issuesController.getAllIssuesRequest);
router.get("/:id", issuesController.getSingleIssueRequest);
router.patch("/:id", issuesController.updateIssueRequest);
router.delete("/:id", issuesController.deleteIssuRequest);


export const issuesRouter = router