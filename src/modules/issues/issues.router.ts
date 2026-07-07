import { Router } from "express";
import { issuesController } from "./issues.controller";
import middlewareAuth from "../../middleware/auth";
import { userRole } from "../../types/types";

const router = Router();

router.post("/", middlewareAuth(userRole.contributor, userRole.maintainer), issuesController.makingIssueRequest);

router.get("/", issuesController.getAllIssuesRequest);
router.get("/:id", issuesController.getSingleIssueRequest);

router.patch("/:id", middlewareAuth(userRole.maintainer, userRole.contributor), issuesController.updateIssueRequest);

router.delete("/:id", middlewareAuth(userRole.maintainer), issuesController.deleteIssuRequest);


export const issuesRouter = router