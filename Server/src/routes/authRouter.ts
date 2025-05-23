import { Router } from "express";
import { AuthController } from "../controllers";

const authRouter = Router();

/**
 * Insert your routes here
 * @example exampleRouter.get("/", getExample)
 */

authRouter.post("/register-user", AuthController.Register);
authRouter.post("/login-user", AuthController.Login);
authRouter.post("/request-vendor", AuthController.Request);
export default authRouter;
