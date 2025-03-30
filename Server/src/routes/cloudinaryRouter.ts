import { Router } from "express";
import { CategoryController } from "../controllers";
import { protect } from "../middleware/protect";
import { checkRole } from "../middleware/checkRole";
import { getCloudinarySignature } from "../controllers/cloudinaryController";

const cloudinaryRouter = Router();

cloudinaryRouter.get("/get-signature", getCloudinarySignature);

export default cloudinaryRouter;
