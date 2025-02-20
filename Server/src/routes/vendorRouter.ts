import { Router } from "express";
import { VendorController } from "../controllers";

const vendorRouter = Router();

/**
 * Insert your routes here
 * @example exampleRouter.get("/", getExample)
 */

vendorRouter.post("/register-vendor", VendorController.createVendor);
vendorRouter.get("/get-vendor", VendorController.getVendor);
vendorRouter.put("/edit-vendor/:id", VendorController.editVendor);
vendorRouter.delete("/delete-vendor/:id", VendorController.deleteVendor);
export default vendorRouter;
