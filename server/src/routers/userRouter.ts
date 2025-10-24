import express from "express";
import { signupUser,loginUser, logout} from "../controllers/authControllers";
import { getCurrentUser } from "../controllers/authControllers"
import { authToken } from "../middleware/middleware";

const router = express.Router();


router.post("/signup",signupUser);
router.post("/login",loginUser);
router.post("/logout",logout);

router.get("/",authToken,getCurrentUser);
export default router;