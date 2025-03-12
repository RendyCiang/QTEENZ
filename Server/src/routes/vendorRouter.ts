import { Router } from "express";
import { VendorController } from "../controllers";
import { protect } from "../middleware/protect";

const vendorRouter = Router();

/**
 * Insert your routes here
 * @example exampleRouter.get("/", getExample)
 */

vendorRouter.use(protect);
vendorRouter.get("/get-vendor", VendorController.getVendor);
vendorRouter.get("/get-vendor/:id", VendorController.getVendorByid);
export default vendorRouter;
