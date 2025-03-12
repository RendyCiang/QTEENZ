import { Router } from "express";
import { OrderController } from "../controllers";
import { protect } from "../middleware/protect";

const orderRouter = Router();

orderRouter.use(protect);
orderRouter.post("/create-order", OrderController.createOrder);
orderRouter.get("/get-orders-buyer", OrderController.getOrderBuyer);
orderRouter.get(
  "/get-order-detail-buyer/:id",
  OrderController.getOrderBuyerById
);
orderRouter.get("/get-orders-vendor", OrderController.getOrderVendor);
orderRouter.put("/update-order-status/:id", OrderController.updateOrderStatus);
orderRouter.put(
  "/update-order-pick-up/:id",
  OrderController.updateStatusPickup
);

export default orderRouter;
