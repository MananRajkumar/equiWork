import { Router } from "express";
import { applyPost, getApplication, getApplicationsForPost, updateApplicationStatus } from "../controllers/applicationController";

const router = Router();

router.post('/apply-post', applyPost);

router.get('/application', getApplication);

router.get('/:postID/applications', getApplicationsForPost);

router.patch(':applicationId/update-application-status', updateApplicationStatus);

export default router;