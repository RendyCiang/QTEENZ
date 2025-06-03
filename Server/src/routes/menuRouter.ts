import { Router } from "express";
import { MenuController } from "../controllers";
import { protect } from "../middleware/protect";
import { checkRole } from "../middleware/checkRole";

const menuRouter = Router();

menuRouter.get("/get-menu", MenuController.getMenu);
menuRouter.get(
  "/get-menu-vendor/:userId",
  protect,
  checkRole(["Admin", "Seller"]),
  MenuController.vendorMenuList
);
// archived menu
menuRouter.get(
  "/get-archived-menu",
  protect,
  checkRole(["Admin", "Seller"]),
  MenuController.getIsArchived
);
menuRouter.get("/get-menu/:id", MenuController.getMenuById);
menuRouter.post(
  "/create-menu",
  protect,
  checkRole(["Admin", "Seller"]),
  MenuController.createMenu
);
menuRouter.put(
  "/edit-menu/:id",
  protect,
  checkRole(["Admin", "Seller"]),
  MenuController.editMenu
);
menuRouter.put(
  "/archived-menu/:id",
  protect,
  checkRole(["Admin", "Seller"]),
  MenuController.archivedMenu
);
menuRouter.delete(
  "/delete-menu/:id",
  protect,
  checkRole(["Admin", "Seller"]),
  MenuController.deleteMenu
);

menuRouter.post(
  "/delete-variant/:id",
  protect,
  checkRole(["Admin", "Seller"]),
  MenuController.deleteMenuVariant
);

export default menuRouter;
