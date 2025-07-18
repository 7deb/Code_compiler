import express from "express";
import { executeCode } from "../controllers/compilerController";
import { authToken } from "../middleware/middleware";

const router = express.Router();

router.post("/execute",authToken,executeCode);

export default router;