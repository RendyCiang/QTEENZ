import { Router } from "express";
import { RequestController } from "../controllers";
import { protect } from "../middleware/protect";
import { checkRole } from "../middleware/checkRole";

const requestRouter = Router();

requestRouter.use(protect);
requestRouter.use(checkRole(["Admin"]));
requestRouter.get("/get-requests", RequestController.getRequest);
requestRouter.get("/get-request/:id", RequestController.getRequestById);
requestRouter.put("/update-request/:id", RequestController.updateRequest);
export default requestRouter;
