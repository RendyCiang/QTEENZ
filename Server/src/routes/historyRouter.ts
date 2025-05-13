import { Router } from "express";

import { protect } from "../middleware/protect";
import HistoryController from "../controllers/HistoryController";

const historyRouter = Router();

historyRouter.use(protect);
historyRouter.get("/get-history", HistoryController.getAllTransactionHistory);
historyRouter.get(
  "/get-buyer-history",
  HistoryController.getBuyerTransactionHistory
);
historyRouter.get(
  "/get-vendor-history",
  HistoryController.getVendorTransactionHistory
);
export default historyRouter;
