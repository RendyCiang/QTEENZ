import { Router } from "express";
import { VendorController } from "../controllers";
import { protect } from "../middleware/protect";
import { checkRole } from "../middleware/checkRole";

const vendorRouter = Router();

/**
 * Insert your routes here
 * @example exampleRouter.get("/", getExample)
 */

vendorRouter.use(protect);
vendorRouter.get("/get-vendor", VendorController.getVendor);
vendorRouter.get("/get-vendor/:id", VendorController.getVendorByid);
vendorRouter.put(
  "/update-vendor/:id",
  checkRole(["Admin", "Seller"]),
  VendorController.updateVendor
);
vendorRouter.delete(
  "/delete-vendor/:id",
  checkRole(["Admin"]),
  VendorController.deleteVendor
);
export default vendorRouter;
