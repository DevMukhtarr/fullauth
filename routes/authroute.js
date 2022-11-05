import { Router } from "express";
import { signUp, signIn, greetUser} from "../controller/authcontroller.js";
import { verifyToken } from "../middleware/auth.js";
const router = Router();

router.route("/signup").post(signUp);
router.route("/signIn").post(signIn);
router.route("/greet-user").get(verifyToken, greetUser)

export default router;