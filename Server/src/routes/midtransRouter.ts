import { Router } from "express";
import { MidtransController } from "../controllers";

const midtransRouter = Router();

midtransRouter.post(
  "/update-status-order",
  MidtransController.midtransUpdateStatusOrder
);

midtransRouter.post("/webhook", MidtransController.midtransWebhookHandler);

export default midtransRouter;
