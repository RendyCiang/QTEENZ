import { Router } from "express";
import { VendorController } from "../controllers";

const vendorRouter = Router();

/**
 * Insert your routes here
 * @example exampleRouter.get("/", getExample)
 */
// vendorRouter.get("/get-vendor-list", VendorController.getVendorList);
vendorRouter.post("/register-vendor", VendorController.createVendor);
vendorRouter.get("/get-vendor", VendorController.getVendor);
export default vendorRouter;
